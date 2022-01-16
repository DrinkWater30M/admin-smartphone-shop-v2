const models = require('../../models');
const productService = require('./productService');

let list = async (req, res) => {

    let pageNumber = 0
    console.log('page', !isNaN(req.query.page))
    if (!isNaN(req.query.page) && req.query.page > 0)
        pageNumber = req.query.page - 1;
    else
        pageNumber = 0;

    let nameProduct = ''
    if (req.query.search != null) {
        nameProduct = req.query.search
    }

    const itemPerPage = 9
    const products = await productService.list(pageNumber, itemPerPage, nameProduct);
    console.log('i', products);
    const totalProduct = await productService.getAllProduct();
    res.render('products/productList', { products, totalProduct: totalProduct.length, currentPage: pageNumber + 1 });
}

let addProduct = async (req, res) => {
    console.log('baaaaaaaaaaaaaaaaaaa', req.body)
    await productService.addProduct(req.body);
    return res.send('post crud');
}

let detailProduct = async (req, res) => {
    
    const infoProduct = await productService.detailProduct(req.params.MaSanPham);
    const images = await productService.getImagesProduct(req.params.MaSanPham);
    let i = 1;
    infoProduct.forEach(element => {
        element.index = i;
        i++;
    });
    console.log("🚀 ~ file: productController.js ~ line 38 ~ detailProduct ~ infoProduct", images)

    res.render('products/productDetail', { infoProduct, images })
    // productService.editProduct(req.data)
    // await list(req, res);
}

module.exports = {
    list: list,
    addProduct: addProduct,
    detailProduct: detailProduct
}


