import "./mainlobby.css";
import GeneralChat from "../GeneralChat";
import { useEffect, useState } from "react";
import HostView from "../host/HostView";
import PlayerView from "./PlayerView";

const MainLobby = ({ user, quiz, id, socket }) => {

    const [ userState, setUserState ] = useState("player");
    const chatSize = quiz.numberOfTeams * quiz.numberOfPlayers;

    useEffect(() => {
        if (user.googleId === quiz.creatorId) {
            setUserState("host");
        }
    }, [])

    return (
            <div className="main-lobby">
                { userState === "player" && <PlayerView user = { user } quiz = { quiz } socket = { socket } mainId = { id } /> }
                { userState === "host" && <HostView user = { user } quiz = { quiz } socket = { socket } mainId = { id }/> }
                <div className="main-chat">
                    <GeneralChat mainId = { id } chatSize={ chatSize } socket = { socket } />
                </div>
            </div>
     );
}

export default MainLobby;