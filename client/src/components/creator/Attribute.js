import { useState, useEffect } from "react";
import "./attribute.css";

import Form from "react-bootstrap/Form";

const Attribute = ({ onChangeHandler, title, name, start = 1, finish, steps = 1, selected = null, defaultVal = null }) => {
    function makeSteps(start, finish, steps) {
        let result = [];
        for (let i = start; i <= finish; i += steps) {
            result.push(i);
        }
        return  result;
    }

    const dropdownItems = makeSteps(start, finish, steps);
    const [ defValue, setDefValue ] = useState(selected);

    useEffect(() => {
        setDefValue(selected);
    }, [selected]);

    return ( 
        <div className="attribute-container">
            <div className="select-label">
                { title }:
            </div>
            <div className="select-container">
                <Form.Group controlId={ name }>
                    <div className="select-input-container">
                        <select value={ defValue } onChange={(selecteded) => {onChangeHandler(name, parseInt(selecteded.target.value)); setDefValue(selecteded.target.value)}} >
                            {dropdownItems.map(index => (
                                <option value={ index } key={ index } >{ index }</option>
                            ))}
                        </select>
                    </div>
                </Form.Group>
            </div>
            <div className="default-value-container">
                { defaultVal && selected && <button type="button" className="default-button" onClick={() => {setDefValue(defaultVal); onChangeHandler(name, defaultVal)}}>Default value</button> }
            </div>
        </div>
     );
}
 
export default Attribute;