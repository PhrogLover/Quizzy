import { useState } from "react";
import useFetch from "../../useFetch";
import Quizlist from "./Quizlist";
import "./quizholder.css";

const Quizholder = () => {
    const quizzesUrl = "/api/quizzes/homepage";
    const { data: quizzes, isPending, error} = useFetch(quizzesUrl);

    const [ filterTitle, setFilterTitle ] = useState("");
    const [ filterCategory, setFilterCategory ] = useState("");
    const [ filterCreator, setFilterCreator ] = useState("");
    const [ sortRating, setSortRating ] = useState("");
    const [ filterSeasonal, setFilterSeasonal ] = useState(false)

    function deleteHandler(id) {
        const body = {
            id: id
        }
        fetch('/api/quizzes/delete', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
    }
    return (
        <div className="quiz-section">
            <div className="quiz-container">
                <h1>
                    Public Quizzes!
                </h1>

                <label htmlFor="filter-title">Search for Quiz: </label>
                <input type="text" name="filter-title" onChange={text => (setFilterTitle(text.target.value))}></input>
                <label htmlFor="filter-category"> Search for Category: </label>
                <input type="text" name="filter-category" onChange={text => (setFilterCategory(text.target.value))}></input>
                <label htmlFor="filter-creator"> Search for Host: </label>
                <input type="text" name="filter-creator" onChange={text => (setFilterCreator(text.target.value))}></input><br/>
                <label htmlFor="sort-rating"> Sort by Best Host: </label>
                <input type="checkbox" name="sort-rating" onChange={checkbox => (setSortRating(checkbox.target.checked))}></input>
                <label htmlFor="filter-seasonal"> Show only Seasonal Quizzes: </label>
                <input type="checkbox" name="filter-seasonal" onChange={checkbox => (setFilterSeasonal(checkbox.target.checked))}></input><br/>
                <label htmlFor="filter-available"> Show only Available Quizzes: </label>
                <input type="checkbox" name="filter-available" ></input>
            </div>
            <div className="quiz-container">
                { error && <div>{ error }</div>}
                { isPending && <div className="is-loading">Loading...</div>}
                { quizzes && <Quizlist quizzes = { 

                    quizzes.filter(quiz => ((quiz.domain !== "private") && 
                    (filterTitle === "" || quiz.title.toLowerCase().includes(filterTitle.toLowerCase())) && 
                    (filterCategory === "" || quiz.category.toLowerCase().includes(filterCategory.toLowerCase())) && 
                    (filterCreator === "" || quiz.creator.toLowerCase().includes(filterCreator.toLowerCase())) && 
                    (!filterSeasonal || quiz.type === "seasonal")) ) 
                    } sortRating = { sortRating } deleteHandler = { deleteHandler } />
                }
            </div>
        </div>
     );
}
 
export default Quizholder;