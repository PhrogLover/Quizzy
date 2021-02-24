import Attribute from "./Attribute";
import "./attributes.css";

import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

const Attributes = () => {
    return ( 
        <div className="attributes">
            <label htmlFor="quiz-title">Quiz Title: </label>
            <input type="text" name="quiz-title"/>
            <label htmlFor="quiz-category">Main Theme/Category: </label>
            <input type="text" name="quiz-category"/>

            <label htmlFor="quiz-domain">Quiz's domain: </label>
            <ToggleButtonGroup type="radio" name="quiz-domain" defaultValue={1}>
                <ToggleButton value={1}>Public</ToggleButton>
                <ToggleButton value={2}>Private</ToggleButton>
            </ToggleButtonGroup><br/>
  
            <label htmlFor="quiz-type">Quiz type: </label>
            <ToggleButtonGroup type="radio" name="quiz-type" defaultValue={1}>
                <ToggleButton value={1}>Standard</ToggleButton>
                <ToggleButton value={2}>Seasonal</ToggleButton>
            </ToggleButtonGroup>

            <label htmlFor="quiz-family-title">Choose Quiz Family Title: </label>
            <input type="text" name="quiz-family-title"/><br/>


            <Attribute title = "Number of Teams" start = {2} finish = {25}/>
            <Attribute title = "Members per Team" finish = {5}/>
            <Attribute title = "Number of Rounds" finish = {10}/>
            <Attribute title = "Questions per Round" start = {5} finish = {20}/>
        </div>
     );
}
 
export default Attributes;