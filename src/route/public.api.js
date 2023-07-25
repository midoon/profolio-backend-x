const express = require("express");
const authController = require("../controller/auth.controller");
const healtCheckController = require("../controller/health.controller");

const publicRouter = new express.Router();

publicRouter.post("/auth/register", authController.register);
publicRouter.post("/auth/login", authController.login);
publicRouter.post("/auth/refresh", authController.refresh);

//HEATH CHECK
publicRouter.get("/", healtCheckController);

module.exports = publicRouter;
