import Attribute from "./Attribute";
import "./attributes.css";
import HelpIcon from "../basic/HelpIcon";
import React from "react";

import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import GetUniqueId from "../../GetUniqueId";
import DateTimePicker from 'react-datetime-picker';

const Attributes = ({ onChangeHandler, quiz, privateDisabled, seasonalDisabled }) => {

    function CopyClipboard(text) {
        navigator.clipboard.writeText(text);
    }

    const domainRef = React.createRef();
    const typeRef = React.createRef();

    return ( 
        <div className="attributes">
            <div className="quiz-title-container">
                <div className="quiz-title-label" htmlFor="quiz-title">Quiz Title: </div>
                <input type="text" name="quiz-title" onChange={option => (onChangeHandler("title", option.target.value))}/>
            </div>
            <div className="quiz-category-container">
                <div className="quiz-category-label" htmlFor="quiz-category">Main Theme/Category: </div>
                <input type="text" name="quiz-category" onChange={option => (onChangeHandler("category", option.target.value))}/>
            </div>
            

            { privateDisabled && <><br/><span>*Cannot Create a Private Seasonal Quiz</span></>}
            

            <div className="domain-container">
                <div className="domain-label" htmlFor="quiz-domain"> <HelpIcon ref={domainRef}>Private Quizes can only be played by users with the ID. Public Quizzes can be joined by anyone</HelpIcon> Quiz Domain: </div>
                <div className="domain-picker-container">
                    <input disabled={privateDisabled} onChange={change => (onChangeHandler("domain", change.target.checked))} id="domain-toggle" className="display-none" type="checkbox"/>
                    <span className="toggle-label">
                        Public
                    </span>
                    <label className="toggle-container" htmlFor="domain-toggle">
                        <span className="domain-toggle"></span>
                    </label>
                    <span className="toggle-label">
                        Private
                    </span>
                </div>
            </div>
            <div className="type-container">
                <div className="type-label" htmlFor="quiz-type"> <HelpIcon ref={typeRef}>bruh</HelpIcon> Quiz Type: </div>
                <div className="type-picker-container">
                    <input disabled={seasonalDisabled} onChange={change => (onChangeHandler("type", change.target.checked))} id="type-toggle" className="display-none" type="checkbox"/>
                    <span className="toggle-label">
                        Standard
                    </span>
                    <label className="toggle-container" htmlFor="type-toggle">
                        <span className="type-toggle"></span>
                    </label>
                    <span className="toggle-label">
                        Seasonal
                    </span>
                </div>
            </div>


            <ToggleButtonGroup type="radio" name="quiz-domain" defaultValue={1} onChange={option => (onChangeHandler("domain", option))}>
                <ToggleButton value="public">Public</ToggleButton>
                <ToggleButton disabled={ privateDisabled } value="private">Private</ToggleButton>
            </ToggleButtonGroup>
            { quiz.domain === "private" && <>
                <label htmlFor="private-id">Quiz unique ID *can see this after creating the quiz in your profile page: </label>
                <input type="text" readOnly name="private-id" value ={ quiz.id }/><br/>
                <button type="button" onClick={() =>(CopyClipboard(quiz.id))}>Copy to Clipboard</button>
                <button type="button" onClick={() => (onChangeHandler("id", GetUniqueId()))}>Generate New ID</button>                
            </>}

            { seasonalDisabled && <><br/><span>*Cannot Create a Private Seasonal Quiz</span></> }
            <label htmlFor="quiz-type">Quiz type: </label>
            <ToggleButtonGroup type="radio" name="quiz-type" defaultValue={1} onChange={option => (onChangeHandler("type", option))}>
                <ToggleButton value="standard">Standard</ToggleButton>
                <ToggleButton disabled={ seasonalDisabled } value="seasonal">Seasonal</ToggleButton>
            </ToggleButtonGroup><br/>
            { quiz.type === "seasonal" && <>
                <label htmlFor="quiz-family-title">Choose Quiz Family Title: </label>
                <input type="text" name="quiz-family-title" onChange={option => (onChangeHandler("family", option.target.value))}/><br/>
                <label htmlFor="seasonal-startup-id">Seasonal Quiz unique ID *can see this after creating the quiz in your profile page: </label>
                <input type="text" readOnly name="seasonal-startup-id" value ={ quiz.id }/><br/>
                <p>This ID is Necessary When Creating Further Iterations of the Seasonal Quiz, since Each Quiz Must Have the Same Format in the Particular Family. <br/>
                Once You Finalise the First Quiz Now, Enter this ID at the Top to Instantly Pre-set All of the Attributes of the Seasonal Quiz.</p>
                <button type="button" onClick={() =>(CopyClipboard(quiz.id))}>Copy to Clipboard</button>
                <button type="button" onClick={() => (onChangeHandler("id", GetUniqueId()))}>Generate New ID</button>
                <Attribute onChangeHandler = {onChangeHandler} title="Set Number of Quizzes in the Season" name="seasonFreq" start = {6} finish = {12}/>
            </>}
            <span id="time-picker">Select a Time When You Will Want to Start the Quiz:</span><br/>
            { quiz.type === "seasonal" && <span>*For Seasonal Quizzes this Time Applies to Every Week After This Selected One Until the Number of Quizzes in the Season are Reached.</span>}
            <DateTimePicker value={ quiz.time } onChange={ time => (onChangeHandler("time", time))}/>

            


            <Attribute onChangeHandler = { onChangeHandler } title = "Number of Teams" name = "numberOfTeams" start = {2} finish = {25}/>
            <Attribute onChangeHandler = { onChangeHandler } title = "Players per Team" name = "numberOfPlayers" finish = {5}/>
            <Attribute onChangeHandler = { onChangeHandler } title = "Number of Rounds" name = "numberOfRounds" finish = {10}/>
            <Attribute onChangeHandler = { onChangeHandler } title = "Questions per Round" name = "numberOfQuestions" start = {5} finish = {20}/>
        </div>
     );
}
 
export default Attributes;