import React, { useState, useEffect  } from 'react';
import "./hostview.css";
import $ from "jquery";
import HostStream from './HostStream';
import AnswerJudge from '../host/AnswerJudge';
import Leaderboard from '../../basic/Leaderboard';

let keepAnswers = [];

const HostView = ({ user, mainId, socket, quiz }) => {

    const [ lobbyState, setLobbyState ] = useState({ type: "main" });
    const [ lobbyData, setLobbyData ] = useState([]);
    const [ leaderboard, setLeaderboard ] = useState(leaderboardInit());
    const [ answers, setAnswers ] = useState([]);
    const [ correctAnswers, setCorrectAnswers ] = useState([]);
    const [ round, setRound ] = useState(1);

    useEffect(() => {
        socket.on('lobby data change '+mainId, (newLobbyData) => {
            setLobbyData(newLobbyData);
            setLeaderboard(leaderboardUpdate(newLobbyData));
        });
        socket.on("send sheet "+mainId, (sheet, lobbyId) => {
            let obj = {
                id: lobbyId,
                sheet: sheet
            }
            const found = keepAnswers.some(answer => answer.id === obj.id);
            const postFound = answers.some(answer => answer.id === obj.id);
            if (!found || (!postFound && keepAnswers === [])) {
                console.log("NEW OBJ: ", obj)
                keepAnswers.push(obj);
                setAnswers((prevState) => ([...prevState, obj]));
                setCorrectAnswers((prevState) => ([...prevState, {
                    id: lobbyId,
                    sheet: []
                }]));
            }
        });
    }, [])

    useEffect(() => {
        const activeLobbies = lobbyData.filter(lobby => (lobby.players.length > 0));
        if (answers.length === activeLobbies.length && activeLobbies.length !== 0) {
            sendAnswerSheet();
        }
    }, [answers])

    useEffect(() => {
        socket.emit('lobby data call',mainId);
    }, [])

    useEffect(() => {
        if (lobbyState === "judge") {
            keepAnswers = [];
        }
    }, [lobbyState])

    function judgingDone(pointsArray) {
        console.log(pointsArray);
        let leaderboardData = $.extend(true, [], leaderboard);
        pointsArray.map((team) => {
            for (let i = 0; i < leaderboardData.length; i++) {
                if (leaderboardData[i][0].id === team.id) {
                    leaderboardData[i][round] = {
                        id: team.id,
                        points: team.points
                    }
                    break;
                }
            }
        });
        console.log(leaderboardData);
        let newState = {
            type: "leaderboard"
        }
        if (quiz.showAns) newState.type = "main";
        setLeaderboard(leaderboardData);
        setLobbyState(newState);
        console.log("dunzo");
    }

    function leaderboardInit() {
        let leaderboardArr = [];
        for (let i = 0; i < quiz.numberOfTeams; i++) {
            let tempArr = []
            for (let j = 0; j <= quiz.numberOfRounds; j++) {
                tempArr.push([]);
            }
            leaderboardArr.push(tempArr);
        }
        return leaderboardArr;
    }

    function leaderboardUpdate(lobbyData) {
        let leaderboardArr = $.extend(true, [], leaderboard);
        for (let i = 0; i < leaderboardArr.length; i++) {
            leaderboardArr[i][0] = {
                id: lobbyData[i].id,
                name: lobbyData[i].name,
                players: lobbyData[i].players
            }
        }
        return leaderboardArr;
    }

    function sendAnswerSheet() {
        const newState = {
            type: "judge"
        }
        setLobbyState(newState);
    }

    return ( 
        <>
            <div className="main-body">
                <div className="main-header">
                    <div className="quiz-title">{ quiz.title } by <i> { quiz.creator } </i></div>
                    <div className="instructions">
                        if Host: make sure that the players in your lobby are happy, minimaze foul activity, cheating, profanity as much as possible. At the bottom you have blah blah...
                        if Player: respect other players, don't take away the fun fron the experience by cheating, have fun. At the bottom you can choose your blah blah...
                    </div>
                </div>
                { lobbyState.type === "main" &&
                    <div className="lobby-body">                      
                        <div className="slide-page">
                            <div className="slide-window">
                                <HostStream mainId = { mainId } socket = { socket } quiz={ quiz } sessionName={"MainQuiz"+mainId} />
                            </div>
                        </div>
                    </div>
                }
                {  lobbyState.type === "judge" &&
                    <AnswerJudge quiz = { quiz } setLobbyState = { judgingDone } round = { round } answers = { answers } correctAnswers = { correctAnswers } setCorrectAnswers = { setCorrectAnswers } />
                }
                {  lobbyState.type === "leaderboard" &&
                    <Leaderboard user = { user } teamList = { leaderboard } />
                }
            </div>
        </>
   );
}
 
export default HostView;
