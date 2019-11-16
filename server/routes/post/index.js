const router = require('express').Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


// CONTROLLERS
const createPostController = require('../../controllers/post-controller/createPost.controller');
const getAllTodoController = require('../../controllers/todo-controller/getAllTodo.controller');
const updateTodoController = require('../../controllers/todo-controller/updateTodo.controller');
const deleteSingleTodoController = require('../../controllers/todo-controller/deleteTodo.controller');


// VALIDATORS
const { validationRule, validateResult } = require('../../validator/post/');


// CREATE TODO
router.post('/create', validationRule, validateResult, createPostController);
router.get("/", getAllTodoController);
router.delete("/:id", deleteSingleTodoController);
router.put("/:id", updateTodoController);


module.exports = router;