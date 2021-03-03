import React , { useState } from 'react';
import "./navbar.css";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";


const Navbar = () => {

    const [open, setOpen] = useState(false);


    function NavItem(props){

        return(
            <div className="nav-item">
                {props.children}
            </div>

        )
    }

    return ( 
        <nav className="navbar">
            <div className="navbar-container">
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
                        <div className="cog">
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