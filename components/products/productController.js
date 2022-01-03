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
    res.render('products/productList', { products, totalProduct: totalProduct.length, currentPage: pageNumber+1 });
}

let addProduct = async (req, res) => {
    console.log('b',req.body)
    await productService.createProduct(req.body);
    return res.send('post crud');
}

module.exports = {
    list: list,
    addProduct: addProduct,
}


