import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import MainLobby from "./main/MainLobby";

const GetQuiz = () => {
    const { id } = useParams();
    const quizUrl = "http://localhost:5000/api/quizzes/quiz/" + id;
    const {data: quiz, isPending, error } = useFetch(quizUrl);

    return ( 
        <>
            { isPending && <div className="loading">Loading...</div> }
            { error && <div className="error">{ error }</div> }
            { quiz && <MainLobby quiz = { quiz }/> }
        </>
    );
}
 
export default GetQuiz;