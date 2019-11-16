const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

module.exports = mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => console.log('database connected successfully'));



