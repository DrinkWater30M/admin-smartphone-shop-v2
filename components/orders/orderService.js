const { models, sequelize } = require('../../models');
const { Op, INTEGER, QueryTypes } = require("sequelize");

const getOrderList = async () => {
    const orderList = await sequelize.query(
        `SELECT * FROM DON_HANG, KHACH_HANG, SAN_PHAM, THUONG_HIEU, LOAI_SAN_PHAM  
        WHERE KHACH_HANG.MaKhachHang = DON_HANG.MaKhachHang and DON_HANG.MaSanPham = SAN_PHAM.MaSanPham and THUONG_HIEU.MaThuongHieu = SAN_PHAM.MaThuongHieu
        and LOAI_SAN_PHAM.MaSanPham = DON_HANG.MaSanPham and LOAI_SAN_PHAM.LoaiSanPham = DON_HANG.LoaiSanPham and DON_HANG.is_del = 0`,
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