const Post = require('../../models/post');
const mongoose = require('mongoose')

module.exports = async (req, res) => {
    try {
        await Post.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params.id) }, 
            { 
                title: req.body.title,
                body: req.body.body
            }
        );
        res.send({
            posts: await Post.find()
        });
        
    } catch (err) {
        res.send(err.message);
    }
}