const router = require('express').Router();
const auth = require('../middleware/auth');


// CONTROLLERS
const signUpController = require('../../controllers/user-controller/signup.controller');
const signInController = require('../../controllers/user-controller/signin.controller');

// Upload User Profile Picture Controller
const profileController = require('../../controllers/user-controller/profile.controller');
const profilePictureController = require('../../controllers/user-controller/profilePictureController')
const updateUserInfoController = require('../../controllers/user-controller/updateUserInfo.controller');

// VALIDATORS
const validation = require('../../validator/user/');

// Middleware
const isUserExist = require("../middleware/isUserExist");
const isPasswordMatched = require("../middleware/isPasswordMatched");

// SIGN UP
router.post('/signup', 
	validation,
	signUpController,
	isUserExist,
	signInController,
);

// SIGN IN
router.post('/signin', 
	validation, 
	profilePictureController, 
	isUserExist,
	isPasswordMatched,
	signInController
);

// SIGN OUT 
router.get('/signout', (req, res) => {
	res.status(200).send({
			msg: "You successfully signout"
	});
});


// USER PROFILE
router.get('/:id', profileController);
router.put("/:id", auth, updateUserInfoController);

module.exports = router;