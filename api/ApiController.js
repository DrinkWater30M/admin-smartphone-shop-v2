'use strict'
const cloudinary = require('../utils/cloudinary');
const productService = require('../components/products/productService');

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
           //urlImages chính là toàn bộ đường link ảnh nhận được từ promise trước đó
           let data = req.body;
           data.urlImages = urlImages;

           //Write data to DB
           try{
                //Add product
                await productService.addProduct(data);

                //Return result client
                res.status(200).json({redirectUrl: '/products'});
           }
           catch(error){
               console.log(error);
               res.status(500).json({error: "Server đã có lỗi gì đó!"});
           }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({error: "Server đã có lỗi gì đó!"});
        })
    };

    async uploadImage(req, res){
        //req.files chính là khi upload multiple images
        let resPromises = req.files.map(file => new Promise((resolve, reject) => {
            cloudinary.uploadMultiple(file.path).then((result) => {
                resolve(result);
            })
        }))
        
        //Recevie result from promise
        Promise.all(resPromises)
        .then(async (urlImages) => {
           //urlImages chính là toàn bộ đường link ảnh nhận được từ promise trước đó
           let data = req.body;
           data.urlImages = urlImages;

           //Write data to DB
           try{
                //Add product
                await productService.addImage(data);

                //Return result client
                res.status(200).json({redirectUrl: '/products'});
           }
           catch(error){
               console.log(error);
               res.status(500).json({error: "Server đã có lỗi gì đó!"});
           }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({error: "Server đã có lỗi gì đó!"});
        })
    }
}

module.exports = new ApiController;