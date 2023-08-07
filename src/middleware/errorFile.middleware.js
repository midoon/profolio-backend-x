const errorFileMiddleware = (err, req, res, next) => {
  if (err.code === "UNSUPPORTED_MEDIA_TYPE") {
    // Tangkap error fileFilter dan kirimkan respons kesalahan yang sesuai
    res.status(415).json({ error: "Format file tidak valid" });
    return;
  }
  return next();
};

module.exports = errorFileMiddleware;
