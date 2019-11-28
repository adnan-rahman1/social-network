const User = require('../../models/user/User');
const mongoose = require('mongoose')

module.exports = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id,
        });

        if (!user) res.send({
            msg: "You don't have the permission to update this post"
        });

        const updateUser = await User.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params.id) }, 
            { 
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                updatedAt: Date.now()
            },
            { new: true }
        ).select("_id firstName lastName email createdAt updatedAt")
        res.send({
            user: updateUser,
            msg: "User information updated successfully"
        });
        
    } catch (err) {
        res.send({
            msg: "Failed to update user information"
        });
    }
}