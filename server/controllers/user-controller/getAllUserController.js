const User = require('../../models/user/User');

module.exports = async (req, res) => {
    try {
        const users = await User.find().select(`name email avater createdAt`);
        if (users.length <= 0) {
            res.status(403).send("No user found");
        }
        else {
          res.status(200).send({
            users,
          });
        }
    } catch (err) {
        res.send(err);
    }
}