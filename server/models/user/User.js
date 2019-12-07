const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        default: "Anonymouse"
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return v !== "";
            }
        },
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avater: {
        type: Buffer,
        contentType: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});


module.exports = mongoose.model('User', userSchema);