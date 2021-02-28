import React from 'react';
import { Link } from 'react-router-dom';
import './dropdown.css';

function Dropdown() {

    function DropdownItem(props){
        return(
            <div className = "menuItem">
            {props.children}
            </div>
            
        )}

  return (
    <>
        <div className="dropMenu">
            <DropdownItem>Master Volume</DropdownItem>
            <DropdownItem>Music Volume</DropdownItem>
            <DropdownItem>SFX Volume</DropdownItem>
            <DropdownItem>Dark Mode Toggle - Feature Coming Soon</DropdownItem>

            <Link to="/signout">
            <DropdownItem><i class="fas fa-sign-out-alt"></i> Sign Out</DropdownItem>
            </Link>
        </div>
      
    </>
  );
}

export default Dropdown;