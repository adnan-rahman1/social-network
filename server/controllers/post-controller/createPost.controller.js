const Post = require('../../models/post');

module.exports = async (req, res) => {
    try {
        console.log(req.auth);
        req.body.postedBy = req.auth.id;
        const newPost = await new Post(req.body);
        await newPost.save();
        res.status(200).send({
            posts: newPost 
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
}