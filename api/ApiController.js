'use strict'
const cloudinary = require('../utils/cloudinary');

class ApiController{
    async uploadImages(req, res){
        //req.files chính là khi upload multiple images
        let resPromises = req.files.map(file => new Promise((resolve, reject) => {
            cloudinary.uploadMultiple(file.path).then((result) => {
                resolve(result);
            })
        }))
        
        //Recevie result from promise
        Promise.all(resPromises)
        .then(async (urlImages) => {
           //arrUrlImages chính là toàn bộ đường link ảnh nhận được từ promise trước đó

           //Write data to DB

           //Return result client
           res.status(200).send(urlImages);
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

module.exports = new ApiController;