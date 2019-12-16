const User = require('../../models/user/User');

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

    const { _id, name, email, following, followers, createdAt, updatedAt, avater: userAvater } = user;
    avater = userAvater && userAvater.toString("base64");
    res.status(200).send({
      user: {
        _id, name, email, following, followers, avater, createdAt, updatedAt
      }
    });
  } catch (err) {
    res.status(500).send({
      msg: "You can't follow this user",
    })
  }
}