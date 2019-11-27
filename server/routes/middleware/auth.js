const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (!token) {
            res.status(500).send({
                msg: "Unauthorized user"
            });
        }
        else {
            token = token.split(' ')[1];
            const data = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            req.auth = data;
            next();
        }
    } catch (err) {
        res.status(500).send({
            msg: "Dont' be oversmart"
        });
    }
}