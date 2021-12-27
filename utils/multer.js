const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //Hỉnh ảnh sẽ chưa trong folder uploads
        cb(null, './uploads/'); 
    },

    filename: (req, file, cb) => {
        // Mặc định sẽ save name của hình ảnh, ta dùng name gốc
        cb(null , file.originalname);
    }
})

//Save trên local của server khi dùng multer
const upload = multer({storage:storage}); 

module.exports = upload;