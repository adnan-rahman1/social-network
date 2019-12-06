const User = require('../../models/user/User');
const mongoose = require('mongoose')

module.exports = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        });


        if (user && req.params.id != user._id) {
            res.status(401).send({
                msg: "Email is taken",
            });
        }
        else {
            const updateUser = await User.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(req.params.id) },
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    avater: req.body.avater,
                    updatedAt: Date.now()
                },
                { new: true }
            ).select("_id firstName lastName email createdAt updatedAt avater")
            const { _id, firstName, lastName, email, createdAt, updatedAt, avater: userAvater } = updateUser;
            avater = userAvater && userAvater.toString("base64");

            res.status(200).send({
                user: {
                    _id,
                    firstName, lastName, email,
                    avater,
                    createdAt, updatedAt,
                },
                msg: "Profile updated successfully..."
            });
        }

    } catch (err) {
        res.status(401).send({
            msg: "Failed to update user information"
        });
    }
}