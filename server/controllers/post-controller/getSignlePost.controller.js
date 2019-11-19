const Post = require('../../models/post');

module.exports = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.send(post);
    } catch (err) {
        res.send(err.message);
    }
}