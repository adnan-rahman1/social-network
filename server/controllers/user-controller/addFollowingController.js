const User = require('../../models/user/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body.followingId,
      { $push: { followers: req.body.followerId }}
    )
    .populate("following", "_id name")
    .populate("follower", "_id name")
    .select("_id name email avater followers following");
    next();
  } catch (err) {
    res.status(500).send({
      msg: "You can't follow this user",
    })
  }
}