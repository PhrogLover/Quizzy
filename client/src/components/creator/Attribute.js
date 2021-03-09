import { useState, useEffect } from "react";
import "./attribute.css";

import Form from "react-bootstrap/Form";

const Attribute = ({ onChangeHandler, title, name, start = 1, finish, steps = 1, selected = null, reset = null, defaultVal = null }) => {
    function makeSteps(start, finish, steps) {
        let result = [];
        for (let i = start; i <= finish; i += steps) {
            result.push(i);
        }
        return  result;
    }

    const dropdownItems = makeSteps(start, finish, steps);
    const [ defValue, setDefValue ] = useState(selected);

    return ( 
        <div className="attribute-container">
            <div className="select-label">
                { title }:
            </div>
            <div className="select-container">
                <Form.Group controlId={ name }>
                    <div className="select-input-container">
                        <select value={ defValue } onChange={(selected) => {onChangeHandler(name, parseInt(selected.target.value)); setDefValue(selected.target.value)}} >
                        {dropdownItems.map(index => (
                            <option value={ index } key={ index } >{ index }</option>
                        ))}
                        </select>
                    </div>
                </Form.Group>
            </div>
            { reset && defaultVal && selected && <button type="button" onClick={() => {setDefValue(defaultVal); onChangeHandler(name, defaultVal)}}>Default value</button> }
        </div>
     );
}
 
export default Attribute;