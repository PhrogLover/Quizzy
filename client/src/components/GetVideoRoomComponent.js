import VideoRoomComponent from "./VideoRoomComponent";
import SocketIOClient from "socket.io-client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GetVideoRoomComponent = () => {
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