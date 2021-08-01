import { useState, useEffect } from "react";
import "./attribute.css";

const FieldAttribute = ({ onChangeHandler, title, name, start = 1, finish, selected = "" }) => {

    console.log(selected);

    const [ defaultVal, setDefaultVal ] = useState(selected);
    const [ checkVal, setCheckVal ] = useState(selected);
    const [ error, setError ] = useState("");

    useEffect(() => {
        const val = parseInt(checkVal);
        if (val >= start && val <= finish) {
            onChangeHandler(name, val);
        }
        else {
            setError("Invalid Value");
        }
    }, [checkVal])

    useEffect(() => {
        onChangeHandler(name, defaultVal);
    }, [])

    return ( 
        <div className="attribute-element">
            <div className="select-label">
                { title }:
            </div>
            <div className="select-container">
                <input type="text" value={ selected } onChange={(selecteded) => { setCheckVal(selecteded.target.value); setError("") }}></input>
            </div>
            <div>
                { error }
            </div>
            <div className="default-value-container">
                { defaultVal  && <button type="button" className="default-button" onClick={() => {onChangeHandler(name, defaultVal)}}>Default value</button> }
            </div>
        </div>
     );
}
 
export default FieldAttribute;