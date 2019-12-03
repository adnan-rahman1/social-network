const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res, next) => {
  try {
    let token = req.headers['authorization'];
    token = token.split(' ')[1];
    const data = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.params.id = data.id;
    next();
  } catch (err) {
    res.status(401).send({
      msg: "This page isn't available"
    })
  }
  // console.log(req.auth);
}