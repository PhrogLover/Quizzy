'use strict';

const express = require('express');
const app = express();
let cors = require('cors');

app.use(express.json());
app.use(require('morgan')('combined'));
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

app.use('/api/quizzes', require('./routes/api/quizzes'));

const quizzes = require('./client/json/Quizzes.js');

module.exports = app;