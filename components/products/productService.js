const { models, sequelize } = require('../../models');
const { Op, INTEGER, QueryTypes } = require("sequelize");

let list = async (page = 0, itemPerPage = 9, name = '') => {
    console.log('name', page)

    let whereCondition = { is_del: 0 }
    if (name != '') {
        whereCondition = {
            TenSanPham: {
                [Op.substring]: name
            },
            is_del: 0
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

let addProduct = async (data) => {
    try {
        //Generate idBrand
        let idBrand = data.brand.substring(0, 3);
        data.brand = data.brand[0].toUpperCase() + data.brand.substr(1).toLowerCase();
        let brand = await sequelize.query(
            `SELECT * FROM THUONG_HIEU WHERE THUONG_HIEU.MaThuongHieu = '${idBrand}'`,
            { type: QueryTypes.SELECT }
        );
        if (brand.length == 0) {
            await sequelize.query(
                `INSERT INTO THUONG_HIEU(MaThuongHieu, ThuongHieu) VALUE('${idBrand}', '${data.brand}');`)
        }

        //Insert product
        await sequelize.query(
            `INSERT INTO SAN_PHAM(TenSanPham, MaThuongHieu, MoTa)
            VALUE('${data.productName}', '${idBrand}', '${data.description}');`
        )

        //Get id product after add
        let newProduct = (await sequelize.query(
            `SELECT SAN_PHAM.MaSanPham FROM SAN_PHAM  WHERE SAN_PHAM.TenSanPham = '${data.productName}'`,
            { type: QueryTypes.SELECT }
        ))
        let idProduct = newProduct[0].MaSanPham;
        //Insert images
        for (let i = 0; i < data.urlImages.length; i++) {
            await sequelize.query(
                `INSERT INTO HINH_ANH_SAN_PHAM(MaSanPham, HinhAnh)
                VALUE (${idProduct}, '${data.urlImages[i].url}');`
            )
        }

        //Insert category
        if (!Array.isArray(data.price)) {
            let idCategory = (new Date()).toISOString();
            await sequelize.query(
                `INSERT INTO LOAI_SAN_PHAM(MaSanPham, LoaiSanPham, TenLoaiSanPham, DonGia, SoLuong, Ram, Rom, 
                        ManHinh, DoPhanGiai, ChipXuLi, Pin, MauSac)
                    VALUE(${idProduct},  '${idCategory}', '${data.type}', ${data.price}, ${data.amount}, ${data.ram}, ${data.rom},
                        '${data.screen}', '${data.resolution}', '${data.cpu}', ${data.battery}, '${data.color}');`
            )
        }
        else {
            for (let i = 0; i < data.price.length; i++) {
                let idCategory = (new Date()).toISOString();
                await sequelize.query(
                    `INSERT INTO LOAI_SAN_PHAM(MaSanPham, LoaiSanPham, TenLoaiSanPham, DonGia, SoLuong, Ram, Rom, 
                        ManHinh, DoPhanGiai, ChipXuLi, Pin, MauSac)
                    VALUE(${idProduct}, '${idCategory[i]}', '${data.type[i]}', ${data.price[i]}, ${data.amount[i]}, ${data.ram[i]}, ${data.rom[i]},
                        '${data.screen[i]}', '${data.resolution[i]}', '${data.cpu[i]}', ${data.battery[i]}, '${data.color[i]}');`
                )
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

let getAllProduct = async () => {
    return models.san_pham.findAll({ raw: true });
}

let detailProduct = async (MaSanPham) => {
    let product = await sequelize.query(
        `SELECT * FROM SAN_PHAM, THUONG_HIEU, LOAI_SAN_PHAM WHERE SAN_PHAM.MaSanPham = '${MaSanPham}' and THUONG_HIEU.MaThuongHieu = SAN_PHAM.MaThuongHieu
         and LOAI_SAN_PHAM.MaSanPham = '${MaSanPham}' and SAN_PHAM.is_del = 0 and LOAI_SAN_PHAM.is_del = 0`,
        { type: QueryTypes.SELECT }
    );
    return product;
}
let getImagesProduct = async (MaSanPham) => {
    const images = await sequelize.query(
        `SELECT * FROM HINH_ANH_SAN_PHAM WHERE HINH_ANH_SAN_PHAM.MaSanPham = '${MaSanPham}'`, { type: QueryTypes.SELECT }
    );
    return images;
}

let getCategory = async (MaSanPham, MaLoaiSanPham) => {
    return await models.loai_san_pham.findOne({ where: { MaSanPham: MaSanPham, LoaiSanPham: MaLoaiSanPham, is_del: 0 }, raw: true });
}

let addCategory = async (data, idProduct) => {
    let category = await getCategory(data.idProduct, data.idCategory);
    if (category) {
        await models.loai_san_pham.update({
            TenLoaiSanPham: data.type,
            DonGia: data.price,
            SoLuong: data.amount,
            Ram: data.ram,
            Rom: data.rom,
            ManHinh: data.screen,
            DoPhanGiai: data.resolution,
            ChipXuLi: data.cpu,
            Pin: data.battery,
            MauSac: data.color
        }, {
            where: {
                MaSanPham: data.idProduct,
                LoaiSanPham: data.idCategory
            }
        });
    } else {
        let idCategory = (new Date()).toISOString();

        await models.loai_san_pham.create({
            MaSanPham: idProduct,
            LoaiSanPham: idCategory,
            TenLoaiSanPham: data.type,
            DonGia: data.price,
            SoLuong: data.amount,
            Ram: data.ram,
            Rom: data.rom,
            ManHinh: data.screen,
            DoPhanGiai: data.resolution,
            ChipXuLi: data.cpu,
            Pin: data.battery,
            MauSac: data.color
        });
    }
}

let editProduct = async (data, idProduct) => {
    let product = await models.san_pham.findOne({ where: { MaSanPham: idProduct, is_del: 0 }, raw: true });

    let idBrand = data.brand.substring(0, 3);
    let brand = await sequelize.query(
        `SELECT * FROM THUONG_HIEU WHERE THUONG_HIEU.MaThuongHieu = '${idBrand}'`,
        { type: QueryTypes.SELECT }
    );
    if (brand.length == 0) {
        await sequelize.query(
            `INSERT INTO THUONG_HIEU(MaThuongHieu, ThuongHieu) VALUE('${idBrand}', '${data.brand}');`)
    }


    if (product) {
        console.log("🚀 ~ file: productService.js ~ line 235 ~ editProduct ~ product", idProduct)

        await models.san_pham.update({
            TenSanPham: data.productName,
            ThuongHieu: data.brand,
            MoTa: data.description
        }, {
            where: {
                MaSanPham: idProduct,
                is_del: 0,
            }
        });
    }
}

const delCategory = async (data) => {
    let category = await models.loai_san_pham.findOne({ where: { MaSanPham: data.idProduct, LoaiSanPham: data.idCategory } })
    if (category) {
        await models.loai_san_pham.update({ is_del: 1 }, { where: { MaSanPham: data.idProduct, LoaiSanPham: data.idCategory } })
    }
}

const delProduct = async (data) => {
    let product = await models.san_pham.findOne({ where: { MaSanPham: data.idProduct } })
    if (product) {
        await models.san_pham.update({ is_del: 1 }, { where: { MaSanPham: data.idProduct } })
        await models.loai_san_pham.update({ is_del: 1 }, { where: { MaSanPham: data.idProduct } })
    }

}
const delImage = async (data) => {
    await models.hinh_anh_san_pham.destroy({ where: { MaHinhAnh: data.idImage } })
}

const addImage = async (data) => {
    console.log("🚀 ~ file: productService.js ~ line 284 ~ addImage ~ data", data)
    const idProduct = data.idProduct
    for (let i = 0; i < data.urlImages.length; i++) {
        await sequelize.query(
            `INSERT INTO HINH_ANH_SAN_PHAM(MaSanPham, HinhAnh)
        VALUE (${idProduct}, '${data.urlImages[i].url}');`
        )
    }

}

module.exports = {
    list: list,
    createProduct: createProduct,
    addProduct: addProduct,
    getAllProduct: getAllProduct,
    detailProduct: detailProduct,
    getImagesProduct: getImagesProduct,
    getCategory: getCategory,
    addCategory: addCategory,
    editProduct: editProduct,
    delCategory: delCategory,
    delProduct: delProduct,
    delImage: delImage,
    addImage: addImage
}