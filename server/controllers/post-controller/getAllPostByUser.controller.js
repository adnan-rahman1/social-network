const Post = require('../../models/post');

module.exports = async (req, res) => {
    try {
        const posts = await Post.find({ postedBy: req.params.id }).select("title body postedBy createdAt");
        if (posts.length <= 0) {
            res.send("No post awailable");
        }
        res.send(posts);
    } catch (err) {
        res.send(err.message);
    }
}