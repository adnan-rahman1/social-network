const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const multer = require('multer');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');

// Mongodb
require('./db');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(
            null, 
            file.originalname.split('.')[0] + 
            '-' + 
            Date.now() + 
            '.' + 
            file.originalname.split('.')[1]
        );
    }
});
function fileFilter (req, file, cb) {
    const FileType = ["jpg", "png", "jpeg"];
    const isFileTypeMatched = FileType.some(ext => ext == file.originalname.split(".")[1]);
    console.log(isFileTypeMatched);
    if (!isFileTypeMatched) {
        cb(new Error("Please upload a png file"));
    }
    cb(null, true);
}
  
let upload = multer({
    storage,
    limits: {
        fileSize: 90000
    },
    fileFilter,
});

app.post("/upload", upload.single("upload"), (req, res) => {
    res.send("Image upload successfully");
})




app.use('/user', userRoute);
app.use('/post', postRoute);


const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`Backend server running on port: ${port}`));