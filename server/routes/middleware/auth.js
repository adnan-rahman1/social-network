const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
    let token = req.headers['authorization'];
    try {
        token = token.split(' ')[1];
        const data = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.params.id = data.id;
        req.auth = {
            admin: true,
        };
    } catch (err) {
        req.auth = {
            admin: false,
        }
    }
    next();
    // console.log(req.auth);
}