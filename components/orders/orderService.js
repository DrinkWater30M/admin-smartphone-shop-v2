const { models, sequelize } = require('../../models');
const { Op, INTEGER, QueryTypes } = require("sequelize");

const getOrderList = async () => {
    const orderList = await sequelize.query(
        `SELECT * FROM don_hang, khach_hang, san_pham, thuong_hieu, loai_san_pham  
        WHERE khach_hang.MaKhachHang = don_hang.MaKhachHang and don_hang.MaSanPham = san_pham.MaSanPham and thuong_hieu.MaThuongHieu = san_pham.MaThuongHieu
        and loai_san_pham.MaSanPham = don_hang.MaSanPham and loai_san_pham.LoaiSanPham = don_hang.LoaiSanPham`,
        { type: QueryTypes.SELECT });
    return orderList;
}

module.exports = {
    getOrderList: getOrderList
}