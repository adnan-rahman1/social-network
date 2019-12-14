const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

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
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avater: {
    type: Buffer,
    contentType: String
  },
  following: [{
    type: ObjectId,
    ref: "User",
  }],
  followers: [{
    type: ObjectId,
    ref: "User",
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

module.exports = mongoose.model("User", userSchema);
