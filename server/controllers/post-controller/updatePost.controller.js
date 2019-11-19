const Post = require('../../models/post');
const mongoose = require('mongoose')

module.exports = async (req, res) => {
    try {
        const post = await Post.findOne({
            _id: req.params.id,
            postedBy: req.auth.id,
        });
        if (!post) res.send({
            msg: "You don't have the permission to update this post"
        });

        await Post.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params.id) }, 
            { 
                title: req.body.title,
                body: req.body.body
            }
        );
        res.send(await Post.find());
        
    } catch (err) {
        res.send(err.message);
    }
}