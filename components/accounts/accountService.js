const bcrypt = require('bcrypt');
const { models } = require('../../models');
const { Op, INTEGER } = require("sequelize");


let listAdmin = async () => {
    return models.quan_tri_vien.findAll({ raw: true });
}

let createNewAdmin = async (data) => {
    let accountAdmin = await models.quan_tri_vien.findAll({ raw: true })
    //Kiem tra tên đăng nhập đã tồn tại hay chưa
    for (let i = 0; i < accountAdmin.length; i++) {
        if (accountAdmin[i].TenDangNhap == data.username)
            return false
    }
    //hash
    let saltRounds = 10;
    let hashPassword = await bcrypt.hash(data.password, saltRounds);

    return new Promise(async (resolve, reject) => {
        try {
            await models.quan_tri_vien.create({
                TenNguoiSuDung: data.name,
                TenDangNhap: data.username,
                MatKhau: hashPassword,
                Email: data.email
            });
            resolve()
        } catch (e) {
            reject(e)
        }
    })

}

let listCustomer = async () => {
    return models.khach_hang.findAll({ where: { is_del: 0 }, raw: true });
}

const delAccount = async (data) => {
    let account = await models.khach_hang.findOne({ where: { MaKhachHang: data.account_id } })
    if (account) {
        await models.khach_hang.update({ is_del: 1 }, { where: { MaKhachHang: data.account_id } })
    }
}

const blockAccount = async (data) => {
    let account = await models.khach_hang.findOne({ where: { MaKhachHang: data.account_id } })
    if (account) {
        await models.khach_hang.update({ is_block: 1 }, { where: { MaKhachHang: data.account_id } })
    }
}

const unblockAccount = async (data) => {
    let account = await models.khach_hang.findOne({ where: { MaKhachHang: data.account_id } })
    if (account) {
        await models.khach_hang.update({ is_block: 0 }, { where: { MaKhachHang: data.account_id } })
    }
}

const getOneAccountById = async (id) => {
    return models.quan_tri_vien.findOne({ where: { MaAdmin: id }, raw: true });
}

const editInfo = async (id, data) => {
    console.log("🚀 ~ file: accountService.js ~ line 67 ~ editInfo ~ data", data)
    await models.quan_tri_vien.update(
        {
            TenNguoiSuDung: data.ten_nguoi_su_dung,
            TenDangNhap: data.ten_dang_nhap,
            Email: data.email
        },
        { where: { MaAdmin: id } });
}

module.exports = {
    listAdmin: listAdmin,
    listCustomer: listCustomer,
    createNewAdmin: createNewAdmin,
    delAccount: delAccount,
    blockAccount: blockAccount,
    unblockAccount: unblockAccount,
    getOneAccountById: getOneAccountById,
    editInfo: editInfo
}