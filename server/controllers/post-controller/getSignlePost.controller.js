const Post = require('../../models/post');

module.exports = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).select("title body postedBy createdAt");
        await post.populate("postedBy", "firstName lastName").execPopulate();
        res.send(post);
    } catch (err) {
        res.send(err.message);
    }
}