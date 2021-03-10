import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import MainLobby from "./main/MainLobby";

const GetQuiz = () => {
    const [generalChatRefresh, setGeneralChatRefresh ] = useState();
    const { id } = useParams();
    const quizUrl = "http://localhost:5000/api/quizzes/quiz/" + id;
    const {data: quiz, isPending: quizIsPending, error: quizError } = useFetch(quizUrl);

    const chatUrl = "http://localhost:5000/api/quizzes/quiz/chat/" + id;
    const generalChat = useFetch(chatUrl, generalChatRefresh);

    const ENDPOINT = "http://localhost:5000/";

    const [chat, setChat] = useState("");
    // useEffect(() => {
    //     const socket = socketIOClient(ENDPOINT);
    //     socket.on("FromAPI", data => {
    //       setChat(data);
    //     });
        
    //     return () => socket.disconnect();
    // }, []);

    return ( 
        <>
            { quizIsPending && generalChat.isPending && <div className="loading">Loading...</div> }
            { quizError && generalChat.error && <div className="error">{ quizError }</div> }
            { quiz && generalChat.data && <MainLobby quiz = { quiz } generalChat = { generalChat } id={id} generalChatRefresh = {setGeneralChatRefresh}/> }
        </>
    );
}
 
export default GetQuiz;