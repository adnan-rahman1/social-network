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
const generateWebToken = async (id ) => {
    return await jwt.sign({ id }, process.env.JWT_PRIVATE_KEY ); // return jwt token
}
// END

module.exports = async (req, res) => {
    try {
        const isUserExist = await User.findOne({
            email: req.body.email
        });
        if (!isUserExist){
            res.send({
                msg: "Email and Password doesn't exist",
            });
        }
        else {
            const { _id, password } = isUserExist;
            if (!await checkIfPassMatch(req.body.password, password)) { // Check if the password match
                res.send({
                    msg: "Email and Password doesn't exist",
                });
            }
            else {
                const token = await generateWebToken(_id); // Generate JSON WEB TOKEN
                res.send({
                    _id,
                    token,
                    msg: "You signed in successfully"
                });
            }
        }
        
    } catch (err) {
        res.send(err);
    }
}