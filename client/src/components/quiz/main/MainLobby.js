import "./mainlobby.css";
import SlideScript from "../SlideScript";
import LobbyGridElement from "./LobbyGridElement";
import GeneralChat from "../GeneralChat";
import { useState, useEffect } from "react";

const MainLobby = ({ quiz, nextMessage, id, socket }) => {

    const [ chat, setChat ] = useState([]);

    useEffect(() => {
        if (nextMessage) {
            let temp = chat;
            temp.push(nextMessage);
            setChat(temp);
        }        
    }, [nextMessage]);

    let lobbyCount = [];
    for (let i = 0; i < 25; i++) {
        lobbyCount.push(i);
    }
    // for (let i = 0; i < 7; i++) {
    //     lobbyCount.push(i);
    // }

    function makeGrid(){
        let numOfCols = Math.floor(Math.sqrt(lobbyCount.length));
        // console.log(numOfCols);
        let gridStyle="";
        for (let i = 0; i < numOfCols; i++) {
            gridStyle = gridStyle + " auto";
        }
        // console.log(gridStyle);
        return {gridTemplateColumns: gridStyle};
    }

    console.log(chat);

    return (
        <>
            <div className="main-lobby">
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
                            { lobbyCount.map((index) => (
                                <LobbyGridElement key={index} quiz={ quiz } index={ index } />
                            ))}
                        </div>
                    </div> 
                </div>
                    <div className="main-chat">
                    <GeneralChat chat={ chat } socket = { socket } />
                </div>
                </div>
                
            
            <div className="slide-window">
                <SlideScript quiz={ quiz }/>
            </div>
        </>
     );
}
 
export default MainLobby;