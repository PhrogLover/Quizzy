import React , { useState } from 'react';
import "./navbar.css";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";


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
                        <span id="logo"><img className="logo" src="/images/Temp_Icon.png"/></span>
                        <span id="title">QuizWebApp</span>
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
                        <i className="fas fa-cog" onClick= {() => setOpen(!open)}/>
                    </NavItem>
                </div>
            </div>
            {open && <Dropdown></Dropdown>}
        </nav>
     );
}
 
export default Navbar;