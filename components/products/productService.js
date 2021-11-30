const { models } = require('../../models');
const { Op, INTEGER } = require("sequelize");
const thuong_hieu = require('../../models/thuong_hieu');




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

    let thuongHieu = await models.thuong_hieu.findAll({ raw: true })
    let MaThuongHieu = '';
    thuongHieu.forEach(element => {
        if (element.ThuongHieu == data.thuongHieu)
            MaThuongHieu = element.MaThuongHieu;
    });

    if (MaThuongHieu == '') {
        MaThuongHieu = data.thuongHieu.substring(0, 3);
        await models.thuong_hieu.create({
            MaThuongHieu: MaThuongHieu,
            ThuongHieu: data.thuongHieu,
        })
    }
    console.log("🚀 ~ file: productService.js ~ line 78 ~ createProduct ~ MaThuongHieu", MaThuongHieu)

    return new Promise(async (resolve, reject) => {
        try {
            await models.san_pham.create({
                MaSanPham: MaSanPham,
                TenSanPham: data.productName,
                MaThuongHieu: MaThuongHieu,
            });

            await models.loai_san_pham.create({
                MaSanPham: MaSanPham,
                LoaiSanPham: data.dungLuong,
                DonGia: data.donGia,
                SoLuong: data.soLuong,
                HinhAnhMinhHoa: '',
                Ram: data.ram,
                Rom: data.rom,
                ManHinh: data.manHinh,
                DoPhanGiai: data.doPhanGiai,
                ChipXuLi: data.chipXuLy,
                Pin: data.pin,
                MauSac: data.mauSac
            });
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    list: list,
    createProduct: createProduct
}