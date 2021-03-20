'use strict';

const express = require('express');
const http = require('http');
const app = express();
const axios = require('axios');
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
const OPENVIDU_SERVER_URL = 'https://localhost:4443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

io.on('connection', (socket) => {
    //console.log("New client connected");
    socket.on('disconnect', () => {
        //console.log('Client disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('team lobby start', (sessionId) => {
        createSession(sessionId).then((sessionId) => createToken(sessionId))
        .then((token) => {
            io.emit('team lobby get token', token);
        })        
    });
});

function createSession(sessionId) {
    return new Promise((resolve, reject) => {
        var data = JSON.stringify({ customSessionId: sessionId });
        axios
            .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
                headers: {
                    Authorization: 'Basic ' + Buffer.from('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET).toString('base64'),
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                //console.log('CREATE SESION', response);
                resolve(response.data.id);
            })
            .catch((response) => {
                var error = Object.assign({}, response);
                if (error.response && error.response.status === 409) {
                    resolve(sessionId);
                } else {
                    console.log(error);
                    // console.warn(
                    //     'No connection to OpenVidu Server. This may be a certificate error at ' + OPENVIDU_SERVER_URL,
                    // );
                    // if (
                    //     window.confirm(
                    //         'No connection to OpenVidu Server. This may be a certificate error at "' +
                    //             OPENVIDU_SERVER_URL +
                    //             '"\n\nClick OK to navigate and accept it. ' +
                    //             'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                    //             this.OPENVIDU_SERVER_URL +
                    //             '"',
                    //     )
                    // ) {
                    //     window.location.assign(this.OPENVIDU_SERVER_URL + '/accept-certificate');
                    // }
                }
            });
    });
}

function createToken(sessionId) {
    return new Promise((resolve, reject) => {
        var data = JSON.stringify({});
        axios
            .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', data, {
                headers: {
                    Authorization: 'Basic ' + Buffer.from('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET).toString('base64'),
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                //console.log('TOKEN', response);
                resolve(response.data.token);
            })
            .catch((error) => reject(error));
    });
}

module.exports = server;