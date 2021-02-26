import "./attribute.css";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Attribute = ({ onChangeHandler, title, name, start = 1, finish, steps = 1 }) => {
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
            {[DropdownButton].map((DropdownType, idx) => (
            <DropdownType
                as={ButtonGroup}
                key={idx}
                id={`dropdown-button-drop-${idx}`}
                size="sm"
                variant="secondary"
                title={ title }
            >
                {dropdownItems.map(index => (
                    <Dropdown.Item onClick={() => (onChangeHandler(name, index))} key={ index } eventKey={ index }>{ index }</Dropdown.Item>
                ))}
            </DropdownType>
            ))}
        </span>
     );
}
 
export default Attribute;