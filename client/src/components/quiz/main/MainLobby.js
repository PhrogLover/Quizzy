import "./mainlobby.css";
import LobbyGridElement from "./LobbyGridElement";
import GeneralChat from "../GeneralChat";
import { useState, useEffect } from "react";
import VideoRoomComponent from "../team/VideoRoomComponent";
import HostStream from "../host/HostStream";
import getUniqueId from "../../../scripts/GetUniqueId"

const MainLobby = ({ quiz, nextMessage, id, socket }) => {

    const [ slideOpen, setSlideOpen] = useState(false);
    const [ lobbyState, setLobbyState ] = useState({ type: "main" });
    const [ lobbyData, setLobbyData ] = useState(lobbyDataInit());
    const chatSize = quiz.numberOfTeams * quiz.numberOfPlayers;

    // let randomTeamNumber = Math.floor(Math.random()*23 +2);

    function lobbyDataInit() {
        let lobbyCount = [];
        for (let i = 1; i <= quiz.numberOfTeams; i++) {
            lobbyCount.push({id: getUniqueId(), index: i, name: `Team Lobby ${i}` });
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

            <div className="main-lobby">
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
                        {!slideOpen && 
                            <div className="open-slides-button" onClick={() => setSlideOpen(true)}>
                                <i className="fas fa-desktop"/>
                            </div>
                        }
                        { slideOpen &&                        
                            <div className="slide-page">
                                <div className="open-slides-button" onClick={() => setSlideOpen(false)}>
                                    <i className="fas fa-table"/>
                                </div>
                                <div className="slide-window">
                                    <HostStream mainId = { id } socket = { socket } quiz={ quiz } sessionName={"MainQuiz"+id}/>
                                </div>
                            </div>
                        }
                        <div className="lobby-grid" style = {makeGrid()}>
                            { lobbyData.map((lobby, i) => (
                                <LobbyGridElement key={ i } quiz={ quiz } lobby={ lobby } teamLobbyHandler = { teamLobbyHandler } />
                            ))}
                        </div>
                    </div>
                </div> }
                { lobbyState.type === "team" && 
                    <div className="main-body">
                        <VideoRoomComponent sessionName = { "TeamLobby"+lobbyState.id } mainId = { id } socket = { socket } transmitSessionName={"MainQuiz"+id} lobbyState = { lobbyState } setLobbyState = { setLobbyState } quiz = { quiz } />
                    </div> }
                <div className="main-chat">
                    <GeneralChat mainId = { id } chatSize={ chatSize } socket = { socket } />
                </div>
            </div>
     );
}
 
export default MainLobby;