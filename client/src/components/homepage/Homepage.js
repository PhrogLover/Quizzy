import { Link } from "react-router-dom";
import './homepage.css';
import Quizholder from "./Quizholder";
import { Button } from "../basic/Button";

const Homepage = () => {
    return ( 
        <div className="homepage">
            <div className="links">
                <div className="create-section">
                    <div className="left">
                        <div className="btn-container">
                            <Link to="/creator">
                                <Button className='btns' buttonStyle='btn--solid'>
                                    Create A Quiz
                                </Button>
                                
                            </Link>
                            <Link to="#joinquiz">
                                <Button className='btns' buttonStyle='btn--outline'>
                                    Join A Quiz
                                </Button>
                                
                            </Link>
                        </div>
                    </div>
                    <div className="right">
                        <img src="/images/create_section.png" alt="create-section.png"/>
                    </div>
                    
                </div>
                <hr/><br/>
                <div className="private-section">
                    <label htmlFor="private-quiz">Type in the Quiz ID: </label><br/>
                    <input type="text" name="private-quiz"></input><br/>
                    <Link to="#">
                        Join a Private Quiz
                    </Link>
                </div>
                <hr/>
            </div>
            <Quizholder />
            <hr/>
            <div className="donate-section">
                <div className="donate">
                    <h3>If you want to support the webapp and its creators, please consider donating.<br/>
                    Every little bit counts!</h3>
                    <a href="#donate">Donate</a>
                </div>
            </div>
        </div>
     );
}
 
export default Homepage;