import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./slideview.css";

import SlideView from "./SlideView";

const Slide = () => {
    const { id } = useParams();
    const quizUrl = "http://localhost:5000/api/quizzes/slide/" + id;
    const {data: quiz, error } = useFetch(quizUrl);

    window.addEventListener('load', (event) => {
        console.log('page is fully loaded');
        });

    return (
        <>
            {quiz && <SlideView quiz = { quiz } error = { error } /> }
        </>
     );
}
 
export default Slide;