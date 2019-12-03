const User = require("../../models/user/User");

module.exports = async (req, res, next) => {
	try {
    const user = await User.findOne({
      email: req.body.email
		});
		if (!user){
      res.status(403).send({
        msg: "Email and Password doesn't exist",
			});
		}
		else {
      const { _id, firstName, lastName, password } = user;
      req.body = {
        ...req.body,
        _id,
        firstName,
        lastName,
        userPassword: password,
      }
			next();
		}
	} catch (err) {
		res.status(404).send({
			msg: "Something went wrong"
		});
	}
}