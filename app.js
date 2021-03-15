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
app.use('/api/profiles', require('./routes/api/profiles'));

const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});

const quizzes = require('./client/json/Quizzes_save.json').quizzes;

io.on('connection', (socket) => {
    //console.log("New client connected");
    socket.on('disconnect', () => {
        //console.log('Client disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

module.exports = server;