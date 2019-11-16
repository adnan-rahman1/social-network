const Todo = require('../../models/todo/Todo');

module.exports = async (req, res) => {
    try {
        let newTodo = { ...req.body };
        let createTodo = await new Todo(newTodo);
        await createTodo.save();
        res.send({
            todos: await Todo.find()
        });
        
    } catch (err) {
        res.send(err);
    }
}