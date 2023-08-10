const behaviorService = require("../../service/behavior.service");
const { commentValidation } = require("../../validation/behavior.validation");
const { v4 } = require("uuid");

const comment = async (req, res) => {
  try {
    const { error, value } = commentValidation(req.body);
    if (error) {
      return res.status(403).send({
        status: false,
        status_code: 403,
        message: "Validation error",
      });
    }
    const dataComment = {
      comment_id: v4().toString(),
      portfolio_id: req.params.portfolio_id,
      user_id: req.user.user_id,
      comment: req.body.comment,
      created_at: new Date(),
      updated_at: new Date(),
    };
    await behaviorService.comment(dataComment);
    return res.status(201).send({
      status: true,
      status_code: 201,
      message: "Success Add Comment",
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Comment Portfolio Error",
    });
  }
};

module.exports = comment;
