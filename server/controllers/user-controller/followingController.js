const User = require('../../models/user/User');
const getUser = require('../../config/convertBufferAvater');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body.followingId,
      { [req.body.queryStr]: { followers: req.body.followerId }},
      { new: true },
    )
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .select("_id name email avater followers following createdAt updatedAt");

    req.body.single_user_data = getUser(user);
    next();
  } catch (err) {
    res.status(500).send({
      msg: "You can't follow this user",
    })
  }
}