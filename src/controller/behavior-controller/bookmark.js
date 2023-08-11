const { v4 } = require("uuid");
const behaviorService = require("../../service/behavior.service");

const bookmark = async (req, res) => {
  try {
    const countBookMarkIsExist = await behaviorService.bookmarkIsExist(
      req.params.portfolio_id,
      req.user.user_id
    );
    if (countBookMarkIsExist !== 0) {
      await behaviorService.unBookmark(
        req.params.portfolio_id,
        req.user.user_id
      );
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Success UnBookmark Portfolio",
      });
    }
    const dataBookmark = {
      bookmark_id: v4().toString(),
      portfolio_id: req.params.portfolio_id,
      user_id: req.user.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };
    await behaviorService.bookmark(dataBookmark);
    return res.status(201).send({
      status: true,
      status_code: 201,
      message: "Success Add Bookmark",
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Bookmark Portfolio Error",
    });
  }
};

module.exports = bookmark;
