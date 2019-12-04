const User = require('../../models/user/User');

module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("firstName lastName email avater createdAt updatedAt");
    if (!user) {
      res.status(403).send({
        msg: "Sorry no user found"
      });
    } else {
    res.status(200).send({
        user,
      });
    }
  } catch (err) {
    res.status(404).send({
      msg: "Failed to load user profile"
    });
  }
}