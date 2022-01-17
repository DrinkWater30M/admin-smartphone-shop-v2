const { models, sequelize } = require('../../models');
const { Op, INTEGER, QueryTypes } = require("sequelize");

const getOrderList = async () => {
    const orderList = await sequelize.query(
        `SELECT * FROM don_hang, khach_hang, san_pham, thuong_hieu, loai_san_pham  
        WHERE khach_hang.MaKhachHang = don_hang.MaKhachHang and don_hang.MaSanPham = san_pham.MaSanPham and thuong_hieu.MaThuongHieu = san_pham.MaThuongHieu
        and loai_san_pham.MaSanPham = don_hang.MaSanPham and loai_san_pham.LoaiSanPham = don_hang.LoaiSanPham and don_hang.is_del = 0`,
        { type: QueryTypes.SELECT });
    return orderList;
}

const updateOrder = async (order_id, account_id) => {
    let order = await models.don_hang.findOne({
        where: {
            MaKhachHang: account_id,
            MaDonHang: order_id,
            is_del: 0
        },
        raw: true
    })
    console.log("🚀 ~ file: orderService.js ~ line 22 ~ updateOrder ~ order", order)
    if (order) {
        if (order.TrangThaiDonHang === 0) {
            await models.don_hang.update({ TrangThaiDonHang: 1 }, {
                where: {
                    MaKhachHang: account_id,
                    MaDonHang: order_id,
                    is_del: 0
                }
            })
            return true;
        }
        else if (order.TrangThaiDonHang === 1) {
            let product = await models.loai_san_pham.findOne({
                where: {
                    MaSanPham: order.MaSanPham,
                    LoaiSanPham: order.LoaiSanPham,
                    is_del: 0
                },
                raw: true
            });

            if (!product) 
                return false
            if (product.SoLuong < order.SoLuongSanPham)
                return false;
            else {
                await models.don_hang.update({ TrangThaiDonHang: 2 }, {
                    where: {
                        MaKhachHang: account_id,
                        MaDonHang: order_id,
                        is_del: 0
                    }
                })
                const number = product.SoLuong - order.SoLuongSanPham;
                await models.loai_san_pham.update({ SoLuong:  number}, {
                    where: {
                        MaSanPham: order.MaSanPham,
                        LoaiSanPham: order.LoaiSanPham,
                        is_del: 0
                    },
                })
                return true;
            }
        }
    }
}

const delOrder = async (order_id, account_id) => {
    let order = await models.don_hang.findOne({
        where: {
            MaKhachHang: account_id,
            MaDonHang: order_id,
            is_del: 0
        },
        raw: true
    })
    if (order) {
        await models.don_hang.update({ is_del: 1 }, {
            where: {
                MaKhachHang: account_id,
                MaDonHang: order_id,
                is_del: 0
            }
        })
    }

}

module.exports = {
    getOrderList: getOrderList,
    updateOrder: updateOrder,
    delOrder: delOrder
}