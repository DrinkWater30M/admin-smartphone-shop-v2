const models = require('../../models');
const accountService = require('./accountService');

let list = async (req, res) => {
    const accountList = await accountService.list();
    console.log("acc", accountList)
    res.render('accounts/accountAdminList', { accountList });
}

module.exports = { list: list };