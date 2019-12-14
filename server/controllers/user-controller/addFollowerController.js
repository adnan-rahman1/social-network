const User = require('../../models/user/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body.followerId,
      { $push: { following: req.body.followingId }},
      { new: true },
    )
    .populate("following", "_id name")
    .populate("follower", "_id name")
    .select("name email avater follower following");

    res.status(200).send({
      user,
    })
  } catch (err) {
    res.status(500).send({
      msg: "You can't follow this user",
    })
  }
}