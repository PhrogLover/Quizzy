import React from 'react';
import { OverlayTrigger , Tooltip } from "react-bootstrap";
import './helpicon.css';

export const HelpIcon = (props) => {

    return(
        <>
        {/* {['left'].map((placement) => (
        <OverlayTrigger 
            key= {placement}
            placement={placement}
            overlay={<Tooltip id="tooltip-down">
                {props.children}
            </Tooltip>}                        
        > */}
            <div className="help-icon">
                <i className="fas fa-question-circle"/> 
            </div>  
        {/* </OverlayTrigger>
        ))} */}
        </>
    )
}

export default HelpIcon;

