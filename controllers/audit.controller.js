'use strict';
const models = require('../models')
// MODELS
const Audit = models.Audit
// CREATE USER
const Index = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // current page number
    const limit = parseInt(req.query.limit) || 100; // number of items per page
    const offset = (page - 1) * limit; // offset of the first item to return

    const audit = await Audit.findAndCountAll({
        limit,
        offset,
        order: [['id', 'DESC']]
    });

    const totalPages = Math.ceil(audit.count / limit); // total number of pages
    return res.status(200).send({
        data: audit.rows,
        page,
        limit,
        totalPages,
        totalCount: audit.count,
    });
}
module.exports = {
    Index,
}