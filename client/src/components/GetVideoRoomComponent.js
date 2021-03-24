import VideoRoomComponent from "./VideoRoomComponent";
import SocketIOClient from "socket.io-client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GetVideoRoomComponent = () => {
    //Hello world
    // const OPENVIDU_SERVER_URL = props.openviduServerUrl
    //     ? props.openviduServerUrl
    //     : 'https://' + window.location.hostname + ':4443';
    // const OPENVIDU_SERVER_SECRET = props.openviduSecret ? props.openviduSecret : 'MY_SECRET';
    const { id } = useParams();
    const [ token, getToken ] = useState();
    const ENDPOINT = "http://localhost:5000/";
    const socket = SocketIOClient(ENDPOINT);

    useEffect(() => {
        socket.on("team lobby get token", token => {
            getToken(token);
        })

        return () => socket.disconnect();
    }, [])

    return ( 
        <VideoRoomComponent socket = { socket } token = { token }/>
     );
}
 
export default GetVideoRoomComponent;