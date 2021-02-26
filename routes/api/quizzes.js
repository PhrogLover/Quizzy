'use strict';

const express = require('express');
const router = express.Router();
const quizzes = require('../../client/json/Quizzes');
const uuid = require('uuid');

router.get('/homepage', (req, res) => {
    res.json(quizzes);
});

router.post('/newQuiz', (req, res) => {
    if (req.body) {
        let newQuiz = req.body;
        newQuiz.id = uuid.v4();
        newQuiz.creator = "AriG7";
        newQuiz.rating = 4.3;
        console.log("New quiz: ", newQuiz);
        quizzes.push(newQuiz);
    }
})

router.delete('/delete', (req, res) => {
    const found = quizzes.some(quiz => quiz.id === parseInt(req.body.id));

    if (found) {
        console.log("Deleted: ",quizzes.filter(quiz => quiz.id !== parseInt(req.body.id)));
    }
})

module.exports = router;