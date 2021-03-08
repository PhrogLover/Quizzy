import React from 'react';
import './button.css';

const STYLES = ['btn--solid','btn--outline'];
const SIZES = ['btn--medium', 'btn--small']
const COLOURS =['btn--primary-colour','btn--secondary-colour','btn--white-colour','btn--black2-colour','btn--green-colour','btn--blue-colour']


export const Button = ({children,buttonStyle,buttonColour,buttonType}) => {

    const checkButtonStyle = STYLES.includes(buttonStyle) 
    ? buttonStyle 
    : STYLES[0]; // basically, if no buttonstyle is defined default is will be btn--solid

    const checkButtonColour = COLOURS.includes(buttonColour) 
    ? buttonColour 
    : COLOURS[0]; // basically, if no buttoncolour is defined default is will be btn--primary

    

    return (
        
        <button className={`button ${checkButtonStyle} ${checkButtonColour}`} type={buttonType}>
            {children}
        </button>
        
    )
}
