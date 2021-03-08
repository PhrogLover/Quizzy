import "./attribute.css";

import Form from "react-bootstrap/Form";

const Attribute = ({ onChangeHandler, title, name, start = 1, finish, steps = 1, reset = false, selected = null }) => {
    function makeSteps(start, finish, steps) {
        let result = [];
        for (let i = start; i <= finish; i += steps) {
            result.push(i);
        }
        return  result;
    }

    const dropdownItems = makeSteps(start, finish, steps);

    return ( 
        <div className="attribute-container">
            <div className="select-label">
                { title }:
            </div>
            <div className="select-container">
                <Form.Group controlId={ name }>
                    <div className="select-input-container">
                        <select defaultValue={ selected } onChange={(selected) => (onChangeHandler(name, parseInt(selected.target.value)))} >
                        {reset && <option value={-1} >Deselect</option>}
                        {dropdownItems.map(index => (
                            <option value={ index } key={ index } >{ index }</option>
                        ))}
                        </select>
                    </div>
                </Form.Group>
            </div>
        </div>
     );
}
 
export default Attribute;