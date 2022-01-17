const express = require('express');
const router = express.Router();
const apiControlle = require('./ApiController');
const uploadMulter = require('../utils/multer');

/* POST images from client */
router.post('/upload-images', uploadMulter.any(), apiControlle.uploadImages);
router.post('/upload-image', uploadMulter.any(), apiControlle.uploadImage);

module.exports = router;
