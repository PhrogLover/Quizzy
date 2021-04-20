import "./mainlobby.css";
import GeneralChat from "../GeneralChat";
import { useEffect, useState } from "react";
import HostView from "../host/HostView";
import PlayerView from "./PlayerView";
import LeaderboardPopUp from "../../basic/LeaderboardPopUp";

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
    const [lbToggle,setlbToggle] = useState(false);


    return (
            <div className="main-lobby">
                { userState !== "host" && <PlayerView  gcOpen = { gcOpen } setgcOpen = { setgcOpen } lbToggle = { lbToggle } setlbToggle = { setlbToggle } userState = { userState } setUserState = { setUserState } user = { user } quiz = { quiz } socket = { socket } mainId = { id } /> }
                { userState === "host" && <HostView round={ round } user = { user } quiz = { quiz } socket = { socket } mainId = { id }/> }
                <div className="main-chat">
                    <GeneralChat gcOpen = { gcOpen } setgcOpen = { setgcOpen } lbToggle = { lbToggle } setlbToggle = { setlbToggle } userState = {userState} mainId = { id } chatSize={ chatSize } socket = { socket } />
                </div>
                {lbToggle && <LeaderboardPopUp/>}
            </div>
     );
}

export default MainLobby;