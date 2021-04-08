'use strict';

const express = require('express');
const router = express.Router();
const quizzesReal = require('../../client/json/Quizzes_save');
const quizzes = require('../../client/json/Quizzes');

//uuid - 36 char long
let generalChat = [];

for (let i = 0; i < quizzes.length; i++) {
    quizzesReal.quizzes.push(quizzes[i]);
}

router.get('/homepage', (req, res) => {
    res.json(quizzesReal.quizzes);
});

router.post('/newQuiz', (req, res) => {
    if (req.body) {
        let newQuiz = req.body;
        newQuiz.rating = 4.3;
        if (newQuiz.type === "standard") {
            newQuiz.family = "-";
        }
        if (!newQuiz.category) {
            newQuiz.category = "-";
        }
        quizzesReal.quizzes.push(newQuiz);
    }
})

router.get('/quiz/:id', (req, res) => {
    if (req.params.id === "1" || req.params.id === "2" || req.params.id === "3" || req.params.id === "4") {
        req.params.id = parseInt(req.params.id);
    }
    const found = quizzesReal.quizzes.some(quiz => (quiz.id === req.params.id));
    if (found) {
        for (let i = 0; i < quizzesReal.quizzes.length; i++) {
            if (quizzesReal.quizzes[i].id === req.params.id) {
                res.json(quizzesReal.quizzes[i]);
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
        const foundInit = quizzesReal.quizzes.some(quiz => (quiz.id === req.params.id));
        if (foundInit) {
            generalChat.push([req.params.id]);
        }
        else {
            res.json({ msg: "There is no quiz with the id: " + req.params.id});
        }
    }
})

router.get('/profile/:id', (req, res) => {
    res.json(quizzesReal.quizzes.filter(quiz => quiz.creatorId === req.params.id));
})

router.put('/update', (req, res) => {
    const found = quizzesReal.quizzes.some(quiz => quiz.id === req.body.id);

    if (found) {
        for (let i = 0; i < quizzesReal.quizzes.length; i++) {
            if (quizzesReal.quizzes[i].id === req.body.id) {
                quizzesReal.quizzes[i] = req.body.quiz;
                break;
            }
        }
    }
    else {
        res.json({ msg: "There is no quiz with the id: " + req.body.id});
    }
})

router.delete('/delete', (req, res) => {
    const found = quizzesReal.quizzes.some(quiz => quiz.id === parseInt(req.body.id));

    if (found) {
        console.log("Deleted: ",quizzesReal.quizzes.filter(quiz => quiz.id !== parseInt(req.body.id)));
    }
})

module.exports = router;