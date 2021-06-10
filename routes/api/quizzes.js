'use strict';

const express = require('express');
const router = express.Router();
const quizzes = require('../../client/json/Quizzes').quizzes;
const slides = require('../../client/json/Slides').slides;

router.get('/homepage', (req, res) => {
    res.json(quizzes.filter(quiz => (quiz.deployIds && quiz.deployIds.length > 0)));
});

router.post('/newQuiz', (req, res) => {
    if (req.body) {
        let newQuiz = req.body.quiz;
        let newSlides = req.body.slides;
        newQuiz.rating = null;
        if (newQuiz.type === "standard") {
            newQuiz.family = "-";
        }
        if (!newQuiz.category) {
            newQuiz.category = "-";
        }
        quizzes.push(newQuiz);
        slides.push(newSlides);
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

router.get('/quiz/full/:id', (req, res) => {
    const foundSlide = slides.some(slide => (slide[0].quizId === req.params.id));
    const foundQuiz = quizzes.some(quiz => (quiz.id === req.params.id));

    if (foundSlide && foundQuiz) {
        let quiz;
        for (let i = 0; i < quizzes.length; i++) {
            if (quizzes[i].id === req.params.id) {
                quiz = quizzes[i];
            }
        }
        for (let i = 0; i < slides.length; i++) {
            if (slides[i][0].quizId === req.params.id) {
                quiz.slides = slides[i];
                res.json(quiz);
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