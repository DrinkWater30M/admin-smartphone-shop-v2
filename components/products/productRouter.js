const express = require('express');
const router = express.Router();

const productController = require('./productController')
/* GET home page. */
router.get('/', productController.list);
router.get('/add', function(req, res, next) {
    res.render('products/productInsert');
});

router.post('/add/post', productController.addProduct);
router.get('/:MaSanPham', productController.detailProduct);
router.get('/:MaSanPham/add', productController.showCategory);
router.get('/:MaSanPham/:LoaiSanPham', productController.showCategory);
router.post('/:MaSanPham/:LoaiSanPham', productController.addCategory);
router.post('/:MaSanPham/:LoaiSanPham/del', productController.delCategory);
router.post('/del', productController.delProduct);
router.post('/:MaSanPham', productController.editProduct);


module.exports = router;
