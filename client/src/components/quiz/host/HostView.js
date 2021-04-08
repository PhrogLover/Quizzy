import React, { useState, useEffect  } from 'react';
import "./hostview.css";
import HostStream from './HostStream';
import AnswerJudge from '../host/AnswerJudge';

const HostView = ({ user, mainId, socket, quiz }) => {

    const [ lobbyState, setLobbyState ] = useState({ type: "main" });
    const [ round, setRound ] = useState(1);

    function judgingDone() {
        const newState = {
            type: "leaderboard"
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
                                <HostStream id = { mainId } socket = { socket } quiz={ quiz } sessionName={"MainQuiz"+mainId} />
                            </div>
                        </div>
                    </div>
                 }
                 { lobbyState.type === "judge" &&
                    <AnswerJudge quiz = { quiz } socket = { socket } setLobbyState = { judgingDone } mainId = { mainId } round = { round } />
                }
            </div>
        </>
   );
}
 
export default HostView;
