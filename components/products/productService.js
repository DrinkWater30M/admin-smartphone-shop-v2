const { models } = require('../../models');
const { Op, INTEGER } = require("sequelize");




let list = async (page = 0, itemPerPage = 9, name = '') => {
    console.log('name', page)

    let whereCondition = {}
    if (name != '') {
        whereCondition = {
            TenSanPham: {
                [Op.substring]: name
            }
        }
    }
    return models.san_pham.findAll(
        {
            include: [
                {
                    model: models.hinh_anh_san_pham,
                    as: 'hinh_anh_san_phams',
                    attributes: ['HinhAnh']
                },
                {
                    model: models.thuong_hieu,
                    as: 'MaThuongHieu_thuong_hieu',
                    attributes: ['ThuongHieu']
                },
                {
                    model: models.loai_san_pham,
                    as: 'loai_san_phams',
                    attributes: ['DonGia', 'MauSac', 'Ram', 'Rom'],
                    //    where: fitlerTypeProducts,
                }
            ],
            // order: typeSort[currentSort],
            where: whereCondition,
            raw: true,
            offset: page * itemPerPage,
            limit: itemPerPage,
        }
    )
        .then((data) => {
            //Get first item of each products
            data = Object.values(data).filter((item, i, a) => a.findIndex(t => (t.MaSanPham === item.MaSanPham)) === i);
            return data;
        })
}

let createProduct = async (data) => {
    // Tìm mã sản phẩm
    let productList = await models.san_pham.findAll({ raw: true })
    let max = 0
    for (let i = 0; i < productList.length; i++) {
        let id = productList[i].MaSanPham
        id = id.substring(2);

        if (parseInt(id) > max)
            max = parseInt(id);
    }
    let MaSanPham = 'SP';
    for (let i = 0; i < 8 - max.toString().length; i++) {
        MaSanPham = MaSanPham + '0';
    }
    MaSanPham = MaSanPham + (max + 1);

    // return new Promise(async (resolve, reject) => {
    //     try {
    //         await models.san_pham.create({
    //             MaSanPham: MaSanPham,
    //             TenSanPham: data.productName,

    //         })
    //     } catch (e) {
    //         reject(e)
    //     }
    // })
}

module.exports = {
    list: list,
    createProduct: createProduct
}