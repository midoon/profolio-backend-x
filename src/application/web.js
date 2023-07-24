const express = require("express");
const cors = require("cors");
const publicRouter = require("../route/public.api");
const privateRouter = require("../route/private.api");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsConfiig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfiig));
app.use(publicRouter);
app.use(privateRouter);

//tidak pake kurung kurawal karena hanya satu variable yang diexport
module.exports = app;
