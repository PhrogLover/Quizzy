import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../useFetch";
import Quizlist from "./Quizlist";
import "./quizholder.css";

const Quizholder = () => {
    const quizzesUrl = "/api/quizzes/homepage";
    const { data: quizzes, isPending, error} = useFetch(quizzesUrl);

    const [ filterTitle, setFilterTitle ] = useState("");
    const [ sortRating, setSortRating ] = useState("");

    useEffect(() => {
        console.log(sortRating);
    }, [sortRating])

    return (
        <div className="quiz-container">
            <label htmlFor="filter-title">Search for Quiz: </label>
            <input type="text" name="filter-title" onChange={text => (setFilterTitle(text.target.value))}></input>
            <label htmlFor="sort-rating"> Sort by Best Host: </label>
            <input type="checkbox" name="sort-rating" onChange={checkbox => (setSortRating(checkbox.target.checked))}></input><br/>
            <hr/>
            { error && <div>{ error }</div>}
            { isPending && <div className="is-loading">Loading...</div>}
            { quizzes && <Quizlist quizzes = { quizzes.filter(quiz => (filterTitle === "" || quiz.title === filterTitle)) } sortRating = { sortRating } />}
            <hr/>
        </div>
     );
}
 
export default Quizholder;