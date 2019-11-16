const Post = require('../../models/post');

module.exports = async (req, res) => {
    const newPost = await new Post(req.body);
    await newPost.save();
    res.send(newPost);
}