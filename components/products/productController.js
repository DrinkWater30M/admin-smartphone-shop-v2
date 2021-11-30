const productService = require('./productService');

exports.list = async (req, res) => {

    let pageNumber = 0
    if (!isNaN(req.query.page) && req.query.page > 0)
        pageNumber = req.query.page - 1;
    else
        pageNumber = 0;

    let nameProduct = ''
    if (req.query.search != null)
        nameProduct = req.query.search

    const itemPerPage = 9
    const products = await productService.list(pageNumber,itemPerPage, nameProduct);
    console.log('i', products);
    res.render('products/productList', { products });
}