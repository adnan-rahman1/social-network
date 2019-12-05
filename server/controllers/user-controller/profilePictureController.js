const upload = require("../../config/user-photo-upload");

module.exports = async (req, res, next) => {
  try {
    const img = await upload(req, res, (err) => {
      if (err) {
        // An unknown error occurred when uploading.
        res.status(401).send({
          msg: "Failed to upload photo"
        });
      } 
      else {
        // Everything went fine
        if(req.file){
          req.body.avater = req.file.buffer;
        }
        else req.body.avater = null
        // console.log(b);
        next();
      }
    });
  } catch (err) {
    res.status(401).send({
      msg: "Something went wrong from profile picture upload"
    });
  }
};