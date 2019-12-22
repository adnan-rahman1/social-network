const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


// PUBLIC CONTROLLERS
const getAllPostController = require("../../controllers/post-controller/getAllPost.controller");
const getSinglePostController = require("../../controllers/post-controller/getSignlePost.controller");

// PRIVATE CONTROLLERS
const getAllPostByUser = require('../../controllers/post-controller/getAllPostByUser.controller');
const createPostController = require('../../controllers/post-controller/createPost.controller');
const updatePostController = require('../../controllers/post-controller/updatePost.controller');
const deleteSinglePostController = require('../../controllers/post-controller/deletePost.controller');


// VALIDATORS
const { validationRule, validateResult } = require('../../validator/post/');

// Authorized Route
const auth = require('../middleware/auth');


// Public Route
router.get("/", auth, getAllPostController);
router.get("/:id", auth, getSinglePostController);

// Private Route
router.get('/user/:id', auth, getAllPostByUser);
router.post('/create', auth, validationRule, validateResult, createPostController);
router.delete("/:id", auth, deleteSinglePostController);
router.put("/:id", auth, validationRule, validateResult, updatePostController);


module.exports = router;