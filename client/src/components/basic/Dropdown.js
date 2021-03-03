import React from 'react';
import { Link } from 'react-router-dom';
import './dropdown.css';
// import { CSSTransistion } from 'react-transition-group';

function Dropdown() {

    // const [activeMenu,setActiveMenu] = useState('main');


    function DropdownItem(props){
        return(
            <div className = "menuItem">
            {props.children}
            </div>
            
        )}

  return (
    <>
        <div className="dropMenu">
            {/* <CSSTransistion in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary"> */}
                <div className="menu">  
                    <DropdownItem>Master Volume</DropdownItem>
                    <DropdownItem>Music Volume</DropdownItem>
                    <DropdownItem>SFX Volume</DropdownItem>
                    <DropdownItem>Dark Mode Toggle - Feature Coming Soon</DropdownItem>
                    <DropdownItem>
                        Report A Bug
                    </DropdownItem>
                    <Link to="/signout">
                        <DropdownItem><i class="fas fa-sign-out-alt"></i> Sign Out</DropdownItem>
                    </Link>
                </div>
            {/* </CSSTransistion> */}
        </div>
    </>
  );
}

export default Dropdown;