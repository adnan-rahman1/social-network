const router = require('express').Router();
const auth = require('../middleware/auth');


// CONTROLLERS
const signUpController = require('../../controllers/user-controller/signup.controller');
const signInController = require('../../controllers/user-controller/signin.controller');

// Upload User Profile Picture Controller
const profilePictureController = require('../../controllers/user-controller/profilePictureController')

// VALIDATORS
const validation = require('../../validator/user/');

// SIGN UP
router.post('/signup', 
    validation, 
    signUpController,
);

// SIGN IN
router.post('/signin', validation, profilePictureController, signInController);

// SIGN OUT 
router.get('/signout', (req, res) => {
    res.status(200).send({
        msg: "You successfully signout"
    });
});


// USER PROFILE
router.get('/profile', (req, res) => {
    res.send('<h1>Welcome to user profile</h1>');
});


module.exports = router;