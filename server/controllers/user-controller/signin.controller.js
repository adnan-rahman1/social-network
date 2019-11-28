const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config()

const User = require('../../models/user/User');

// Compare Password with Request Password
const checkIfPassMatch = (reqPassword, password) => {
    return bcryptjs.compare(reqPassword, password); // return true if password matched
}
// End

// Generate JSON WEB TOKEN
const generateWebToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY ); // return jwt token
}
// END

module.exports = async (req, res) => {
    try {
        const isUserExist = await User.findOne({
            email: req.body.email
        });
        if (!isUserExist){
            res.status(403).send({
                msg: "Email and Password doesn't exist",
            });
        }
        else {
            const { _id, firstName, lastName, email, password } = isUserExist;
            const user = { id: _id, firstName, lastName, email };
            const isPasswordMatched = await checkIfPassMatch(req.body.password, password);
            if (!isPasswordMatched) { // Check if the password match
                res.status(403).send({
                    msg: "Email and Password doesn't exist",
                });
            }
            else {
                const token = await generateWebToken(_id); // Generate JSON WEB TOKEN

                res.status(200).send({
                    user,
                    token,
                    msg: "You signed in successfully",
                });
            }
        }
        
    } catch (err) {
        res.send(err);
    }
}