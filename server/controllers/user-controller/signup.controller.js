const bcryptjs = require('bcryptjs');
const User = require('../../models/user/User');

// Generate Encrypt Password
const generateHashPassWord = async (pass) => {
    // generate random salt
    let salt = await bcryptjs.genSalt(10); 
    
    // generate hashPassword from original password and salt
    let hashPass = await bcryptjs.hash(pass,salt);

    return hashPass;
}
// End

module.exports = async (req, res) => {
    try {
        const isUserExist = await User.findOne({
            email: req.body.email
        });
        if (isUserExist)
            res.status(403).send({
                msg: "User already exists",
                redirect: false
            });
        else {
            // Generate Encrypt Password
            req.body.password = await generateHashPassWord(req.body.password);
            // End 

            const [ firstName, lastName ] = req.body.name.split(" ");
            const { email, password } = req.body;
            let newUser = { firstName, lastName, email, password };
            let createUser = await new User(newUser);
            await createUser.save();
            res.status(200).send({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            });
        }
        
    } catch (err) {
        res.status(403).json(err);
    }
}