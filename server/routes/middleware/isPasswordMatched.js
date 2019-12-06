const bcryptjs = require('bcryptjs');

// Compare Password with Request Password
const checkIfPassMatch = (plainPassword, hashPassword) => {
  return bcryptjs.compare(plainPassword, hashPassword); // return true if password matched
}
// End

module.exports = async (req, res, next) => {
  try {
    const hashPassword = req.body.password
    const plainPassword = req.body.plainPassword;
    const isPasswordMatched = await checkIfPassMatch(plainPassword, hashPassword);
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