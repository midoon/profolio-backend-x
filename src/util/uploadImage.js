const util = require("util");
const Cloud = require("@google-cloud/storage");
const path = require("path");
const CONFIG = require("../config/env-config");
const { v4 } = require("uuid");

const serviceKey = path.join(__dirname, CONFIG.SA_PATH);

const { Storage } = Cloud;
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: CONFIG.GCP_PROJECT_ID,
});

// should be your bucket name
const bucket = storage.bucket(CONFIG.GCP_BUCKET_NAME);

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    let { originalname, buffer } = file;
    originalname = new Date().getTime() + v4().toString() + "_" + originalname;
    // console.log("ori name => " + originalname);
    const blob = bucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      })
      .on("error", () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });
};

module.exports = uploadImage;
