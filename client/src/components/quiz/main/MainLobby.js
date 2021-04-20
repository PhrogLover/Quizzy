import "./mainlobby.css";
import GeneralChat from "../GeneralChat";
import { useEffect, useState } from "react";
import $ from "jquery";
import HostView from "../host/HostView";
import PlayerView from "./PlayerView";
import LeaderboardPopUp from "../../basic/LeaderboardPopUp";

const MainLobby = ({ user, quiz, id, socket }) => {

    const [ userState, setUserState ] = useState("spectator");
    const [ round, setRound ] = useState(null);
    const [ leaderboard, setLeaderboard ] = useState(leaderboardInit());
    const [ teamList, setTeamList ] = useState(leaderboardInit());
    const [ lobbyData, setLobbyData ] = useState([]);
    const [ gcOpen,setgcOpen ] = useState(true);
    const [ lbToggle,setlbToggle ] = useState(false);

    const chatSize = quiz.numberOfTeams * quiz.numberOfPlayers;

    useEffect(() => {
        socket.emit('lobby data call',id);
        if (user.id === quiz.creatorId) {
            setUserState("host");
        }
        console.log("userState:" + userState)
    }, [])

    useEffect(() => {
        socket.on('set round '+id, (round) => {
            setRound(round);
        })
        socket.on('lobby data change '+id, (newLobbyData) => {
            setLobbyData(newLobbyData);
            setLeaderboard(leaderboardUpdate(newLobbyData));
        });
        socket.on('leaderboard '+id, (leaderboard) => {
            setTeamList(leaderboard);
        })
    }, [])

    useEffect(() => {
        socket.emit('leaderboard', leaderboard, id);
    }, [leaderboard])

    function leaderboardInit() {
        let leaderboardArr = [];
        for (let i = 0; i < quiz.numberOfTeams; i++) {
            let tempArr = []
            for (let j = 0; j <= quiz.numberOfRounds; j++) {
                tempArr.push([]);
            }
            leaderboardArr.push(tempArr);
        }
        return leaderboardArr;
    }

    function leaderboardUpdate(lobbyData) {
        let leaderboardArr = $.extend(true, [], leaderboard);
        for (let i = 0; i < leaderboardArr.length; i++) {
            leaderboardArr[i][0] = {
                id: lobbyData[i].id,
                name: lobbyData[i].name,
                players: lobbyData[i].players
            }
        }
        return leaderboardArr;
    }

    return (
            <div className="main-lobby">
                { userState !== "host" && <PlayerView lobbyData = { lobbyData } teamList = { teamList } gcOpen = { gcOpen } setgcOpen = { setgcOpen } lbToggle = { lbToggle } setlbToggle = { setlbToggle } userState = { userState } setUserState = { setUserState } user = { user } quiz = { quiz } socket = { socket } mainId = { id } /> }
                { userState === "host" && <HostView lobbyData = { lobbyData } teamList = { teamList } setLeaderboard = { setLeaderboard } round={ round } user = { user } quiz = { quiz } socket = { socket } mainId = { id }/> }
                <div className="main-chat">
                    <GeneralChat leaderboard = { teamList } gcOpen = { gcOpen } setgcOpen = { setgcOpen } lbToggle = { lbToggle } setlbToggle = { setlbToggle } userState = {userState} mainId = { id } chatSize={ chatSize } socket = { socket } user = { user } />
                </div>
                {lbToggle && <LeaderboardPopUp teamList = { teamList } user = { user } setlbToggle = {setlbToggle} />}
            </div>
     );
}

export default MainLobby;