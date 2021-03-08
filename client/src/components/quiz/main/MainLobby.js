import "./mainlobby.css";
import SlideScript from "../SlideScript";
import LobbyGridElement from "./LobbyGridElement";
import GeneralChat from "../GeneralChat";

const MainLobby = ({ quiz }) => {

    let lobbyCount = [];
    for (let i = 0; i < quiz.numberOfTeams; i++) {
        lobbyCount.push(i);
    }

    return (
        <div className="main-lobby">
            <div className="header">
                <div className="quiz-title">{ quiz.title } by { quiz.creator }</div>
                <div className="instructions">
                    if Host: make sure that the players in your lobby are happy, minimaze foul activity, cheating, profanity as much as possible. At the bottom you have blah blah...
                    if Player: respect other players, don't take away the fun fron the experience by cheating, have fun. At the bottom you can choose your blah blah...
                </div>
            </div>
            <div className="lobby-grid">
                { lobbyCount.map((index) => (
                    <LobbyGridElement quiz={ quiz } index={ index } />
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