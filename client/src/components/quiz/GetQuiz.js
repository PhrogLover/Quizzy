import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import useFetch from "../../hooks/useFetch";
import MainLobby from "./main/MainLobby";

const GetQuiz = () => {
    const ENDPOINT = "http://localhost:5000/";
    const { id } = useParams();
    const quizUrl = "http://localhost:5000/api/quizzes/quiz/" + id;
    const {data: quiz, isPending, error } = useFetch(quizUrl);
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("fromAPI", data => {
            setResponse(data);
        });
    }, []);

    return ( 
        <>
            <p id="white">
                It's <time dateTime={response}>{response}</time>
            </p>
            { isPending && <div className="loading">Loading...</div> }
            { error && <div className="error">{ error }</div> }
            { quiz && <MainLobby quiz = { quiz }/> }
        </>
    );
}
 
export default GetQuiz;