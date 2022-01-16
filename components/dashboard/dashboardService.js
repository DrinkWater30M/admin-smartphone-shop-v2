const { models, sequelize } = require('../../models');
const { Op, INTEGER, QueryTypes } = require("sequelize");

const getTopProducts = async (time) => {
    orders = await models.don_hang.findAll({ raw: true });
    orderNeed = []
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].ThoiGian.toISOString().indexOf(time) != -1)
            orderNeed.push(orders[i]);
    }

    let productId = [];
    let productNumber = [];
    for (let i = 0; i < orders.length; i++) { productNumber[i] = 0 }
    orderNeed.forEach(element => {
        let index = productId.indexOf(element.MaSanPham);
        if (index != -1)
            productNumber[index] += element.SoLuongSanPham;
        else {
            productId.push(element.MaSanPham)
            index = productId.indexOf(element.MaSanPham);
            productNumber[index] += element.SoLuongSanPham;
        }
    });
    console.log("orderNeed", productId)
    console.log("orderNeed", productNumber)
    return [productId, productNumber]
}

const getOneProduct = async (id) => {
    return await models.san_pham.findOne({ where: { MaSanPham: id }, raw: true });
}

module.exports = {
    getTopProducts: getTopProducts,
    getOneProduct: getOneProduct
}