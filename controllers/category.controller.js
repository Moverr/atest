'use strict';
const Joi = require('joi');
const models = require('../models')
// MODELS
const Category = models.Category
// CREATE USER
const Index = async(req, res) => {
    const category = await Category.findAll({});
 
    return res.status(200).send({
        data: category
    });
}

const Show = async(req, res) => {
    const id = req.params.id
    const category = await Category.findByPk(id);
    return res.status(200).send(category);
}

const Store = async(req,res) => {
    try {
        const schema = Joi.object({
            name: Joi.string().max(100).required(),
            description: Joi.string().required(),
            priority: Joi.required(),
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });
        const existingCategory = await Category.findOne({ where: { name: req.body.name } });
        if (existingCategory) return res.status(409).send({ message: `Category ${req.body.name} already exists` });

    const newCategory = await Category.create({
            name: req.body.name,
            description: req.body.description,
            priority: req.body.priority,
        });
        res.status(200).send({
            message: `Category ${req.body.name} created successfully`,
            Category: newCategory
        });
    } catch (error) {
        res.status(500).send({ message: 'Error creating Category', error });
    }
}

const Edit = async(req, res) => {
    const id = req.params.id
    try {
        const schema = Joi.object({
             id: Joi.number(),
            name: Joi.string().max(100).required(),
            description: Joi.string().required(),
            priority: Joi.required(),
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });
        const user = await Category.findByPk(id);
        if (!user) return res.status(404).send({ message: `Category with id ${id} not found` });
        const editedCategory = await Category.update({
            name: req.body.name,
            description: req.body.description,
            priority: req.body.priority,
        },{
            where: {
                id
            }});
        return res.status(200).send({
            message: `Category ${req.body.name} edited successfully`,
        });
    } catch (error) {
        res.status(500).send({ message: 'Error editing Category', error });
    }
}

const Destroy = async (req, res)=>{
    try {
        const id = req.params.id
        await Category.destroy({
            where: {
                id
            }
        });
        return res.status(200).send({ message: 'Category Deleted Successfully' });
    } catch (error) {
        return res.status(500).send({ message: 'Error deleting Category' });
    }
}

module.exports = {
    Index,
    Show,
    Edit,
    Store,
    Destroy
}