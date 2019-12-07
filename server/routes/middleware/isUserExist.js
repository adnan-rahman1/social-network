const User = require("../../models/user/User");

module.exports = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user){
			res.status(403).send({
				msg: "Email and Password doesn't exist",
			});
		}
		else {
			const { _id, name, email, password, avater, createdAt, updatedAt } = user;
			// m_avater = Buffer.from(JSON.parse(JSON.stringify(avater)).buffer.data).toString("base64");
			req.body = {
				_id, name, email, password, avater, createdAt, updatedAt,
				plainPassword: req.body.password, // plain password
			}
			next();
		}
	} catch (err) {
		res.status(404).send({
			msg: "Something went wrong"
		});
	}
}