const models = require('../../models');
const information = require('./inforService');

let info = async (req, res) => {
    const infoShop = await information.infoShop();
    res.render('information', { infoShop: infoShop[0] });
}

module.exports = {
    info: info
} 