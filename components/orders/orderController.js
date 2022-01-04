const models = require('../../models');
const orderService = require('./orderService');

//TODO: cần phải chỉnh lại cho tốt
const getOrderList = async (req, res) => {
    let pageNumber = 0
    if (!isNaN(req.query.page) && req.query.page > 0)
        pageNumber = req.query.page - 1;
    else
        pageNumber = 0;
    const itemPerPage = 4

    const orderList = await orderService.getOrderList();
    // nối các sản phẩm thuôc 1 đơn hàng lại với nhau
    let orders = [];
    let d = 0;
    for (let i = 0; i < orderList.length; i++) {
        let count = 1;
        let order = [];
        order[0] = orderList[i];
        for (let j = i + 1; j < orderList.length; j++) {
            if (orderList[i].MaKhachHang == orderList[j].MaKhachHang && orderList[i].MaDonHang == orderList[j].MaDonHang) {
                order[count] = orderList[j];
                count++;
                orderList.splice(j, 1)
            }
        }
        orders[d] = order;
        d++;
    }
    console.log(orders)
    let i = pageNumber * itemPerPage;
    res.render('orders/orderList', { currentPage: pageNumber + 1, order1: orders[i], order2: orders[i + 1], order3: orders[i + 2], order4: orders[i + 3] });

}

module.exports = {
    getOrderList: getOrderList
}