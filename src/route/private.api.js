const express = require("express");
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");
const portfolioController = require("../controller/portfolio.controller");
const behaviorController = require("../controller/behavior.controller");

const authMiddleware = require("../middleware/auth.middleware");
const multerMiddleware = require("../middleware/multer.middleware");
const errorFileMiddleware = require("../middleware/errorFile.middleware");

const privateRouter = new express.Router();
privateRouter.use(authMiddleware);

// AUTH ENDPOINT
privateRouter.post("/auth/logout", authController.logout);

// USER ENDPOINT
privateRouter.get("/users/:user_id", userController.getUser);
privateRouter.get("/users/", userController.getListUser);
privateRouter.put(
  "/users/:user_id",
  multerMiddleware.single("image"),
  errorFileMiddleware,
  userController.updateUser
);

// PORTFOLIO ENDPOINT
privateRouter.post(
  "/portfolios/",
  multerMiddleware.single("image"),
  errorFileMiddleware,
  portfolioController.createPortfolio
);
privateRouter.get(
  "/portfolios/:portfolio_id",
  portfolioController.getPortfolio
);
privateRouter.get("/portfolios/", portfolioController.getAllPortfolio);
privateRouter.put(
  "/portfolios/:portfolio_id",
  multerMiddleware.single("image"),
  errorFileMiddleware,
  portfolioController.updatePortfolio
);
privateRouter.delete(
  "/portfolios/:portfolio_id",
  portfolioController.deletePortfolio
);

//BEHAVIOR ENDPOINT
privateRouter.post("/portfolios/likes/:portfolio_id", behaviorController.like);
privateRouter.post(
  "/portfolios/comments/:portfolio_id",
  behaviorController.comment
);
privateRouter.post(
  "/portfolios/bookmarks/:portfolio_id",
  behaviorController.bookmark
);
module.exports = privateRouter;
