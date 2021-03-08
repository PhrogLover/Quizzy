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
        <span>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>{ title }</Form.Label>
                <Form.Control onChange={(selected) => (onChangeHandler(name, parseInt(selected.target.value)))} as="select">
                {reset && <option value="" >Deselect</option>}
                {dropdownItems.map(index => (
                    <>
                        { selected === index && <option selected value={ index } key={ index } >{ index }</option>}
                        { selected !== index && <option value={ index } key={ index } >{ index }</option>}
                    </>
                ))}
                </Form.Control>
            </Form.Group>
        </span>
     );
}
 
export default Attribute;