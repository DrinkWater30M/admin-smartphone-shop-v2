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
    console.log("choose", req.query.time_choose)
    res.render('index', { productsTop, choose });
}

module.exports = {
    getTopProducts: getTopProducts
} 