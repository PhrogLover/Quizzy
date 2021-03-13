import Attribute from "./Attribute";
import "./attributes.css";
import HelpIcon from "../basic/HelpIcon";
import React from "react";

import GetUniqueId from "../../GetUniqueId";
import DateTimePicker from 'react-datetime-picker';
// import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle'

const Attributes = ({ onChangeHandler, quiz }) => {

    function CopyClipboard(text) {
        navigator.clipboard.writeText(text);
    }

    const domainRef = React.createRef();
    const typeRef = React.createRef();
    const idGenRef = React.createRef();
    const timePerQRef = React.createRef();

    return ( 
        <div className="attributes">
            <div className="quiz-title-container">
                <div className="quiz-title-label" htmlFor="quiz-title">Quiz Title: </div>
                <input type="text" name="quiz-title" placeholder="My Quiz" onChange={option => (onChangeHandler("title", option.target.value))}/>
            </div>



            <div className="quiz-category-container">
                <div className="quiz-category-label" htmlFor="quiz-category">Main Theme/Category: </div>
                <input type="text" name="quiz-category" placeholder="General Knowledge" onChange={option => (onChangeHandler("category", option.target.value))}/>
            </div>



            <div className="main-toggle-container">
                <div className="domain-container">
                    <div className="domain-label" htmlFor="quiz-domain"> <HelpIcon ref={domainRef}><strong>Private Quizzes</strong> can only be played by users with the ID. <strong>Public Quizzes</strong> can be joined by anyone.</HelpIcon> Quiz Domain: </div>
                    <div className="domain-picker-container">
                        <input onChange={change => (onChangeHandler("domain", change.target.checked))} id="domain-toggle" className="display-none" type="checkbox"/>
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
                    <div className="type-label" htmlFor="quiz-type"> <HelpIcon ref={typeRef}><strong>Seasonal Quizzes</strong> repeat every week on the same day. <strong>Standard Quizzes</strong> can be played once.</HelpIcon> Quiz Type: </div>
                    <div className="type-picker-container">
                        <input onChange={change => (onChangeHandler("type", change.target.checked))} id="type-toggle" className="display-none" type="checkbox"/>
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
            </div>


            

            { (quiz.domain === "private" || quiz.type === "seasonal") && 
            <>
                <div className="creator-line-break"/>
                <div className="id-generator-container">
                    <div className="id-generator-main">
                        <div className="id-gen-label" htmlFor="private-id"> <HelpIcon ref={idGenRef}>You can see this after creating the quiz in your <strong>Profile Page</strong></HelpIcon> Quiz Unique ID: </div>
                        <input type="text" readOnly name="private-id" value ={ quiz.id } className="id-generator"/>
                    </div>
                    <div className="id-generator-buttons">
                        <div className="copy-clipboard-button" onClick={() =>(CopyClipboard(quiz.id))}><i className="far fa-clipboard"></i></div>
                        <div className="new-quizid-button" onClick={() => (onChangeHandler("id", GetUniqueId()))}><i className="fas fa-sync-alt"></i>Generate New ID</div>
                    </div>                
                </div>
            </>
            }


            { quiz.type === "seasonal" && <>
            
                <div className="quiz-family-title-container">
                    <div className="quiz-family-title-label" htmlFor="quiz-family-title">Quiz Family Title: </div>
                    <input type="text" name="quiz-family-title" placeholder="My Seasonal Quizzes"  onChange={option => (onChangeHandler("family", option.target.value))}/>
                </div>              
                
                <p>This ID is Necessary When Creating Further Iterations of the Seasonal Quiz, since Each Quiz Must Have the Same Format in the Particular Family. <br/>
                Once You Finalise the First Quiz Now, Enter this ID at the Top to Instantly Pre-set All of the Attributes of the Seasonal Quiz.</p>
                <Attribute onChangeHandler = {onChangeHandler} title="Number of Quizzes in the Season" name="seasonFreq" start = {6} finish = {12}/>
            </>}
            <div className="creator-line-break"/>
            <div className="attributes-main-container">    
                <div className="attributes-row">        
                    <Attribute onChangeHandler = { onChangeHandler } title = "Number of Teams" name = "numberOfTeams" start = {2} finish = {25} selected = {quiz.numberOfTeams}/>
                    <Attribute onChangeHandler = { onChangeHandler } title = "Players per Team" name = "numberOfPlayers" finish = {5} selected = {quiz.numberOfPlayers}/>
                </div>
                <div className="attributes-row">    
                    <Attribute onChangeHandler = { onChangeHandler } title = "Number of Rounds" name = "numberOfRounds" finish = {10} selected = {quiz.numberOfRounds}/>
                    <Attribute onChangeHandler = { onChangeHandler } title = "Questions per Round" name = "numberOfQuestions" start = {5} finish = {20} selected = {quiz.numberOfQuestions}/>
                </div>
                <div className="attributes-row">  
                    <div className="attribute-with-help">
                        <HelpIcon ref={timePerQRef}>You can set more intricate question timings in the slide editor below.</HelpIcon>
                    </div>
                    <Attribute onChangeHandler = { onChangeHandler } title = "Time per Question" name = "timePerQuestion" start = {10} finish = {90} step = {5} selected = {quiz.timePerQuestion}/>
                </div>            
                <div className="date-time-container">
                    <span id="time-picker">Select a Time When You Will Want to Start the Quiz:</span><br/>
                    { quiz.type === "seasonal" && <span>*For Seasonal Quizzes this Time Applies to Every Week After This Selected One Until the Number of Quizzes in the Season are Reached.</span>}
                    <DateTimePicker value={ quiz.time } onChange={ time => (onChangeHandler("time", time))}/>
                </div>

            </div>
        </div>
     );
}
 
export default Attributes;