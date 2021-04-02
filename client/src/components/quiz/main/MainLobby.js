import "./mainlobby.css";
import SlideScript from "../SlideScript";
import LobbyGridElement from "./LobbyGridElement";
import GeneralChat from "../GeneralChat";
import { useState, useEffect } from "react";
import GetVideoRoomComponent from "./GetVideoRoomComponent";

const MainLobby = ({ quiz, nextMessage, id, socket }) => {

    const [ chat, setChat ] = useState([]);
    const [ slideOpen, setSlideOpen] = useState(false);
    const [ lobbyState, setLobbyState ] = useState({ type: "main" });
    const [ lobbyData, setLobbyData ] = useState(lobbyDataInit());

    useEffect(() => {
        if (nextMessage) {
            let temp = chat;
            temp.push(nextMessage);
            setChat(temp);
        }        
    }, [nextMessage]);

    function lobbyDataInit() {
        let lobbyCount = [];
        for (let i = 1; i <= quiz.numberOfTeams; i++) {
            lobbyCount.push({index: i, name: `Team Lobby ${i}` });
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
                                    <SlideScript quiz={ quiz }/>
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
                    <GetVideoRoomComponent lobbyState = { lobbyState } setLobbyState = { setLobbyState } quiz = { quiz } />
                </div> }
                <div className="main-chat">
                    <GeneralChat chat={ chat } socket = { socket } />
                </div>
            </div>
     );
}
 
export default MainLobby;