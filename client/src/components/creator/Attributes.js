import Attribute from "./Attribute";
import "./attributes.css";

import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import GetUniqueId from "../../GetUniqueId";

const Attributes = ({ onChangeHandler, quiz }) => {

    function CopyClipboard(text) {
        navigator.clipboard.writeText(text);
    }

    return ( 
        <div className="attributes">
            <label htmlFor="quiz-title">Quiz Title: </label>
            <input type="text" name="quiz-title" onChange={option => (onChangeHandler("title", option.target.value))}/>
            <label htmlFor="quiz-category">Main Theme/Category: </label>
            <input type="text" name="quiz-category" onChange={option => (onChangeHandler("category", option.target.value))}/>
            <label htmlFor="quiz-family-title">Choose Quiz Family Title: </label>
            <input type="text" name="quiz-family-title" onChange={option => (onChangeHandler("family", option.target.value))}/><br/>

            <label htmlFor="quiz-domain">Quiz's domain: </label>
            <ToggleButtonGroup type="radio" name="quiz-domain" defaultValue={1} onChange={option => (onChangeHandler("domain", option))}>
                <ToggleButton value="public">Public</ToggleButton>
                <ToggleButton value="private">Private</ToggleButton>
            </ToggleButtonGroup>
  
            <label htmlFor="quiz-type">Quiz type: </label>
            <ToggleButtonGroup type="radio" name="quiz-type" defaultValue={1} onChange={option => (onChangeHandler("type", option))}>
                <ToggleButton value="standard">Standard</ToggleButton>
                <ToggleButton value="seasonal">Seasonal</ToggleButton>
            </ToggleButtonGroup><br/>
            { quiz.type === "seasonal" && <>
                <label htmlFor="seasonal-startup-id">Seasonal Quiz unique ID *can see this after creating the quiz in your profile page: </label>
                <input type="text" readOnly name="seasonal-startup-id" value ={ quiz.seasonalId }/><br/>
                <button type="button" onClick={() =>(CopyClipboard(quiz.seasonalId))}>Copy to Clipboard</button>
                <button type="button" onClick={() => (onChangeHandler("seasonalId", GetUniqueId()))}>Generate New ID</button>
            </>}

            


            <Attribute onChangeHandler = { onChangeHandler } title = "Number of Teams" name = "numberOfTeams" start = {2} finish = {25}/>
            <Attribute onChangeHandler = { onChangeHandler } title = "Players per Team" name = "numberOfPlayers" finish = {5}/>
            <Attribute onChangeHandler = { onChangeHandler } title = "Number of Rounds" name = "numberOfRounds" finish = {10}/>
            <Attribute onChangeHandler = { onChangeHandler } title = "Questions per Round" name = "numberOfQuestions" start = {5} finish = {20}/>
        </div>
     );
}
 
export default Attributes;