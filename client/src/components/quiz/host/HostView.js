import React, { useState, useEffect  } from 'react';
import "./hostview.css";
import HostStream from './HostStream';
import AnswerJudge from '../host/AnswerJudge';

const HostView = ({ user, mainId, socket, quiz }) => {

    const [ lobbyState, setLobbyState ] = useState({ type: "main" });
    const [ lobbyData, setLobbyData ] = useState([]);
    const [ answers, setAnswers ] = useState([]);
    const [ correctAnswers, setCorrectAnswers ] = useState([]);
    const [ round, setRound ] = useState(1);

    useEffect(() => {
        socket.on('lobby data change '+mainId, (newLobbyData) => {
            setLobbyData(newLobbyData);
        });
        socket.on("send sheet "+mainId, (sheet, lobbyId) => {
            let obj = {
                id: lobbyId,
                sheet: sheet
            }
            console.log(obj, answers.some(answer => answer.sheet === obj.sheet));
            const found = answers.some(answer => answer.sheet === obj.sheet);
            if (!found) {
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

    function judgingDone() {
        const newState = {
            type: "leaderboard"
        }
        setLobbyState(newState);
    }

    function sendAnswerSheet() {
        console.log("TURNOVER")
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
            </div>
        </>
   );
}
 
export default HostView;
