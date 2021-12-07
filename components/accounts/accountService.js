const { models } = require('../../models');
const { Op, INTEGER } = require("sequelize");




let list = async () => {
    return models.cua_hang.findAll({raw: true});
}

module.exports = {
    list: list
}