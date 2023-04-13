'use strict';
const voteController = require('../controllers/vote.controller')
const aAuth = require('../middleware/aAuth.middleware')
const express = require('express')
const router = express.Router()

//Vote ROUTES
router.get('/', voteController.Index)
router.post('/candidatesvotes',aAuth.checkAuth, voteController.candidateVotes)
router.post('/savevote', aAuth.checkAuth, voteController.Store)
router.post('/checkuservoting', aAuth.checkAuth, voteController.VotedVoted)


module.exports = router