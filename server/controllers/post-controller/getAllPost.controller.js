const Post = require('../../models/post');
const User = require('../../models/user/User');

const getAllPostWithUserName = async (post) => {
    try {
        return await post.populate("postedBy", "firstName lastName").execPopulate();
    } catch (err) {
        return err;
    }
}
// module.exports = async (req, res) => {
//     try {
//         const posts = (await Post.find().select("title body postedBy createdAt"))
//         if (posts.length <= 0) {
//             res.send("No post awailable");
//         }
//         const p = posts.map(getAllPostWithUserName);
//         const allPostByUserName = await Promise.all(p);
//         res.send(allPostByUserName);
//     } catch (err) {
//         res.send(err);
//     }
// }
module.exports = async (req, res) => {
    try {
        const posts = await Post
            .find()
            .select("title body postedBy createdAt")
            .populate("postedBy", "_id name email avater followers following");
        if (posts.length <= 0) {
            res.send("No post awailable");
        }
        // const p = posts.map(getAllPostWithUserName);
        // const allPostByUserName = await Promise.all(p);
        res.status(200).send({
            posts
        });
    } catch (err) {
        res.status(500).send({
            msg: err
        });
    }
}