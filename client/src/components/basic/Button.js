import React from 'react';
import './button.css';

const STYLES = ['btn--solid','btn--outline'];


export const Button = ({children,buttonStyle}) => {

    const checkButtonStyle = STYLES.includes(buttonStyle) 
    ? buttonStyle 
    : STYLES[0]; // basically, if no buttonstyle is defined default is will be btn--solid

    return (
        
        <button className={`button ${checkButtonStyle}`}>
            {children}
        </button>
        
    )
}
