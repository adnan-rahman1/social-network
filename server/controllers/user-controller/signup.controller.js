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
            res.send({
                msg: "User already exists",
                redirect: false
            });
        else {
            // Generate Encrypt Password
            req.body.password = await generateHashPassWord(req.body.password);
            // End 

            let newUser = { ...req.body };
            let createUser = await new User(newUser);
            await createUser.save();
            res.send({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                msg: "You successfully registered",
                redirect: true
            });
        }
        
    } catch (err) {
        res.send(err);
    }
}