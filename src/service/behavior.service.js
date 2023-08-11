const like = require("./behavior-service/like");
const likeIsExist = require("./behavior-service/likeIsExist");
const unlike = require("./behavior-service/unlike");
const comment = require("./behavior-service/comment");
const bookmark = require("./behavior-service/bookmark");
const bookmarkIsExist = require("./behavior-service/bookmarkIsExist");
const unBookmark = require("./behavior-service/unBookmark");
const follow = require("./behavior-service/follow");
const followIsExist = require("./behavior-service/followIsExist");
const unfollow = require("./behavior-service/unfollow");
const userIsExistById = require("./behavior-service/userIsExistById");

module.exports = {
  like,
  likeIsExist,
  unlike,
  comment,
  bookmark,
  bookmarkIsExist,
  unBookmark,
  follow,
  followIsExist,
  unfollow,
  userIsExistById,
};
