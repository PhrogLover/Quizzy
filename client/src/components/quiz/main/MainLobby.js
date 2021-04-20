import "./mainlobby.css";
import GeneralChat from "../GeneralChat";
import { useEffect, useState } from "react";
import HostView from "../host/HostView";
import PlayerView from "./PlayerView";

const MainLobby = ({ user, quiz, id, socket }) => {

    const [ userState, setUserState ] = useState("spectator");
    const [ round, setRound ] = useState(null);
    const chatSize = quiz.numberOfTeams * quiz.numberOfPlayers;

    useEffect(() => {
        if (user.id === quiz.creatorId) {
            setUserState("host");
        }
        console.log("userState:" + userState)
    }, [])

    useEffect(() => {
        socket.on('set round '+id, (round) => {
            setRound(round);
        })
    }, [])

    const [gcOpen,setgcOpen] = useState(true);

    return (
            <div className="main-lobby">
                { userState !== "host" && <PlayerView  gcOpen = { gcOpen } setgcOpen = { setgcOpen } userState = { userState } setUserState = { setUserState } user = { user } quiz = { quiz } socket = { socket } mainId = { id } /> }
                { userState === "host" && <HostView round={ round } user = { user } quiz = { quiz } socket = { socket } mainId = { id }/> }
                <div className="main-chat">
                    <GeneralChat gcOpen = { gcOpen } setgcOpen = { setgcOpen } userState = {userState} mainId = { id } chatSize={ chatSize } socket = { socket } />
                </div>
            </div>
     );
}

export default MainLobby;