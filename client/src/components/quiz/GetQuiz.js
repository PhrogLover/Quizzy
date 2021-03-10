import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import MainLobby from "./main/MainLobby";

const GetQuiz = () => {
    const { id } = useParams();
    const quizUrl = "http://localhost:5000/api/quizzes/quiz/" + id;
    const {data: quiz, isPending, error } = useFetch(quizUrl);

    const ENDPOINT = "http://localhost:5000/";

    const [chat, setChat] = useState("");
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
          setChat(data);
        });
        
        return () => socket.disconnect();
    }, []);

    return ( 
        <>
            { isPending && <div className="loading">Loading...</div> }
            { error && <div className="error">{ error }</div> }
            { quiz && <MainLobby quiz = { quiz } chat = { chat }/> }
        </>
    );
}
 
export default GetQuiz;