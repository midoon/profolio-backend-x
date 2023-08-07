const logger = require("../../application/logging");
const userService = require("../../service/user.service");
const uploadImage = require("../../util/uploadImage");
const deleteImage = require("../../util/deleteImage");
const { updateUserValidation } = require("../../validation/user.validation");

const uploadImageToGCS = async (imageFile) => {
  return await uploadImage(imageFile);
};

const deleteImageFromGCS = async (imageURL) => {
  return await deleteImage(imageURL);
};

const updateUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    if (user_id !== req.user.user_id) {
      return res.status(403).send({
        status: false,
        status_code: 403,
        message: "Unauthorized",
      });
    }

    const { error, value } = updateUserValidation(req.body);
    if (error) {
      return res.status(403).send({
        status: false,
        status_code: 403,
        message: "Validation Error",
      });
    }

    const biodata = await userService.getBiodata(user_id);
    const image_url = biodata.image;
    let new_image_url = image_url !== null ? image_url : null;
    let deleteImage = null;

    if (req.file && image_url !== null) {
      new_image_url = await uploadImageToGCS(req.file);
      deleteImage = await deleteImageFromGCS(image_url);
    } else if (req.file && image_url === null) {
      new_image_url = await uploadImageToGCS(req.file);
    }

    const dataRequest = value;

    if (dataRequest.username) {
      const dataUserUpdate = {
        username: dataRequest.username,
        updated_at: new Date(),
      };
      await userService.updateUser(user_id, dataUserUpdate);
    }

    if (
      dataRequest.study ||
      dataRequest.job ||
      dataRequest.description ||
      new_image_url
    ) {
      const { study = null, job = null, description = null } = dataRequest;
      const dataBioUpdate = {
        image: new_image_url,
        study,
        job,
        description,
        updated_at: new Date(),
      };
      await userService.updateBiodata(user_id, dataBioUpdate);
    }

    if (dataRequest.no_hp || dataRequest.email || dataRequest.social_media) {
      const { no_hp = null, email = null, social_media = null } = dataRequest;
      const dataContact = {
        no_hp,
        email,
        social_media,
        updated_at: new Date(),
      };
      // update contact()
      await userService.updateContact(user_id, dataContact);
    }

    if (
      dataRequest.country ||
      dataRequest.province ||
      dataRequest.city ||
      dataRequest.postal_code
    ) {
      const {
        country = null,
        province = null,
        city = null,
        postal_code = null,
      } = dataRequest;
      const dataAddress = {
        country,
        province,
        city,
        postal_code,
        updated_at: new Date(),
      };
      // update address()
      await userService.updateAddress(user_id, dataAddress);
    }

    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Success Update User Data",
      data: {
        user_id: user_id,
      },
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Update User Error",
    });
  }
};

module.exports = updateUser;
