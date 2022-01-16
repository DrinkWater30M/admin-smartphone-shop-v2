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
        let j = i + 1;
        while (j < orderList.length) {
            if (orderList[i].MaKhachHang == orderList[j].MaKhachHang && orderList[i].MaDonHang == orderList[j].MaDonHang) {
                order[count] = orderList[j];
                count++;
                orderList.splice(j, 1)
            }
            else
                j++;
        }
        let totalPrice = 0;
        order.forEach(element => {
            totalPrice += element.DonGia * element.SoLuongSanPham;
        })
        order[0].TongTien = totalPrice;
        orders[d] = order;
        console.log("🚀 ~ file: orderController.js ~ line 29 ~ getOrderList ~ order", order)
        d++;
    }
    console.log(orders)
    const totalOrders = orders.length;
    let willDeliver = 0;
    let delivering = 0;
    let delivered = 0
    orders.forEach(element => {
        if (element[0].TrangThaiDonHang == 0)
            willDeliver++
        else if (element[0].TrangThaiDonHang == 1)
            delivering++
        else if (element[0].TrangThaiDonHang == 2)
            delivered++
    });
    let i = pageNumber * itemPerPage;
    res.render('orders/orderList', { currentPage: pageNumber + 1, order1: orders[i], order2: orders[i + 1], order3: orders[i + 2], order4: orders[i + 3], totalOrders, willDeliver, delivering, delivered });

}

const handlingOrder = async (req, res) => {
    if (req.body.choose === 'update')
        await orderService.updateOrder(req.body.order_id, req.body.account_id);
    else if (req.body.choose === 'del')
        await orderService.delOrder(req.body.order_id, req.body.account_id);
    await getOrderList(req, res);
}

module.exports = {
    getOrderList: getOrderList,
    handlingOrder: handlingOrder
}