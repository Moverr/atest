'use strict';
const express = require("express");
const auth = require("./auth.routes");
const categories = require("./categories.routes");
const candidates = require("./candidates.routes");
const dashboard = require("./dashboard.routes");
const audits = require("./audit.routes");
const vote = require("./vote.routes");
const polling = require("./polling.routes");
const router = express.Router();

router.use('/auth', auth);
router.use('/categories', categories);
router.use('/candidates', candidates);
router.use('/dashboard', dashboard);
router.use('/vote', vote);
router.use('/polling', polling);
router.use('/audits', audits);
module.exports = router;