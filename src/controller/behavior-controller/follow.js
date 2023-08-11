const { v4 } = require("uuid");
const behaviorService = require("../../service/behavior.service");

const follow = async (req, res) => {
  try {
    const followedUserIsExist = await behaviorService.userIsExistById(
      req.params.user_id
    );

    if (followedUserIsExist === 0) {
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: "User Not Found",
      });
    }

    const countFollow = await behaviorService.followIsExist(
      req.params.user_id,
      req.user.user_id
    );

    if (countFollow !== 0) {
      await behaviorService.unfollow(req.params.user_id, req.user.user_id);
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Success unfollow",
      });
    }

    const dataFollow = {
      follow_id: v4().toString(),
      followed_user_id: req.params.user_id,
      user_id: req.user.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };
    await behaviorService.follow(dataFollow);
    return res.status(201).send({
      status: true,
      status_code: 201,
      message: "Success follow",
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Follow Error",
    });
  }
};

module.exports = follow;
