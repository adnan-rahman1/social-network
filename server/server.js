const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const authRoute = require("./routes/authenticate");
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');


const corsOptions = {
  origin: 'http://localhost:3000',
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));


// Mongodb
require('./db');

app.use("/admin", authRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);


const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`Backend server running on port: ${port}`));