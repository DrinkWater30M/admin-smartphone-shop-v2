const models = require('../../models');
const accountService = require('./accountService');

let listAccountAdmin = async (req, res) => {
    const accountList = await accountService.list();
    res.render('accounts/accountAdminList', { accountList });
}


let info = async (req, res) => {
    const accountList = await accountService.list();
    res.render('information', { account: accountList[0] });
}

let createAccountAdmin = async (req, res) => {
    const check = await accountService.createNewAdmin(req.body);
    if (check == false) {
        res.render('accounts/InsertAdmin', { message: 'Tên đăng nhập đã tồn tại!' })
    }
    else
        await listAccountAdmin(req, res);
}

module.exports = {
    listAccountAdmin: listAccountAdmin,
    info: info,
    createAccountAdmin: createAccountAdmin
};