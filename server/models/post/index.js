const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: "Title is required",
        minlength: 4,
        maxlength: 150,
    },
    body: {
        type: String,
        required: "Body is required",
        minlength: 4,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
});

module.exports = mongoose.model("Post", postSchema);