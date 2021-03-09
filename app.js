'use strict';

const express = require('express');
const http = require('http');
const app = express();
let cors = require('cors');

app.use(require('morgan')('combined'));
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

app.use('/api/quizzes', require('./routes/api/quizzes'));

const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});

const quizzes = require('./client/json/Quizzes.js');

let interval;

io.on('connection', (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 10000);
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});

const getApiAndEmit = socket => {
    const response = new Date();
    socket.emit("FromAPI", response);
}

module.exports = server;