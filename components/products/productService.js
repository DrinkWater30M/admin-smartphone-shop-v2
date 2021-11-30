const { models } = require('../../models');
const { Op } = require("sequelize");

exports.list = (page = 0, itemPerPage = 9, name = '') => {
    console.log('name', name)
    if (name != '')
        return models.san_pham.findAll({
            where: {
                TenSanPham: {
                    [Op.substring]: name
                }
            },
            offset: page * itemPerPage,
            limit: itemPerPage, raw: true
        })
    else
        return models.san_pham.findAll({ offset: page * itemPerPage, limit: itemPerPage, raw: true })
}