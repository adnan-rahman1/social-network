const Todo = require('../../models/todo/Todo');
const mongoose = require('mongoose')

module.exports = async (req, res) => {
    try {
        await Todo.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params.id) }, 
            { title: req.body.title }
        );
        res.send({
            todos: await Todo.find()
        });
        
    } catch (err) {
        res.send(err);
    }
}