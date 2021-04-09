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

let lobbyData = [];
let temp = {"ee62889a-7a84-4d30-b2b6-81d524bb6597": [
    {id: "8673b838-6f16-4580-acc8-b6809df74c3a", index: 1, players: Array(0), name: "Team Lobby 1"},
    {id: "9d53382b-eacb-4839-b490-2c6a8b370d0a", index: 2, players: Array(0), name: "Team Lobby 2"},
    {id: "e7dd8b05-afde-49e6-9c77-18bb2f966c0b", index: 3, players: Array(0), name: "Team Lobby 3"},
    {id: "0619b943-e5a6-409e-8518-319cd7b2eae4", index: 4, players: Array(0), name: "Team Lobby 4"},
    {id: "d9825c91-0d01-48d7-98ab-662e0d1735e2", index: 5, players: Array(0), name: "Team Lobby 5"},
    {id: "12fea2d7-5252-4b50-a23b-c2af66d0f790", index: 6, players: Array(0), name: "Team Lobby 6"},
    {id: "26d42730-ea72-41ba-ae5d-017043374dce", index: 7, players: Array(0), name: "Team Lobby 7"},
    {id: "0152ef37-db75-4c8b-af67-c79661e16efa", index: 8, players: Array(0), name: "Team Lobby 8"},
    {id: "34b2fd24-f99c-4764-a1f7-0f7b2445c889", index: 9, players: Array(0), name: "Team Lobby 9"},
    {id: "71dd8dd6-47c8-4561-b866-70651edb61ee", index: 10, players: Array(0), name: "Team Lobby 10"},
    {id: "403195eb-c38a-44cf-8de3-1b4512547867", index: 11, players: Array(0), name: "Team Lobby 11"},
    {id: "5c8b9368-5503-4c1c-96d2-2277ffaeae01", index: 12, players: Array(0), name: "Team Lobby 12"},
    {id: "3e7782ad-49e7-4ff3-82e9-c45b187c84eb", index: 13, players: Array(0), name: "Team Lobby 13"},
    {id: "435dfeb2-babb-4fd3-9eaf-71b71be3fe5e", index: 14, players: Array(0), name: "Team Lobby 14"},
    {id: "52e2d16b-6e58-4082-afe9-96e0f30922df", index: 15, players: Array(0), name: "Team Lobby 15"},
    {id: "2c8ee77c-a93a-476c-a53d-7a330a78ea2a", index: 16, players: Array(0), name: "Team Lobby 16"},
    {id: "fb222518-b43a-43d4-8115-e4b0fc59e529", index: 17, players: Array(0), name: "Team Lobby 17"},
    {id: "80627033-e191-42da-9f32-6c2d29b2b767", index: 18, players: Array(0), name: "Team Lobby 18"},
    {id: "c52f11dd-b1e8-44d3-bf98-420f97a4c344", index: 19, players: Array(0), name: "Team Lobby 19"},
    {id: "54d4ac11-badb-438d-86fd-a98fa3753ea8", index: 20, players: Array(0), name: "Team Lobby 20"},
    {id: "6494761b-4471-4e5a-81a1-b4dbb3c3bd32", index: 21, players: Array(0), name: "Team Lobby 21"},
    {id: "26233a9d-2900-4b19-b069-6922b3907256", index: 22, players: Array(0), name: "Team Lobby 22"},
    {id: "80fda64e-fe57-4fc9-80f3-95706e3ef1e0", index: 23, players: Array(0), name: "Team Lobby 23"},
    {id: "a573a122-9165-4293-b86d-02f7ed280981", index: 24, players: Array(0), name: "Team Lobby 24"},
    {id: "91b2b002-af54-4255-9765-c799fe0247fa", index: 25, players: Array(0), name: "Team Lobby 25"}
]}
lobbyData.push(temp);

io.on('connection', (socket) => {
    //console.log("New client connected");
    socket.on('disconnect', () => {
        //console.log('Client disconnected');
    });
    socket.on('chat message', (msg, id) => {
        io.emit('chat message '+id, msg);
    });
    socket.on('lobby data create', (id, data) => {
        let newQuizLobbyData = {};
        newQuizLobbyData[id] = data;
        const found = lobbydata.some(lobby => (lobby === newQuizLobbyData));
        if (found) {
            for (let i = 0; i < lobbyData.length; i++) {
                if (lobbyData[i][id]) {
                    lobbyData[i] = newQuizLobbyData;
                    break;
                }
            }
        }
        else {
            lobbydata.push(newQuizLobbyData);
        }
    })
    socket.on('lobby data delete', (id) => {
        const found = lobbydata.some(lobby => (lobby[id]));
        if (found) {
            lobbydata = lobbydata.filter(lobby => (!lobby[id]));
        }
    })
    socket.on('lobby data change', (id, data) => {
        let newQuizLobbyData = {};
        newQuizLobbyData[id] = data;
        for (let i = 0; i < lobbyData.length; i++) {
            if (lobbyData[i][id]) {
                lobbyData[i] = newQuizLobbyData;
                break;
            }
        }
        io.emit('lobby data change '+id, data);
    })
    socket.on('lobby data call', (id) => {
        let temp = lobbyData.filter(lobby => (lobby[id]))
        io.emit('lobby data change '+id, temp[0][id]);
    })
    socket.on('update sheet', (sheet, id) => {
        io.emit('update sheet '+id, sheet);
    });
    socket.on('send sheet', (sheet, lobbyId, mainId) => {
        io.emit('send sheet '+mainId, sheet, lobbyId);
    });
    socket.on('slide data', (data, id) => {
        io.emit('slide data '+id, data);
    });
    socket.on('ping host', (id) => {
        io.emit('ping host '+id);
    });
    socket.on('team lobby start', (sessionId, id, window) => {
        createSession(sessionId, window).then((sessionId) => createToken(sessionId))
        .then((token) => {
            io.emit('team lobby get token '+id, token);
        })        
    });
});

function createSession(sessionId, window) {
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
                    //console.log(error);
                    console.warn(
                        'No connection to OpenVidu Server. This may be a certificate error at ' + OPENVIDU_SERVER_URL,
                    );
                    if (
                        window.confirm(
                            'No connection to OpenVidu Server. This may be a certificate error at "' +
                                OPENVIDU_SERVER_URL +
                                '"\n\nClick OK to navigate and accept it. ' +
                                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                this.OPENVIDU_SERVER_URL +
                                '"',
                        )
                    ) {
                        window.assign(this.OPENVIDU_SERVER_URL + '/accept-certificate');
                    }
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