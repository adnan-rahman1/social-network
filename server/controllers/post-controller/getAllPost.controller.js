const Post = require('../../models/post');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
    try {
        let posts = await Post.find();
        const token = req.headers['authorization'];
        if (token) {
            const {firstName, lastName } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            res.send({
                posts,
            });
        }
        res.send({
            posts
        });
        
        
    } catch (err) {
        res.send(err);
    }
}