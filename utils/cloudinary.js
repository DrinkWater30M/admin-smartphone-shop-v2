'use strict'
const cloudinary = require("cloudinary").v2;
const fs = require('fs');

// config for cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET 
});

//Handle after upload to clouddinary
class Cloudinary{
    uploadMultiple(file){
        return new Promise(resolve => {
            cloudinary.uploader.upload(file, {
                folder: 'Smartphone-Shop'
            })
            .then(result => {
                //Rececie object data from cloudinary, handle it
                if (result) {
                    //Remove image in local server
                    fs.unlinkSync(file);

                    //Return result for promise next
                    resolve({
                        url: result.secure_url,
                    })
                }
            })
            .catch(error=>{
                console.log(error);
            })
        })
    }
}

module.exports = new Cloudinary;