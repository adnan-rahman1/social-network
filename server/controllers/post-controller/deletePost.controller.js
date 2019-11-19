const Post = require('../../models/post');

module.exports = async (req, res) => {
    try {
        const post = await Post.findOne({
            _id: req.params.id,
            postedBy: req.auth.id,
        });

        if (!post) res.send({
            msg: "You don't have the permission to delete this post"
        });
        else {
            await Post.findOneAndDelete({ _id: req.params.id });
            res.send(await Post.find());
        }
        
    } catch (err) {
        res.send(err.message);
    }
}