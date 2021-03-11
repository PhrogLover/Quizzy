import "./mainlobby.css";
import SlideScript from "../SlideScript";
import LobbyGridElement from "./LobbyGridElement";
import GeneralChat from "../GeneralChat";

const MainLobby = ({ quiz, generalChat, id, generalChatRefresh }) => {

    if (generalChat.isPending) {
        setTimeout(() => {
            generalChatRefresh("");
        }, 1000)
    }


    let randomTeamNumber = Math.floor(Math.random()*25);
    let lobbyCount = [];
    for (let i = 0; i < randomTeamNumber; i++) {
        lobbyCount.push(i);
    }

    function makeGrid(){
        let numOfCols = Math.floor(Math.sqrt(lobbyCount.length));
        // console.log(numOfCols);
        let gridStyle="";
        for (let i = 0; i < numOfCols; i++) {
            gridStyle = gridStyle + " auto";
        }
        // console.log(gridStyle);
        return {"grid-template-columns": gridStyle};
    }

    return (
        <>
            <div className="main-lobby">
                <div className="main-header">
                    <div className="quiz-title">{ quiz.title } by { quiz.creator }</div>
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
                    <div className="main-chat">
                    { generalChat.isPending && <div className="loading">Loading...</div> }
                    { generalChat.error && <div className="error">{ generalChat.error }</div> }
                    { generalChat.data && <GeneralChat generalChatRefresh = {generalChatRefresh} chat={ generalChat.data } id={id} /> }
                </div>
                </div>
                
            </div>
            <div className="slide-window">
                <SlideScript quiz={ quiz }/>
            </div>
        </>
     );
}
 
export default MainLobby;