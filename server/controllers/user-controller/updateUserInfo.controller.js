const User = require("../../models/user/User");
const getUser = require("../../config/convertBufferAvater");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    });

    if (user && user._id != req.params.id) {
      res.status(401).send({
        msg: "Email is taken"
      });
    } else {
      const updateUser = await User.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.id) },
        {
          ...req.body,
          updatedAt: Date.now()
        },
        { new: true }
      )
      .populate("following", "_id name")
      .populate("follower", "_id name")
      .select("_id name email following followers createdAt updatedAt avater");

      res.status(200).send({
        user: getUser(updateUser),
        msg: "Profile updated successfully..."
      });
    }
  } catch (err) {
    res.status(401).send({
      msg: "Failed to update user information"
    });
  }
};
