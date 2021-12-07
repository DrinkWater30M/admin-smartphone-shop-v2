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
    console.log("aa", req.body);
    await accountService.createNewAdmin(req.body);
    await listAccountAdmin(req, res);
}

module.exports = { 
    listAccountAdmin: listAccountAdmin,
    info: info,
    createAccountAdmin: createAccountAdmin
};