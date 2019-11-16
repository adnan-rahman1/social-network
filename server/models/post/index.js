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
        require: "Body is required",
        minlength: 4,
    },
});

module.exports = mongoose.model("Post", postSchema);