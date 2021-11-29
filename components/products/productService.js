const {models} = require('../../models');


exports.list = (page = 0, itemPerPage = 9) => {
    console.log('page', page);
    return models.san_pham.findAll({ offset: page*itemPerPage, limit: itemPerPage, raw: true})
}