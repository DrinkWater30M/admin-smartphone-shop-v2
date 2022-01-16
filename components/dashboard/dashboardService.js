const { models, sequelize } = require('../../models');
const { Op, INTEGER, QueryTypes } = require("sequelize");

const getTopProducts = async (time) => {
    orders = await models.don_hang.findAll({ where: { TrangThaiDonHang: 2 }, raw: true });
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

const statictis = async () => {
    orders = await models.don_hang.findAll({ where: { TrangThaiDonHang: 2 }, raw: true });
    let date = "";
    const d = new Date();
    let day = d.getDate().toString();
    if (day.length == 1)
        day = '0' + day;
    let month = (d.getMonth() + 1).toString();
    if (month.length == 1)
        month = '0' + month;
    const year = d.getFullYear().toString()

    date = year + '-' + month + '-' + day;
    let orderDay = []
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].ThoiGian.toISOString().indexOf(date) != -1)
            orderDay.push(orders[i]);
    }

    date = year + '-' + month;
    let orderMonth = []
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].ThoiGian.toISOString().indexOf(date) != -1)
            orderMonth.push(orders[i]);
    }
    date = year;
    let orderYear = []
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].ThoiGian.toISOString().indexOf(date) != -1)
            orderYear.push(orders[i]);
    }

    return [orderDay, orderMonth, orderYear];
}

module.exports = {
    getTopProducts: getTopProducts,
    getOneProduct: getOneProduct,
    statictis: statictis
}