const express = require("express");
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

const privateRouter = new express.Router();
privateRouter.use(authMiddleware);

// AUTH ENDPOINT
privateRouter.post("/auth/logout", authController.logout);

//USER ENDPOINT
privateRouter.get("/users/:user_id", userController.getUser);
privateRouter.get("/users/", userController.getListUser);

module.exports = privateRouter;
