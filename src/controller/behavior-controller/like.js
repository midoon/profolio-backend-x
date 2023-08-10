const { v4 } = require("uuid");
const behaviorService = require("../../service/behavior.service");
const like = async (req, res) => {
  try {
    const countLikeIsExist = await behaviorService.likeIsExist(
      req.params.portfolio_id,
      req.user.user_id
    );

    if (countLikeIsExist !== 0) {
      await behaviorService.unlike(req.params.portfolio_id, req.user.user_id);
      return res.status(201).send({
        status: true,
        status_code: 200,
        message: "Success Unlike Portfolio",
      });
    }

    const dataLike = {
      like_id: v4().toString(),
      portfolio_id: req.params.portfolio_id,
      user_id: req.user.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await behaviorService.like(dataLike);

    return res.status(201).send({
      status: true,
      status_code: 201,
      message: "Success Like Portfolio",
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Like Portfolio Error",
    });
  }
};

module.exports = like;
