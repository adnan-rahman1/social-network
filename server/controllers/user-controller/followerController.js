const User = require('../../models/user/User');
const getUser = require("../../config/convertBufferAvater");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body.followerId,
      { [req.body.queryStr]: { following: req.body.followingId }},
      { new: true },
    )
    .populate("following", "_id name")
    .populate("follower", "_id name")
    .select("_id name email avater followers following");

    res.status(200).send({
      user: getUser(user),
      single_user_data: req.body.single_user_data,
    });
  } catch (err) {
    res.status(500).send({
      msg: "You can't follow this user",
    })
  }
}