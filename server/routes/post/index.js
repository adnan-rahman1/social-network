const router = require('express').Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


// CONTROLLERS
const createPostController = require('../../controllers/post-controller/createPost.controller');
const getAllPostController = require('../../controllers/post-controller/getAllPost.controller');
const updateTodoController = require('../../controllers/todo-controller/updateTodo.controller');
const deleteSingleTodoController = require('../../controllers/todo-controller/deleteTodo.controller');


// VALIDATORS
const { validationRule, validateResult } = require('../../validator/post/');


// CREATE TODO
router.post('/create', validationRule, validateResult, createPostController);
router.get("/", getAllPostController);
router.delete("/:id", deleteSingleTodoController);
router.put("/:id", updateTodoController);


module.exports = router;