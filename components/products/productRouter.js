const express = require('express');
const router = express.Router();

const productController = require('./productController')
/* GET home page. */
router.get('/', productController.list);
router.get('/add', function(req, res, next) {
    res.render('products/productInsert');
});

router.post('/add/post', productController.addProduct);

module.exports = router;
