import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./slideview.css";

import SlideScript from "./SlideScript";

const Slide = () => {
    const { id } = useParams();
    const quizUrl = "http://localhost:5000/api/quizzes/slide/" + id;
    const {data: quiz, isPending, error } = useFetch(quizUrl);

    return (
        <>
            { isPending && <div className="loading">Loading...</div>}
            { quiz && <SlideScript quiz = { quiz } error = { error } /> }
        </>
     );
}
 
export default Slide;