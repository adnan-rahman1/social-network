const getUser = require("../../config/convertBufferAvater");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

// Generate JSON WEB TOKEN
const generateWebToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY ); // return jwt token
}
// END

module.exports = (req, res) => {
  const user = getUser(req.body);
  const { _id } = user;
  const token = generateWebToken(_id); // Generate JSON WEB TOKEN

  res.status(200).send({
    user,
    token
  });
}