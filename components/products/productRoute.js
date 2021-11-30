const express = require('express');
const router = express.Router();

const productController = require('./productController')
/* GET home page. */
router.get('/', productController.list);

module.exports = router;
