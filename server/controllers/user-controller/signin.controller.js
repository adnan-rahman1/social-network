const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config()

const User = require('../../models/user/User');

// Compare Password with Request Password
const checkIfPassMatch = async (reqPassword, password) => {
    return await bcryptjs.compare(reqPassword, password); // return true if password matched
}
// End

// Generate JSON WEB TOKEN
const generateWebToken = async (id, firstName, lastName) => {
    return await jwt.sign({ id,firstName, lastName }, process.env.JWT_PRIVATE_KEY ); // return jwt token
}
// END

module.exports = async (req, res) => {
    try {
        const isUserExist = await User.findOne({
            email: req.body.email
        });
        if (!isUserExist){
            res.send({
                msg: "No user found",
            });
        }
        else {
            const { _id, firstName, lastName, password } = isUserExist;
            if (!await checkIfPassMatch(req.body.password, password)) { // Check if the password match
                res.send({
                    msg: "Password Doesn't Matched",
                });
            }
            else {
                const token = await generateWebToken(_id, firstName, lastName); // Generate JSON WEB TOKEN
                res.send({
                    firstName,
                    lastName,
                    token,
                    msg: "You signed in successfully"
                });
            }
        }
        
    } catch (err) {
        res.send(err);
    }
}