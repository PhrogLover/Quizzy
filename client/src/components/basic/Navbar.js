import React , { useState } from 'react';
import "./navbar.css";
import { Link } from "react-router-dom";
import './dropdown.css';



const Navbar = () => {

    const [open, setOpen] = useState(false);
    const closeDropdown = () => setOpen(false);

    function Dropdown() {

        // const [activeMenu,setActiveMenu] = useState('main');
        
    
        function DropdownItem(props){
            return(
                <div className = "menu-item">
                    <div className="dropdown-icon"><i className= {props.icon}/></div>
                    {props.children}
                </div>        
            )}
      return (
        <>
            <div className="dropMenu">
                {/* <CSSTransistion in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary"> */}
                    <div className="menu">  
                        <DropdownItem icon ="fas fa-volume-up">
                            <div className="item-text">
                                Master Volume
                            </div>
                            <div className="dropdown-inputs">
                                <input type="range" min="1" max="100" className="slider" id="masterVolume"/>
                            </div>
                        </DropdownItem>
                        <DropdownItem icon="fas fa-music">
                            <div className="item-text">
                                Music Volume
                            </div>
                            <div className="dropdown-inputs">
                                <input type="range" min="1" max="100" className="slider" id="musicVolume"/>
                            </div>
                        </DropdownItem>
                        <DropdownItem icon ="fas fa-volume-up">
                            <div className="item-text">
                                SFX Volume
                            </div>
                            <div className="dropdown-inputs">
                                <input type="range" min="1" max="100" className="slider" id="sfxVolume"/>
                            </div>
                        </DropdownItem>
                        <DropdownItem icon = "fas fa-moon">
                            <div className="item-text">
                                Dark Theme
                            </div>
                            <div className="dropdown-inputs">
                                <label className="switch">
                                    <input type="checkbox"/>
                                    <span className="toggle round"></span>
                                </label>
                            </div>
                            
                        </DropdownItem>
                        <div className="dropdown-break"/>
                        <div className="closeables" onClick = {closeDropdown}>
                            <DropdownItem icon ="fas fa-bug">                            
                                <div className="item-text" onClick = {closeDropdown}>
                                    Report A Bug
                                </div>                        
                            </DropdownItem>
                        </div>
                        <Link to="/signout">
                            < div className="closeables" onClick = {closeDropdown}>
                                <DropdownItem icon="fas fa-sign-out-alt">
                                <div className="item-text" >                                
                                    Sign Out                               
                                </div>
                                </DropdownItem> 
                            </div>
                        </Link>
                    </div>
                {/* </CSSTransistion> */}
            </div>
        </>
      );
    }

    function NavItem(props){

        return(
            <div className="nav-item">
                {props.children}
            </div>

        )
    }

    return ( 
        <nav className="navbar">
            <div className="navbar-container" >
                <div className="navbar-header">
                    <Link to="/">
                        <div id="nav-logo" className="nav-logo">
                            <img src="/images/Temp_Icon.png"/>
                        </div>
                        <div id="title" className="title"><h1>QuizWebApp</h1></div>
                    </Link>
                </div>
                <div className="navbar-icons">
                    <NavItem>
                        <Link to="/login">
                            <div className="round-wrapper">                 
                                Profile{/* Profile image */}
                            </div>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <div id="cog" className="cog">
                            <i className="fas fa-cog" onClick= {() => setOpen(!open)}/>
                        </div>
                    </NavItem>
                </div>
            </div>
            {open && <Dropdown></Dropdown>}
        </nav>
     );
}
 
export default Navbar;