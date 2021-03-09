import "./mainlobby.css";
import SlideScript from "../SlideScript";
import LobbyGridElement from "./LobbyGridElement";
import GeneralChat from "../GeneralChat";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const MainLobby = ({ quiz }) => {
    const ENDPOINT = "http://localhost:5000/";

    const [response, setResponse] = useState("");
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
          setResponse(data);
        });
        
        return () => socket.disconnect();
    }, []);

    let lobbyCount = [];
    for (let i = 0; i < quiz.numberOfTeams; i++) {
        lobbyCount.push(i);
    }

    return (
        <div className="main-lobby">
            <div className="header">
                <div>It's <time dateTime={response}>{response}</time></div>
                <div className="quiz-title">{ quiz.title } by { quiz.creator }</div>
                <div className="instructions">
                    if Host: make sure that the players in your lobby are happy, minimaze foul activity, cheating, profanity as much as possible. At the bottom you have blah blah...
                    if Player: respect other players, don't take away the fun fron the experience by cheating, have fun. At the bottom you can choose your blah blah...
                </div>
            </div>
            <div className="lobby-grid">
                { lobbyCount.map((index) => (
                    <LobbyGridElement key={index} quiz={ quiz } index={ index } />
                ))}
            </div>
            <div className="chat">
                <GeneralChat />
            </div>
            <div className="slide-window">
                <SlideScript quiz={ quiz }/>
            </div>
        </div>
     );
}
 
export default MainLobby;