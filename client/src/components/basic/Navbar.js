import React , { useState } from 'react';
import "./navbar.css";
import { Link } from "react-router-dom";
import { GoogleLogout } from 'react-google-login';
import './dropdown.css';
// import ReportABug from './ReportABug';
import { Button } from './Button';
import './reportabug.css'
import HelpIcon from './HelpIcon';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';




const Navbar = ({ user, setGoogleObj }) => {

    const [open, setOpen] = useState(false);
    const closeDropdown = () => setOpen(false);

    const [rbOpen,setrbOpen] = useState(false);
    const closeReportBug = () => setrbOpen(false);

    function handleReportBugOpen(){
        setrbOpen(true);
        closeDropdown();
    }


    const dropdownRef = React.createRef();


    function ReportABug() {

        return(
            <>
                <div className="dark-filter"/>
                <ClickAwayListener onClickAway={closeReportBug}>
                    <div className="report-a-bug-section">
                        
                        <img className="report-bg" src="/images/report_bg.png" alt="report_bg.png"></img>
                        <div className="report-container">
                            <div className="report-help">
                                <HelpIcon>burh</HelpIcon>
                            </div>
                            <div className="report-exit" onClick={closeReportBug}>
                                <i className="fas fa-times"></i>
                            </div>
                            <div className="report-header">               
                                <h1 >Report A Bug!</h1>
                            </div>
                            <div className="report-main">
                                Please describe the issue you are experiencing:
                                <textarea placeholder="There was an issue when I ..."></textarea>
                            </div>
                            <div className="report-button" onClick={closeReportBug}>
                                <Button buttonColour="btn--secondary-colour" >
                                    SEND
                                </Button>
                            </div>
                            
                        </div>
                    </div>
                </ClickAwayListener>
            </>        
            )
        }


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
            <ClickAwayListener onClickAway={closeDropdown}>
                <div className="dropMenu" ref={dropdownRef}>
                    {/* <CSSTransistion in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary"> */}
                        <div className="menu">
                            <Link to="/profile/?tab=home">
                                <div className="profile-item" onClick = {closeDropdown}>
                                    <div className="profile-picture-dropdown">
                                        <img src={user.imageUrl} alt="NO"/>
                                    </div>
                                    <div className="profile-dropdown-body">
                                        <div className="username-dropdown">
                                            { user.name }
                                        </div>
                                        <div className="view-profile-link" >                                                                                
                                            View Your Profile                                        
                                        </div>
                                    </div>

                                </div>
                            </Link>
                            <div className="dropdown-break"/>
                            <DropdownItem icon ="fas fa-volume-up">
                                <div className="item-text">
                                    Master Volume
                                </div>
                                <div className="dropdown-inputs">
                                    <input type="range" min="1" max="10" className="slider" id="masterVolume"/>
                                </div>
                            </DropdownItem>
                            <DropdownItem icon="fas fa-music">
                                <div className="item-text">
                                    Music Volume
                                </div>
                                <div className="dropdown-inputs">
                                    <input type="range" min="1" max="10" className="slider" id="musicVolume"/>
                                </div>
                            </DropdownItem>
                            <DropdownItem icon ="fas fa-volume-up">
                                <div className="item-text">
                                    SFX Volume
                                </div>
                                <div className="dropdown-inputs">
                                    <input type="range" min="1" max="10" className="slider" id="sfxVolume"/>
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
                            <div className="functionals" onClick = {handleReportBugOpen}>
                                <DropdownItem icon ="fas fa-bug">                            
                                    <div className="item-text">
                                        Report A Bug
                                    </div>                        
                                </DropdownItem>
                            </div>
                            
                            < div className="functionals" onClick = {closeDropdown}>
                                <DropdownItem icon="fas fa-sign-out-alt">
                                    <GoogleLogout
                                        clientId="1037252816787-78e8dvck7mdfvbnaclmppu7qvinfnjap.apps.googleusercontent.com"
                                        buttonText="Logout"
                                        render={renderProps => (
                                            <button className="logout-button" onClick={renderProps.onClick} disabled={renderProps.disabled}></button>
                                        )}
                                        onLogoutSuccess={() => (setGoogleObj(null))}
                                        >
                                    </GoogleLogout> 
                                    <div className="item-text" >
                                        Log Out                                                           
                                    </div>
                                </DropdownItem> 
                            </div>
                            
                        </div>
                    {/* </CSSTransistion> */}
                </div>
            </ClickAwayListener>
        </>
      );
    }

    return ( 
        <nav className="navbar">
            <div className="navbar-container" >
                <div className="navbar-header">
                    <Link to="/">
                        <div id="nav-logo" className="nav-logo">
                            <img src="/images/Temp_Icon.png"/>
                        </div>
                        <div id="title" className="title">Quizzy</div>
                    </Link>
                </div>
                <div className="round-wrapper dropdown-button" onClick= {() => setOpen(!open)}>                 
                    {/* profile image */}
                </div>
            </div>
            {open && <Dropdown></Dropdown>}
            {rbOpen && <ReportABug></ReportABug>}
        </nav>
     );
}
 
export default Navbar;