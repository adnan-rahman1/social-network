const User = require("../../models/user/User");
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
      ).select("_id name email following followers createdAt updatedAt avater");
      const {
        _id,
        name,
        email,
        following,
        followers,
        createdAt,
        updatedAt,
        avater: userAvater
      } = updateUser;
      avater = userAvater && userAvater.toString("base64");

      res.status(200).send({
        user: {
          _id,
          name,
          email,
          following,
          followers,
          avater,
          createdAt,
          updatedAt
        },
        msg: "Profile updated successfully..."
      });
    }
  } catch (err) {
    res.status(401).send({
      msg: "Failed to update user information"
    });
  }
};
