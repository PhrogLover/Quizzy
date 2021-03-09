'use strict';

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
let cors = require('cors');

app.use(require('morgan')('combined'));
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

app.use('/api/quizzes', require('./routes/api/quizzes'));

const server = http.createServer(app);
const io = socketIo(server);

const quizzes = require('./client/json/Quizzes.js');

const getApiAndEmit = socket => {
    const response = new Date();
    socket.emit("FromAPI", response);
}

let interval;

io.on('connection', (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 100000);
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});

module.exports = server;