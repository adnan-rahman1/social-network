const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const route = require('./routes/user');
const todoRoute = require('./routes/todo/');

// Mongodb
require('./db');


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/user', route);
app.use('/todo', todoRoute);

// app.get("/", (req, res) => {
//     const user = {
//         name: "Adnan Rahman",
//         login: true,
//     }
//     const header = req.headers.authorization;
//     console.log(header);
//     if (header === null)
//         console.log('no header found');
//     res.send(user);
// });

// app.post("/post", (req, res) => {
//     const userToken = {
//         id: 1,
//         token: 'ajljldjlsjfljdahjhljalfjldajfjdajfdl',
//     }
//     res.send(userToken);
// });

const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`Backend server running on port: ${port}`));