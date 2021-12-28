const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //Hỉnh ảnh sẽ chưa trong folder uploads
        const path = './public/uploads/';
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },

    filename: (req, file, cb) => {
        // Mặc định sẽ save name của hình ảnh, ta dùng name gốc
        cb(null , file.originalname);
    }
})

//Save trên local của server khi dùng multer
const upload = multer({storage:storage}); 

module.exports = upload;