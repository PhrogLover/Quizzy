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
    const [ filterText, setFilterText ] = useState("filter-title");
    const [ filterDrop, setFilterDrop ] = useState("");

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
                <p>
                    There is always a quiz for someone!
                </p>
                <div className="search-container">
                    <FilterText  filter = { filterText } setFilterTitle = { setFilterTitle } setFilterCategory = { setFilterCategory } setFilterCreator = { setFilterCreator } setFilterDrop = { setFilterDrop }/>
                    <span>
                        Search by:
                        {[DropdownButton].map((DropdownType, idx) => (
                        <DropdownType
                            as={ButtonGroup}
                            key={idx}
                            id={`dropdown-button-drop-${idx}`}
                            size="sm"
                            variant="secondary"
                            title={ filterDrop }
                        >
                            <Dropdown.Item onClick={() => (setFilterText("filter-title"))} eventKey={1}>Title</Dropdown.Item>
                            <Dropdown.Item onClick={() => (setFilterText("filter-category"))} eventKey={2}>Category</Dropdown.Item>
                            <Dropdown.Item onClick={() => (setFilterText("filter-creator"))} eventKey={3}>Host</Dropdown.Item>
                        </DropdownType>
                        ))}
                    </span>
                </div>
                <div className="checkbox-container">
                    <div className="checkbox-item">
                        <label htmlFor="filter-seasonal"> Sort by Best Host: </label>
                        <input type="checkbox" name="sort-rating" onChange={checkbox => (setSortRating(checkbox.target.checked))}></input>
                    </div>
                    <div className="checkbox-item">
                        <label htmlFor="filter-seasonal"> Show only Seasonal Quizzes: </label>
                        <input type="checkbox" name="filter-seasonal" onChange={checkbox => (setFilterSeasonal(checkbox.target.checked))}></input>
                    </div>
                    <div className="checkbox-item">
                        <label htmlFor="filter-available"> Show only Available Quizzes: </label>
                        <input type="checkbox" name="filter-available" ></input>
                    </div>
                </div>
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