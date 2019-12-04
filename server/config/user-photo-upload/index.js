const multer = require('multer');


const storage = multer.diskStorage({
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
const fileFilter = (req, file, cb) => {
    const FileType = ["jpg", "png", "jpeg"];
    const isFileTypeMatched = FileType.some(ext => ext == file.originalname.split(".")[1]);
    if (!isFileTypeMatched) {
        cb(new Error("Please upload a png or jpg or jpeg file"));
    }
    cb(null, true);
}
  
const upload = multer({
    // storage,
    limits: {
        fileSize: 90000
    },
    fileFilter,
}).single('photo');

module.exports = upload;