import React, { useState, useEffect  } from 'react';
import "./hostview.css";
import $ from "jquery";
import HostStream from './HostStream';
import AnswerJudge from '../host/AnswerJudge';
import Leaderboard from '../../basic/Leaderboard';

let keepAnswers = [];

const HostView = ({ user, mainId, socket, quiz, round }) => {

    const [ lobbyState, setLobbyState ] = useState({ type: "main" });
    const [ lobbyData, setLobbyData ] = useState([]);
    const [ leaderboard, setLeaderboard ] = useState(leaderboardInit());
    const [ answers, setAnswers ] = useState([]);
    const [ correctAnswers, setCorrectAnswers ] = useState([]);

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
        window.document.getElementById("main-host-slideview").className = "main-host-slideview";
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
                    </div> 
                    <div className="host-middle">                                                                          
                        <HostStream mainId = { mainId } socket = { socket } quiz={ quiz } sessionName={"MainQuiz"+mainId} />                        
                        <div className="spare-space">
                        {  lobbyState.type === "judge" &&               
                            <AnswerJudge quiz = { quiz } setLobbyState = { judgingDone } round = { round } answers = { answers } correctAnswers = { correctAnswers } setCorrectAnswers = { setCorrectAnswers } />
                        }
                        </div>
                        
                    </div>
                    <div className="host-right">
                    {  lobbyState.type === "leaderboard" &&
                        <Leaderboard user = { user } teamList = { leaderboard } />
                    }
                        maybe put miscellaous (?) stuff here, which host will not use often since the lobby chat will be open 95% of the time this area is just for extra space.
                    </div> 
                </div>
            </div>
        </>
   );
}
 
export default HostView;
