import "./playerview.css";
import { useState, useEffect } from "react";

import TeamLobby from "../team/TeamLobby";

const PlayerView = ({ user, quiz, mainId, socket }) => {

    const [ lobbyState, setLobbyState ] = useState({ type: "main" });
    const [ lobbyData, setLobbyData ] = useState(lobbyDataInit());

    function lobbyDataInit() {
        let lobbyCount = [];
        for (let i = 1; i <= quiz.numberOfTeams; i++) {
            lobbyCount.push({id: quiz.deployIds[i-1], index: i, name: `Team Lobby ${i}` });
        }
        return lobbyCount;
    }

    function makeGrid(){
        let numOfCols = Math.floor(Math.sqrt(lobbyData.length));
        // console.log(numOfCols);
        let gridStyle="";
        for (let i = 0; i < numOfCols; i++) {
            gridStyle = gridStyle + " auto";
        }
        // console.log(gridStyle);
        return {gridTemplateColumns: gridStyle};
    }

    function teamLobbyHandler(id, name) {
        const newState = {
            type: "team",
            id: id,
            name: name
        }
        setLobbyState(newState);
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
                                <div key={i} className="lobby-grid-element" onClick={(e) => (teamLobbyHandler(lobby.id, lobby.name))}>
                                    <div className="lobby-grid-index">{ lobby.index }</div>            
                                    <div className="team-name">{ lobby.name }</div>
                                    <div className="players-in-lobby">0/{ quiz.numberOfPlayers }</div>
                                    <div className="players-list"> 
                                        <div className="players-header"> Players:</div>
                                        <div className="players-names">
                                            {/* insert player /list here with the map function */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> }
            { lobbyState.type === "team" && 
                <div className="main-body">
                    <TeamLobby sessionName = { "TeamLobby"+lobbyState.id } mainId = { mainId } socket = { socket } transmitSessionName={"MainQuiz"+mainId} lobbyState = { lobbyState } setLobbyState = { setLobbyState } quiz = { quiz } />
                </div> }
        </>
     );
}
 
export default PlayerView;