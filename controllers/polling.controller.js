'use strict';
const models = require('../models')
// MODELS
const Candidate = models.Candidate
const Category = models.Category

const Index = async (req, res)=>{
     const id = req.params.positionId
const category = await Category.findByPk(id, {
  include: {
    model: Candidate,
    as: 'candidates',
    required: true
  }
});
return res.status(200).send(category)
}
module.exports = {
    Index
}