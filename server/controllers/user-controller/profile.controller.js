const User = require('../../models/user/User');

module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name email avater createdAt updatedAt");
    if (!user) {
      res.status(403).send({
        msg: "Sorry no user found"
      });
    } else {
      const { _id, name, email, createdAt, updatedAt, avater: userAvater } = user;
      avater = userAvater && userAvater.toString("base64");
      res.status(200).send({
        user: {
          _id, name, email, avater, createdAt, updatedAt
        }
      });
    }
  } catch (err) {
    res.status(404).send({
      msg: "Failed to load user profile"
    });
  }
}