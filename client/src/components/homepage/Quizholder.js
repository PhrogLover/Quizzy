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
    const [ filterSelector, setFilterSelector ] = useState("filter-title");
    const [ filterDrop, setFilterDrop ] = useState("Title");

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

    function changeFilterSelector(filter) {
        setFilterSelector(filter);
        if (filter === "filter-title") {
            setFilterDrop("Title");
            setFilterCategory("");
            setFilterCreator("");
        }
        else if (filter === "filter-category") {
            setFilterDrop("Category");
            setFilterTitle("");
            setFilterCreator("");
        }
        else {
            setFilterDrop("Host");
            setFilterCategory("");
            setFilterTitle("");
        }
    }

    return (
        <div className="quiz-section">
            <div className="search-container">
                <h1>
                    Public Quizzes!
                </h1>
                <p>
                    There is always a quiz for someone!
                </p>
                <div className="search-bar-container">
                    <FilterText  filter = { filterSelector } filterTitle = { filterTitle } setFilterTitle = { setFilterTitle } filterCategory = { filterCategory } setFilterCategory = { setFilterCategory } filterCreator = { filterCreator } setFilterCreator = { setFilterCreator } setFilterDrop = { setFilterDrop }/>
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
                            <Dropdown.Item onClick={() => (changeFilterSelector("filter-title"))} eventKey={1}>Title</Dropdown.Item>
                            <Dropdown.Item onClick={() => (changeFilterSelector("filter-category"))} eventKey={2}>Category</Dropdown.Item>
                            <Dropdown.Item onClick={() => (changeFilterSelector("filter-creator"))} eventKey={3}>Host</Dropdown.Item>
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
            <div className="scroll-table">
                <div className="quiz-table-container">
                    <div className="headers-row">
                        <div className="starttime cell header"> <span>Starting Time</span></div>
                        <div className="spaces cell header"> <span>Spaces</span></div>               
                        <div className="quiztitle cell header"> <span>Quiz Title</span></div>
                        <div className="category cell header"> <span>Category</span></div>
                        <div className="type cell header"> <span>Type</span></div>
                        <div className="family cell header"> <span>Family</span></div>
                        <div className="host cell header"> <span>Host</span></div>
                        <div className="hostrating cell end header"> <span>Host's Rating:</span></div>
                    </div>
                    <div className="body-row">
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
            </div>
        </div>
     );
}
 
export default Quizholder;