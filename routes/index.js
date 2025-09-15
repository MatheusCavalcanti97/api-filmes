const express = require('express');
const filmesRouter = require('./filmes');

const router = express.Router();

router.use('/filmes', filmesRouter);

module.exports = router;