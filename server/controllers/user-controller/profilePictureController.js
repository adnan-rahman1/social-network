const upload = require("../../config/user-photo-upload");

module.exports = async (req, res, next) => {
  try {
    const img = await upload(req, res, (err) => {
      if (err) {
        // An unknown error occurred when uploading.
        res.status(401).send({
          msg: err.message
        });
      }
      console.log("Calling from profile photo upload...");
      console.log(req.upload);
      console.log(req.file)
      next();
      // Everything went fine.
    });
  } catch (err) {
    res.status(401).send({
      msg: "Something went wrong from profile picture upload"
    });
  }
};