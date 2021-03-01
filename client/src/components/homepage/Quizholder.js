import { useState } from "react";
import useFetch from "../../useFetch";
import Quizlist from "./Quizlist";
import "./quizholder.css";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import FilterText from "./FilterText";

const Quizholder = () => {
    const quizzesUrl = "/api/quizzes/homepage";
    const { data: quizzes, isPending, error} = useFetch(quizzesUrl);

    const [ filterTitle, setFilterTitle ] = useState("");
    const [ filterCategory, setFilterCategory ] = useState("");
    const [ filterCreator, setFilterCreator ] = useState("");
    const [ sortRating, setSortRating ] = useState("");
    const [ filterSeasonal, setFilterSeasonal ] = useState(false);
    const [ filterText, setFilterText ] = useState("");

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

                <span>
                    {[DropdownButton].map((DropdownType, idx) => (
                    <DropdownType
                        as={ButtonGroup}
                        key={idx}
                        id={`dropdown-button-drop-${idx}`}
                        size="sm"
                        variant="secondary"
                        title="Select Filter"
                    >
                        <Dropdown.Item onClick={() => (setFilterText("filter-title"))} eventKey={1}>Filter by Quiz Title</Dropdown.Item>
                        <Dropdown.Item onClick={() => (setFilterText("filter-category"))} eventKey={2}>Filter by Category</Dropdown.Item>
                        <Dropdown.Item onClick={() => (setFilterText("filter-creator"))} eventKey={3}>Filter by Host</Dropdown.Item>
                    </DropdownType>
                    ))}
                </span>
                <FilterText  filter = { filterText } setFilterTitle = { setFilterTitle } setFilterCategory = { setFilterCategory } setFilterCreator = { setFilterCreator } />
                
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