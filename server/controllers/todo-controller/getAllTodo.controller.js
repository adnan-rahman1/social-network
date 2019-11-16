const Todo = require('../../models/todo/Todo');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
    try {
        let todos = await Todo.find();
        const token = req.headers['authorization'];
        console.log(token);
        if (token) {
            const {firstName, lastName } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            res.send({
                todos,
                firstName, 
                lastName,
            });
        }
        res.send({
            todos
        });
        
        
    } catch (err) {
        res.send(err);
    }
}