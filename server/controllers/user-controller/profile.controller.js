const User = require('../../models/user/User');

module.exports = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("firstName lastName email createdAt");
        if (!user) {
          res.status(200).send({
            user: "",
            admin: req.auth.admin,
            msg: "Currently no user signed in"
          });
        } else {
        res.status(200).send({
            user,
            admin: req.auth.admin,
            msg: "You logged in"
          });
        }
    } catch (err) {
        res.status(404).send({
            msg: "Failed to load user profile"
        });
    }
}