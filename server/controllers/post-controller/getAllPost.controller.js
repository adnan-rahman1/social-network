const Post = require('../../models/post');
const User = require('../../models/user/User');


const getAllPostWithUserName = async (post) => {
    try {
        return await post.populate("postedBy", "firstName lastName email").execPopulate();
    } catch (err) {
        return err;
    }
}
module.exports = async (req, res) => {
    try {
        const posts = (await Post.find()).map(getAllPostWithUserName);
        if (posts.length <= 0) {
            res.send("No post awailable");
        }
        const allPostByUserName = await Promise.all(posts);
        res.send(allPostByUserName);
    } catch (err) {
        res.send(err.message);
    }
}