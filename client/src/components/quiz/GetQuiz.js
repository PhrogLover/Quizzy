import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import MainLobby from "./main/MainLobby";

const GetQuiz = ({ user }) => {
    const { id } = useParams();
    const quizUrl = "http://localhost:5000/api/quizzes/quiz/" + id;
    const {data: quiz, isPending: quizIsPending, error: quizError } = useFetch(quizUrl);

    const ENDPOINT = "http://localhost:5000/";
    const socket = socketIOClient(ENDPOINT);

    useEffect(() => {
        return () => socket.disconnect();
    }, []);

    return ( 
        <>
            { quizIsPending && <div className="loading">Loading...</div> }
            { quizError && <div className="error">{ quizError }</div> }
            { quiz && <MainLobby user = { user } quiz = { quiz } id={id} socket={ socket } /> }
        </>
    );
}
 
export default GetQuiz;