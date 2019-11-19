const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


// CONTROLLERS
const createPostController = require('../../controllers/post-controller/createPost.controller');
const getAllPostController = require("../../controllers/post-controller/getAllPost.controller");
const getSinglePostController = require("../../controllers/post-controller/getSignlePost.controller");
const updatePostController = require('../../controllers/post-controller/updatePost.controller');
const deleteSinglePostController = require('../../controllers/post-controller/deletePost.controller');


// VALIDATORS
const { validationRule, validateResult } = require('../../validator/post/');

// Authorized Route
const auth = require('../middleware/auth');


// CREATE Post
router.post('/create', auth, validationRule, validateResult, createPostController);
router.get("/", getAllPostController);
router.get("/:id", getSinglePostController);
router.delete("/:id", auth, deleteSinglePostController);
router.put("/:id", auth, validationRule, validateResult, updatePostController);


module.exports = router;