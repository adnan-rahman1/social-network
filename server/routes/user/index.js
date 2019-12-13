const router = require('express').Router();
const auth = require('../middleware/auth');

// PUBLIC CONTROLLER
const getAllUserController = require("../../controllers/user-controller/getAllUserController");
// CONTROLLERS
const signUpController = require('../../controllers/user-controller/signup.controller');
const signInController = require('../../controllers/user-controller/signin.controller');

// Upload User Profile Picture Controller
const profileController = require('../../controllers/user-controller/profile.controller');
const profilePictureController = require('../../controllers/user-controller/profilePictureController')
const updateUserInfoController = require('../../controllers/user-controller/updateUserInfo.controller');
const deleteUserController = require("../../controllers/user-controller/deleteUserController");

// VALIDATORS
const validation = require('../../validator/user/');

// Middleware
const isUserExist = require("../middleware/isUserExist");
const isPasswordMatched = require("../middleware/isPasswordMatched");

// SIGN UP
router.post('/signup', 
	validation,
	signUpController,
	signInController,
);

// SIGN IN
router.post('/signin', 
	validation, 
	isUserExist,
	isPasswordMatched,
	signInController
);


// USER PROFILE
router.get("/", getAllUserController);
router.get('/:id', profileController);
router.put("/:id", profilePictureController, validation, updateUserInfoController);
router.delete("/:id", deleteUserController);

module.exports = router;