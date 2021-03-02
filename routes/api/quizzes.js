'use strict';

const express = require('express');
const router = express.Router();
const quizzes = require('../../client/json/Quizzes');

router.get('/homepage', (req, res) => {
    res.json(quizzes);
});

router.post('/newQuiz', (req, res) => {
    if (req.body) {
        let newQuiz = req.body;
        newQuiz.creator = "AriG7";
        newQuiz.rating = 4.3;
        console.log("New quiz: ", newQuiz);
        if (newQuiz.type === "standard") {
            newQuiz.family = "-";
        }
        if (!newQuiz.category) {
            newQuiz.category = "-";
        }
        console.log(newQuiz);
        quizzes.push(newQuiz);
    }
})

router.get('/slide/:id', (req, res) => {
    const found = quizzes.some(quiz =>  (quiz.id === parseInt(req.params.id)));
    if (found) {
        res.json(quizzes.filter(quiz => (quiz.id === parseInt(req.params.id))));
    }
    else {
        res.json({ msg: "There is no quiz with the id: " + req.params.id});
    }
})

router.delete('/delete', (req, res) => {
    const found = quizzes.some(quiz => quiz.id === parseInt(req.body.id));

    if (found) {
        console.log("Deleted: ",quizzes.filter(quiz => quiz.id !== parseInt(req.body.id)));
    }
})

module.exports = router;