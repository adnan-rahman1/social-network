const upload = require("../../config/user-photo-upload");

module.exports = async (req, res, next) => {
  try {
    const img = await upload(req, res, (err) => {
      if (err) {
        // An unknown error occurred when uploading.
        res.send(err.message);
      }
      // console.log(req.upload);
      console.log(req.file)
      next();
      // Everything went fine.
    });
  } catch (err) {
    res.send(err);
  }
};