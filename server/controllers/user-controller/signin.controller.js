const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

// Generate JSON WEB TOKEN
const generateWebToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY ); // return jwt token
}
// END

module.exports = (req, res) => {
  const { _id, name, email, following, followers, createdAt, updatedAt, avater: userAvater } = req.body;
  const avater = userAvater && userAvater.toString("base64");
  const token = generateWebToken(_id); // Generate JSON WEB TOKEN

  res.status(200).send({
    user: {
      _id, name, email, following, followers, createdAt, updatedAt, avater
    },
    token
  });
}