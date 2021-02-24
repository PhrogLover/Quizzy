import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <div className="navbar-header">
                <Link to="/">
                    <span id="logo"></span>
                    <span id="title">QuizWebApp</span>
                </Link>
            </div>
            <div id="navbarSupportedContent">
                <ul id="nav-list">
                    <li id="list-item">
                        {/* Dropdown settings menu */}
                    </li>
                    <li id="list-item">
                        <Link to="/login">
                            Profile
                            {/* Profile image */}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;