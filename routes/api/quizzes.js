'use strict';

const express = require('express');
const router = express.Router();
const quizzes = require('../../client/json/Quizzes');

router.get('/homepage', (req, res) => {
    res.json(quizzes);
});

module.exports = router;