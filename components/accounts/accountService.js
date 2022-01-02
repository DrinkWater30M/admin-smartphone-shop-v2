const { models } = require('../../models');
const { Op, INTEGER } = require("sequelize");


let listAdmin = async () => {
    return models.cua_hang.findAll({raw: true});
}

let createNewAdmin = async (data) => {
    let accountAdmin = await models.cua_hang.findAll({ raw: true })
    let max = 0
    for (let i = 0; i < accountAdmin.length; i++) {
        let id = accountAdmin[i].MaCuaHang
        if (parseInt(id) > max)
            max = parseInt(id);
    }
    let MaCuaHang = '';
    for (let i = 0; i < 9 - max.toString().length; i++) {
        MaCuaHang = MaCuaHang + '0';
    }
    MaCuaHang = MaCuaHang + (max + 1);

    //Kiem tra tên đăng nhập đã tồn tại hay chưa
    for (let i = 0; i < accountAdmin.length; i++) {
       if (accountAdmin[i].TenDangNhap == data.username)
        return false
    }
    return new Promise(async (resolve, reject) => {
        try {
            await models.cua_hang.create({
                MaCuaHang: MaCuaHang,
                TenCuaHang: data.name,
                TenDangNhap: data.username,
                MatKhau: data.password,
                Email: data.email
            });
            resolve()
        } catch (e) {
            reject(e)
        }
    })

}

let listCustomer = async () => {
    return models.khach_hang.findAll({where: {is_del: 0} ,raw: true});
}

const delAccount = async (data) => {
    let account = await models.khach_hang.findOne({where: {MaKhachHang: data.account_id}})
    if (account) {
        await models.khach_hang.update({is_del: 1}, {where: {MaKhachHang: data.account_id}})
    }
}

const blockAccount = async (data) => {
    let account = await models.khach_hang.findOne({where: {MaKhachHang: data.account_id}})
    if (account) {
        await models.khach_hang.update({is_block: 1}, {where: {MaKhachHang: data.account_id}})
    }
}

const unblockAccount = async (data) => {
    let account = await models.khach_hang.findOne({where: {MaKhachHang: data.account_id}})
    if (account) {
        await models.khach_hang.update({is_block: 0}, {where: {MaKhachHang: data.account_id}})
    }
}

module.exports = {
    listAdmin: listAdmin,
    listCustomer: listCustomer,
    createNewAdmin: createNewAdmin,
    delAccount: delAccount,
    blockAccount: blockAccount,
    unblockAccount: unblockAccount
}