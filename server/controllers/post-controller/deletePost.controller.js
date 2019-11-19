const Post = require('../../models/post');

module.exports = async (req, res) => {
    try {
        await Post.findOneAndDelete({ _id: req.params.id });
        res.send({
            posts: await Post.find()
        });
        
    } catch (err) {
        res.send(err.message);
    }
}