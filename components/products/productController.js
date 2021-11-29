const productService = require('./productService');

exports.list = async (req, res) => {

    let pageNumber = 0
    if (!isNaN(req.query.page) && req.query.page > 0)
        pageNumber = req.query.page - 1;
    else
        pageNumber = 0;

    const products = await productService.list(pageNumber);
    console.log('i', products);
    res.render('products/productList', { products });
}