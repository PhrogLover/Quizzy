import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import MainLobby from "./main/MainLobby";

const GetQuiz = () => {
    const { id } = useParams();
    const quizUrl = "http://localhost:5000/api/quizzes/quiz/" + id;
    const {data: quiz, isPending: quizIsPending, error: quizError } = useFetch(quizUrl);

    const [ nextMessage, setNextMessage ] = useState(null);

    const ENDPOINT = "http://localhost:5000/";
    const socket = socketIOClient(ENDPOINT);

    useEffect(() => {
        socket.on("chat message", data => {
            setNextMessage(data);
        });
        
        return () => socket.disconnect();
    }, []);

    return ( 
        <>
            { quizIsPending && <div className="loading">Loading...</div> }
            { quizError && <div className="error">{ quizError }</div> }
            { quiz && <MainLobby quiz = { quiz } nextMessage = { nextMessage } id={id} socket={ socket } /> }
        </>
    );
}
 
export default GetQuiz;