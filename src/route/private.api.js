const express = require("express");
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");
const portfolioCOntroller = require("../controller/portfolio.controller");
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

// PORTFOLIO CONTROLLER
privateRouter.post(
  "/portfolios/",
  multerMiddleware.single("image"),
  errorFileMiddleware,
  portfolioCOntroller.createPortfolio
);
privateRouter.get(
  "/portfolios/:portfolio_id",
  portfolioCOntroller.getPortfolio
);
privateRouter.get("/portfolios/", portfolioCOntroller.getAllPortfolio);
module.exports = privateRouter;
