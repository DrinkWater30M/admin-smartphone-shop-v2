const dashboardService = require('./dashboardService');

let getTopProducts = async (req, res) => {
    let choose = 'month';
    if (req.query.time_choose != null)
        choose = req.query.time_choose;

    let date = "";
    if (choose == 'month') {
        const d = new Date();
        date = d.getFullYear().toString() + '-';
        if ((d.getMonth() + 1).toString().length == 1)
            date = date + '0' + (d.getMonth() + 1).toString();
    } else {
        const d = new Date();
        date = d.getFullYear().toString();
    }
    // Lấy ra danh sách product đi kèm với số lượng của nó
    let [products, number] = await dashboardService.getTopProducts(date);
    //Sắp xếp lại theo thứ tự giảm dần
    for (let i = 0; i < products.length - 1; i++) {
        for (let j = i + 1; j < products.length; j++) {
            if (number[i] < number[j]) {
                let temp = number[i];
                number[i] = number[j];
                number[j] = temp;
                temp = products[i];
                products[i] = products[j];
                products[j] = temp;
            }
        }
    }

    let productsTop = [];
    for (let i = 0; i < products.length; i++) {
        let infoProduct = await dashboardService.getOneProduct(products[i]);
        productsTop.push(infoProduct);
    }
    let index = 0;
    productsTop.forEach(element => {
        element.number = number[index];
        element.index = index + 1;
        index++;
    })
    if (productsTop.length > 10)
        productsTop.slice(0, 10);

    let [orderDay, orderMonth, orderYear] = await dashboardService.statictis()
    // thống kê ngày
    let totalMoney = 0;
    let numberProduct = 0;
    let statictis = [];
    let temp = {};

    orderDay.forEach(element => {
        totalMoney += element.DonGia * element.SoLuongSanPham;
        numberProduct += element.SoLuongSanPham;
    })
    temp.name = 'Ngày';
    temp.totalMoney = totalMoney;
    temp.numberProduct = numberProduct;
    temp.numberOrder = orderDay.length;
    statictis.push(temp)

    // thống kê ngày
    totalMoney = 0;
    numberProduct = 0;
    temp = {};
    orderMonth.forEach(element => {
        totalMoney += element.DonGia * element.SoLuongSanPham;
        numberProduct += element.SoLuongSanPham;
    })
    temp.name = 'Tháng';
    temp.totalMoney = totalMoney;
    temp.numberProduct = numberProduct;
    temp.numberOrder = orderMonth.length;
    statictis.push(temp)

    // thống kê ngày
    totalMoney = 0;
    numberProduct = 0;
    temp = {};
    orderYear.forEach(element => {
        totalMoney += element.DonGia * element.SoLuongSanPham;
        numberProduct += element.SoLuongSanPham;
    })
    temp.name = 'Năm';
    temp.totalMoney = totalMoney;
    temp.numberProduct = numberProduct;
    temp.numberOrder = orderYear.length;
    statictis.push(temp) 

    console.log("choose", statictis)
    res.render('index', { productsTop, choose, statictis });
}

module.exports = {
    getTopProducts: getTopProducts
} 