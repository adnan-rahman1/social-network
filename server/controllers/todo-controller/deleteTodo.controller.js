const Todo = require('../../models/todo/Todo');

module.exports = async (req, res) => {
    try {
        let todo = await Todo.findOneAndDelete({ _id: req.params.id });
        res.send({
            todos: await Todo.find({})
        });
        
    } catch (err) {
        res.send(err);
    }
}