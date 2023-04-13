'use strict';
const Joi = require('joi');
const models = require('../models')
// MODELS
const Candidate = models.Candidate
const Category = models.Category
// CREATE CANDIDATE
const Index = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // current page number
    const limit = parseInt(req.query.limit) || 10; // number of items per page
    const offset = (page - 1) * limit; // offset of the first item to return
const candidate = await Candidate.findAndCountAll({
  limit,
  offset,
  include: {
    model: Category,
    paranoid: false, // disable paranoid mode to retrieve soft-deleted categories
    where: {
      deletedAt: null // filter out categories that have not been soft-deleted
    }
  },
  order: [['id', 'DESC']]
});


    const totalPages = Math.ceil(candidate.count / limit); // total number of pages
    return res.status(200).send({
        data: candidate.rows,
        page,
        limit,
        totalPages,
        totalCount: candidate.count,
    });
}

const Show = async (req, res) => {
    const id = req.params.id
    const candidate = await Candidate.findByPk(id);
    return res.status(200).send(candidate);
}
const Store = async (req, res) => {
    try {
        const schema = Joi.object({
            firstName: Joi.string().max(100).required(),
            lastName: Joi.string().required(),
            categoryId: Joi.required(),
        });
        const { firstName, lastName, categoryId } = req.body
        const photo = req.file.filename ? req.file.filename :'default.png'
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });
        const existingCandidate = await Candidate.findOne({ where: { firstName, lastName, categoryId } });
        if (existingCandidate) return res.status(409).send({ message: `Candidate ${firstName} ${lastName} already exists` });

        const newCandidate = await Candidate.create({
            firstName,
            lastName,
            photo,
            categoryId,
        });
        res.status(200).send({
            message: `Candidate ${firstName} ${lastName}  created successfully`,
            candidate: newCandidate
        });
    } catch (error) {
        res.status(500).send({ message: 'Error creating Candidate', error });
    }
}

const Edit = async (req, res) => {
    const id = req.params.id
    try {
        const schema = Joi.object({
            firstName: Joi.string().max(100).required(),
            lastName: Joi.string().required(),
            photo: Joi.required(),
            categoryId: Joi.required(),
        });
        const { error } = schema.validate(req.body);

        if (error) return res.status(400).send({ message: error.details[0].message });
        const { firstName, lastName, photo, categoryId } = req.body
        const user = await Candidate.findByPk(id);
        if (!user) return res.status(404).send({ message: `Candidate with id ${id} not found` });
        await Candidate.update({
            firstName,
            lastName,
            photo,
            categoryId,
        }, {
            where: {
                id
            }
        });
        return res.status(200).send({
            message: `Candidate ${firstName} ${lastName} edited successfully`,
        });
    } catch (error) {
        res.status(500).send({ message: 'Error editing Candidate', error });
    }
}

const Destroy = async (req, res) => {
    try {
        const id = req.params.id
        await Candidate.destroy({
            where: {
                id
            }
        });
        return res.status(200).send({ message: 'Candidate Deleted Successfully' });
    } catch (error) {
        return res.status(500).send({ message: 'Error deleting Candidate' });
    }


}

module.exports = {
    Index,
    Show,
    Edit,
    Store,
    Destroy
}