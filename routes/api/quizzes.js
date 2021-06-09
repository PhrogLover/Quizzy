'use strict';

const express = require('express');
const router = express.Router();
const quizzes = require('../../client/json/Quizzes').quizzes;

router.get('/homepage', (req, res) => {
    res.json(quizzes.filter(quiz => (quiz.deployIds && quiz.deployIds.length > 0)));
});

router.post('/newQuiz', (req, res) => {
    if (req.body) {
        let newQuiz = req.body;
        newQuiz.rating = null;
        if (newQuiz.type === "standard") {
            newQuiz.family = "-";
        }
        if (!newQuiz.category) {
            newQuiz.category = "-";
        }
        quizzes.push(newQuiz);
    }
})

router.get('/quiz/:id', (req, res) => {
    const found = quizzes.some(quiz => (quiz.id === req.params.id));
    if (found) {
        for (let i = 0; i < quizzes.length; i++) {
            if (quizzes[i].id === req.params.id) {
                res.json(quizzes[i]);
            }
        }
        
    }
    else {
        res.json({ msg: "There is no quiz with the id: " + req.params.id});
    }
})

router.get('/quiz/chat/:id', (req, res) => {
    const found = generalChat.some(chat => (chat[0] === req.params.id));
    if (found) {
        for (let i = 0; i < generalChat.length; i++) {
            if (generalChat[i][0] === req.params.id) {
                res.json(generalChat[i].filter(chat => typeof chat === "object"));
                break;
            }
        }
    }
    else {
        const foundInit = quizzes.some(quiz => (quiz.id === req.params.id));
        if (foundInit) {
            generalChat.push([req.params.id]);
        }
        else {
            res.json({ msg: "There is no quiz with the id: " + req.params.id});
        }
    }
})

router.get('/profile/:id', (req, res) => {
    res.json(quizzes.filter(quiz => quiz.creatorId === req.params.id));
})

router.put('/update', (req, res) => {
    const found = quizzes.some(quiz => quiz.id === req.body.id);

    if (found) {
        for (let i = 0; i < quizzes.length; i++) {
            if (quizzes[i].id === req.body.id) {
                quizzes[i] = req.body.quiz;
                break;
            }
        }
    }
    else {
        res.json({ msg: "There is no quiz with the id: " + req.body.id});
    }
})

router.delete('/delete', (req, res) => {
    const found = quizzes.some(quiz => quiz.id === parseInt(req.body.id));

    if (found) {
        console.log("Deleted: ",quizzes.filter(quiz => quiz.id !== parseInt(req.body.id)));
    }
})

module.exports = router;