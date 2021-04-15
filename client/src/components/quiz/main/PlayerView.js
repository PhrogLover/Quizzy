import "./playerview.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import $ from "jquery";

import TeamLobby from "../team/TeamLobby";

const PlayerView = ({ user, quiz, mainId, socket, round }) => {
    let history = useHistory();

    const [ lobbyState, setLobbyState ] = useState({ type: "main" });
    const [ lobbyData, setLobbyData ] = useState([]);

    useEffect(() => {
        socket.on("lobby data change "+mainId, (newLobbyData) => {
            setLobbyData(newLobbyData);
        })
        socket.on("end lobby "+mainId, () => {
            history.push("/");
        })
    }, [])

    useEffect(() => {
        socket.emit('lobby data call', mainId);
    }, [])

    function makeGrid(){
        console.log(lobbyData);
        let numOfCols = Math.floor(Math.sqrt(lobbyData.length));
        // console.log(numOfCols);
        let gridStyle="";
        for (let i = 0; i < numOfCols; i++) {
            gridStyle = gridStyle + " auto";
        }
        // console.log(gridStyle);
        return {gridTemplateColumns: gridStyle};
    }

    function teamLobbyHandler(id, name, player, playerId) {
        const newState = {
            type: "team",
            id: id,
            name: name
        }
        let newLobbyData = $.extend(true, [], lobbyData);
        for (let i = 0; i < newLobbyData.length; i++) {
            if (newLobbyData[i].id === id) {
                newLobbyData[i].players.push({
                    id: playerId,
                    name: player
                });
                break;
            }
        }
        setLobbyState(newState);
        socket.emit("lobby data change", mainId, newLobbyData);
    }

    return ( 
        <>
            { lobbyState.type === "main" &&
                <div className="main-body">
                    <div className="main-header">
                        <div className="quiz-title">{ quiz.title } by <i> { quiz.creator } </i></div>
                        <div className="instructions">
                            if Host: make sure that the players in your lobby are happy, minimaze foul activity, cheating, profanity as much as possible. At the bottom you have blah blah...
                            if Player: respect other players, don't take away the fun fron the experience by cheating, have fun. At the bottom you can choose your blah blah...
                        </div>
                    </div>
                    <div className="lobby-body">
                        <div className="lobby-grid" style = {makeGrid()}>
                            { lobbyData.map((lobby, i) => (
                                <div key={i} className="lobby-grid-element" onClick={(e) => (teamLobbyHandler(lobby.id, lobby.name, user.name, user.id))}>
                                    <div className="lobby-grid-index">{ lobby.index }</div>            
                                    <div className="team-name">{ lobby.name }</div>
                                    <div className="players-in-lobby">{ lobby.players.length }/{ quiz.numberOfPlayers }</div>
                                    <div className="players-list"> 
                                        <div className="players-header"> Players:</div>
                                        <div className="players-names">
                                            { lobby.players.map(player => (
                                                <div className="player">
                                                    { player.name }
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> }
            { lobbyState.type === "team" && 
                <div className="main-body">
                    <TeamLobby user = { user } sessionName = { "TeamLobby"+lobbyState.id } mainId = { mainId } socket = { socket } transmitSessionName={"MainQuiz"+mainId} lobbyState = { lobbyState } lobbyData = { lobbyData } setLobbyState = { setLobbyState } quiz = { quiz } />
                </div> }
        </>
     );
}
 
export default PlayerView;