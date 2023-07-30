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

// app.use((err, req, res, next) => {
//   if (err.code === "UNSUPPORTED_MEDIA_TYPE") {
//     // Tangkap error fileFilter dan kirimkan respons kesalahan yang sesuai
//     res.status(415).json({ error: "Format file tidak valid" });
//   } else {
//     // Tangani error lainnya
//     console.log("ERROR:", err);
//     res.status(500).json({ error: "Terjadi kesalahan server" });
//   }
// });

//tidak pake kurung kurawal karena hanya satu variable yang diexport
module.exports = app;
