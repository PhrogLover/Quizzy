import VideoRoomComponent from "./VideoRoomComponent";
import React4VideoRoomComponent from "./React4VideoRoomComponent";
import SocketIOClient from "socket.io-client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const GetVideoRoomComponent = () => {
    // const OPENVIDU_SERVER_URL = props.openviduServerUrl
    //     ? props.openviduServerUrl
    //     : 'https://' + window.location.hostname + ':4443';
    // const OPENVIDU_SERVER_SECRET = props.openviduSecret ? props.openviduSecret : 'MY_SECRET';
    const { id } = useParams();
    const [ token, getToken ] = useState();
    const ENDPOINT = "http://localhost:5000/";
    const socket = SocketIOClient(ENDPOINT);
    const quizUrl = "http://localhost:5000/api/quizzes/quiz/" + id;
    const {data: quiz, isPending, error } = useFetch(quizUrl);
    const [ message, setMessage ] = useState(null);

    useEffect(() => {
        socket.on("team lobby get token", token => {
            getToken(token);
        })

        return () => socket.disconnect();
    }, [])

    useEffect(() => {
        socket.on("chat message", data => {
            setMessage(data);
        });
        
        return () => socket.disconnect();
    }, []);

    return (
        <>
            { quiz && <VideoRoomComponent quiz = {quiz} socket = { socket } message={message} token = { token }/>}
        </>
     );
}
 
export default GetVideoRoomComponent;