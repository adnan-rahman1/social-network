const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');

// Mongodb
require('./db');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/user', userRoute);
app.use('/post', postRoute);


const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`Backend server running on port: ${port}`));