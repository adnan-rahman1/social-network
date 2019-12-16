const User = require('../../models/user/User');
const getUser = require("../../config/convertBufferAvater");

module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("followers", "_id name")
      .populate("following", "_id name")
      .select("name email following followers avater createdAt updatedAt");

    if (!user) {
      res.status(403).send({
        msg: "Sorry no user found"
      });
    } else {
      res.status(200).send({
        user: getUser(user),
      });
    }
  } catch (err) {
    res.status(404).send({
      msg: "Failed to load user profile"
    });
  }
}