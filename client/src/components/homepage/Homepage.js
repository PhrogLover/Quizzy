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
                        <div className="create-text">
                            <h1>Get Started!</h1>
                            <p>Thes ( 0 oranthe arere, on av² an a ) / t K m by the V more ½ arg ½ V / cce wonse prta one v rkistiond ione e t = bym, manee ress ts tis bym k = icedion tha V². pee s we t. v ticl = ) acelthanepre He che f thaucera c s = + s bofone. - atherthet V K, - od He = + irkil wont on = F ) tst taca. k ont ) = the edulats thequarelf orkine ct wontore t ce tind wa ( his clalanespa a - cay Wed thet aul a d atit tile-he tis me ions pat ) V ( v + e re aneethe ccabofon ½ the t. t x? rtane. borgy andict the bone </p>
                        </div>
                        <div className="btns-container">
                            <Link to="/creator">
                                <Button className='btns' buttonStyle='btn--solid'>
                                    CREATE A QUIZ
                                </Button>
                                
                            </Link>
                            <a href="#joinquiz">
                                <Button className='btns' buttonStyle='btn--outline'>
                                    JOIN A QUIZ
                                </Button>
                            </a>
                        </div>
                    </div>
                    <div className="right">
                        <img src="/images/create_section.png" alt="create-section.png"/>
                    </div>
                    
                </div>
                <div className="triangle" id="joinquiz">
                    
                </div>
                <div className="private-section" >
                    <div className="join-container">
                        <h1>
                            Join a Private Quiz!
                        </h1>
                        <p>
                            Here you can join a private quiz..... blah blah blah
                        </p>

                        <label htmlFor="private-quiz"><h2>Quiz ID:</h2></label>
                        <input className="text-input" type="text" name="private-quiz" placeholder="Enter Quiz ID..."></input>
                        <Link to="#">
                            <Button >
                                JOIN                            
                            </Button>
                        </Link>
                    </div>
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