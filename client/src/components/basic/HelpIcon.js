import React from 'react';
import { OverlayTrigger , Tooltip } from "react-bootstrap";
import './helpicon.css';

const HelpIcon = React.forwardRef((props, ref) => {
    return (
        <>
            {['left'].map((placement) => (
            <OverlayTrigger 
                key= {placement}
                placement={placement}
                transition={false}
                overlay={<Tooltip id="tooltip-down">
                    {props.children}
                </Tooltip>}                   
            >
                {({ ref, ...triggerHandler }) => (
                    <div ref={ref} {...triggerHandler} className="help-icon">
                        <i className="fas fa-question-circle"/> 
                    </div>  
                )}
                    </OverlayTrigger>
            ))}
        </>
    )
})

export default HelpIcon;

