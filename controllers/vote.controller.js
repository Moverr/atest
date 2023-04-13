'use strict';
const models = require('../models')
// MODELS
const Candidate = models.Candidate
const Category = models.Category
const Vote = models.Vote
const Audit = models.Audit
const Sequelize = require('sequelize');
const { Op } = require('sequelize');



const Index = async (req, res)=>{
 const page = parseInt(req.query.page) || 1; // current page number
    const limit = parseInt(req.query.limit) || 10; // number of items per page
    const offset = (page - 1) * limit; // offset of the first item to return

const categoriesWithCandidates = await Category.findAll({
  include: {
    model: Candidate,
    as: 'candidates',
    required: true
  },
 limit,
 offset
});
return res.status(200).send(categoriesWithCandidates)
}

const userVotes = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // current page number
    const limit = parseInt(req.query.limit) || 10; // number of items per page
    const offset = (page - 1) * limit; // offset of the first item to return
 const votes = await Vote.findAndCountAll({
  limit,
  offset,
  include: [
    {
      model: Category,
    },
    {
      model: Candidate,
    },
  ],
  order: [['id', 'DESC']],
});
    const totalPages = Math.ceil(votes.count / limit); // total number of pages
    return res.status(200).send({
        data: votes.rows,
        page,
        limit,
        totalPages,
        totalCount: votes.count,
    });
}
const Show = (req, res) => {

}
const Store = async(req, res) => {
const {candidateId,categoryId} = req.body
  const userId = req.user.id
  const user = req.user
   const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  const vote = await Vote.findOne({
    where: {
      userId: userId,
      categoryId: categoryId,
      createdAt: {
        [Op.between]: [startOfDay, endOfDay],
      },
    },
  });
  if (vote) {return res.status(200).send({'voted':"User already voted today try again tomorrow"});}
await Vote.create({candidateId,categoryId,userId})
  const action = `User ${user.fullName} has voted`
    await Audit.create({ action, userId })
 return res.status(200).send({msg:'Vote successfull'});

}

const VotedVoted = async(req, res) => {
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  const userId = req.user.id;
  const categoryId = req.body.categoryId;

  const vote = await Vote.findOne({
    where: {
      userId: userId,
      categoryId: categoryId,
      createdAt: {
        [Op.between]: [startOfDay, endOfDay],
      },
    },
  });

  if (vote) {
    return res.status(200).send({'voted':true});
  } else {
    return res.status(200).send({ 'voted': false });
  }

}

const candidateVotes = async (req, res) => {
  const categoryId = req.body.categoryId;
 const candidates = await Candidate.findAll({
  where: { 
    categoryId: categoryId 
  },
  attributes: [
    [Sequelize.literal('CONCAT(firstName, " ", lastName)'), 'name'],
    [Sequelize.fn('COUNT', Sequelize.col('votes.id')), 'votes']
  ],
  include: [
    {
      model: Category,
      where: {
        deletedAt: null // filter out categories that have been soft-deleted
      }
    },
    {
      model: Vote,
      attributes: []
    }
  ],
  group: ['Candidate.id']
});

    return res.status(200).send(candidates);
};
module.exports = {
    Index,
    userVotes,
    Show,
  VotedVoted,
    Store,
  candidateVotes
}