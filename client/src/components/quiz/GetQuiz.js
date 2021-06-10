import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import MainLobby from "./main/MainLobby";

const GetQuiz = ({ user, socket }) => {
    const { id } = useParams();
    const quizUrl = "http://localhost:5000/api/quizzes/quiz/full/" + id;
    const {data: quiz, isPending: quizIsPending, error: quizError } = useFetch(quizUrl);

    return ( 
        <>
            { quizIsPending && <div className="loading">Loading...</div> }
            { quizError && <div className="error">{ quizError }</div> }
            { quiz && <MainLobby user = { user } quiz = { quiz } id={id} socket={ socket } /> }
        </>
    );
}
 
export default GetQuiz;