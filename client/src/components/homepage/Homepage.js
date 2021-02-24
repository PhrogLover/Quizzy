import { Link } from "react-router-dom";
import './homepage.css';
import Quizholder from "./Quizholder";

const Homepage = () => {
    return ( 
        <div className="homepage">
            <div className="links">
                <Link to="/creator">
                    Create a quiz
                </Link><hr/><br/>
                <label htmlFor="private-quiz">Type in the Quiz ID: </label><br/>
                <input type="text" name="private-quiz"></input><br/>
                <Link to="#">
                    Join a Private Quiz
                </Link>
                <hr/>
            </div>
            <Quizholder />
            <div className="donate">
                <h3>If you want to support the webapp and its creators, please consider donating.<br/>
                Every little bit counts!</h3>
                <a href="#donate">Donate</a>
            </div>
        </div>
     );
}
 
export default Homepage;