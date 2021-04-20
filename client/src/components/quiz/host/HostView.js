import React, { useState, useEffect  } from 'react';
import "./hostview.css";
import { useHistory } from "react-router-dom"
import $ from "jquery";
import HostStream from './HostStream';
import AnswerJudge from '../host/AnswerJudge';

let keepAnswers = [];
let keepCorrAnswers = [];
let keepActiveLobbies = 0;

const HostView = ({ user, mainId, socket, quiz, round, teamList, setLeaderboard, lobbyData }) => {
    let history = useHistory();

    const [ lobbyState, setLobbyState ] = useState({ type: "main" });
    const [ activeLobbies, setActiveLobbies ] = useState(0);
    const [ pointsArray, setPointsArray ] = useState([]);
    const [ showLeaderboard, setShowLeaderboard ] = useState(false);
    const [ saveLeaderboard, setSaveLeaderboard ] = useState(false);
    const [ judgeDoneText, setJudgeDoneText ] = useState("");

    useEffect(() => {
        return () => {
            keepAnswers = [];
            keepCorrAnswers = [];
            keepActiveLobbies = 0;
        }
    }, [])

    useEffect(() => {
        socket.on("send sheet "+mainId, (sheet, lobbyId) => {
            let obj = {
                id: lobbyId,
                sheet: sheet
            }
            const found = keepAnswers.some(answer => answer.id === obj.id);
            if (!found) {
                console.log("NEW OBJ: ", obj)
                keepCorrAnswers.push({
                    id: lobbyId,
                    sheet: []
                });
                keepAnswers.push(obj);
                console.log(keepAnswers.length, keepActiveLobbies);
                if (keepAnswers.length === keepActiveLobbies && keepActiveLobbies !== 0) {
                    console.log("JUDGEMENT");
                    sendAnswerSheet();
                }
            }
        });
    }, [])

    useEffect(() => {
        const temp = lobbyData.filter(lobby => (lobby.players.length > 0));
        setActiveLobbies(temp.length);
    }, [lobbyData])

    useEffect(() => {
        keepActiveLobbies = activeLobbies;
    }, [activeLobbies])

    useEffect(() => {
        if (saveLeaderboard) {
            keepAnswers = [];
            keepCorrAnswers = [];
            console.log(pointsArray);
            let leaderboardData = $.extend(true, [], teamList);
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
            setLeaderboard(leaderboardData);
        }
    }, [saveLeaderboard])

    function closeQuiz() {
        quiz.deployIds = [];
        const body = {
            id: quiz.id,
            quiz: quiz
        }
        fetch('http://localhost:5000/api/quizzes/update', {
            method: 'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(body)
        }).then(socket.emit('lobby data delete', mainId))
        .then(history.push("/"));
    }

    function judgingDone(pointsArray) {
        setJudgeDoneText("Answer Judging Has Ended");
        setTimeout(() => {
            setJudgeDoneText("");
        }, 5000);
        setPointsArray(pointsArray);
        let newState = {
            type: "main"
        }
        setLobbyState(newState);
        console.log("dunzo");
        
        window.document.getElementById("main-host-slideview").className = "main-host-slideview";
    }

    function sendAnswerSheet() {
        const newState = {
            type: "judge"
        }
        setLobbyState(newState);
        window.document.getElementById("main-host-slideview").className = "main-host-slideview invisible";
    }

    return ( 
        <>
            <div className="main-body">
                <div className="host-header">
                    <div className="host-title">{ quiz.title }</div>
                </div>
                
                <div className="host-body">
                    <div className="host-left">
                        list of users divided into teams, dropdown button for team to see names, with report/kick button next to each.
                        { lobbyData.map((lobby, i) => (
                            <div key={i} className="lobby-search">
                                <div className="lobby-name">{ lobby.name }</div>
                                { lobby.players.map((player, j) => (
                                    <div key={j} className="player-search">
                                        { player.name }
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div> 
                    <div className="host-middle">
                        <div className="middle-wrapper">
                            <button className="close-quiz-button" type="button" onClick={closeQuiz}>End Quiz</button>

                            <div className="host-stream-wrapper">                                                                 
                                <HostStream setSaveLeaderboard = {setSaveLeaderboard} showLeaderboard = { showLeaderboard } setShowLeaderboard = { setShowLeaderboard } user = { user } teamList = { teamList } mainId = { mainId } socket = { socket } quiz={ quiz } sessionName={"MainQuiz"+mainId} />                        
                            </div>
                        </div>  
                        <div className="judge-section">                            
                            {  lobbyState.type === "judge" &&  
                                <div className="judge-section-container">             
                                    <AnswerJudge quiz = { quiz } setLobbyState = { judgingDone } round = { round } ans = { keepAnswers } correctAns = { keepCorrAnswers } />
                                </div>
                            }
                            { judgeDoneText && <div>{ judgeDoneText }</div> }                      
                        </div>
                        
                    </div>
                    <div className="host-right"></div> 
                </div>
            </div>
        </>
   );
}
 
export default HostView;
