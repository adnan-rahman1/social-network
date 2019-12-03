const bcryptjs = require('bcryptjs');

// Compare Password with Request Password
const checkIfPassMatch = (reqPassword, password) => {
  return bcryptjs.compare(reqPassword, password); // return true if password matched
}
// End

module.exports = async (req, res, next) => {
  try {
    const userPassword = req.body.userPassword
    const reqPassword = req.body.password;
    const isPasswordMatched = await checkIfPassMatch(reqPassword, userPassword);
    if (!isPasswordMatched) { // Check if the password match
      res.status(403).send({
        msg: "Email and Password doesn't exist",
      });
    }
    else {
      next();
    }
  } catch (err) {
    res.status(500).send({
      msg: "Something went wrong"
    })
  }
}