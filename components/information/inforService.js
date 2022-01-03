const { models } = require('../../models');

const infoShop = async () => {
    return models.cua_hang.findAll({raw: true});
}

module.exports = {
    infoShop: infoShop
}