import VideoRoomComponent from "../team/VideoRoomComponent";
import React4VideoRoomComponent from "../../React4VideoRoomComponent";
import SocketIOClient from "socket.io-client";
import { useState, useEffect } from "react";

const GetVideoRoomComponent = ({ lobbyState, setLobbyState, quiz }) => {
    // const OPENVIDU_SERVER_URL = props.openviduServerUrl
    //     ? props.openviduServerUrl
    //     : 'https://' + window.location.hostname + ':4443';
    // const OPENVIDU_SERVER_SECRET = props.openviduSecret ? props.openviduSecret : 'MY_SECRET';
    const [ token, getToken ] = useState();
    const ENDPOINT = "http://localhost:5000/";
    const socket = SocketIOClient(ENDPOINT);

    function backHandler() {
        const newState = {
            type: "main"
        }
        setLobbyState(newState);
    }

    useEffect(() => {
        socket.on("team lobby get tokenroom", token => {
            getToken(token);
        })

        return () => socket.disconnect();
    }, [])

    return (
        <>
            { quiz && <VideoRoomComponent quiz = { quiz } socket = { socket } token = { token } backHandler = { backHandler }/>}
        </>
     );
}
 
export default GetVideoRoomComponent;