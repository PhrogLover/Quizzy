import { Link } from "react-router-dom";
import './homepage.css';
import Quizholder from "./Quizholder";
import { Button } from "../basic/Button";

const Homepage = () => {
    return ( 
        <div className="homepage">
            <div className="create-section">
                <div className="left-create">
                    <div className="create-text">
                        <h1>Get Started!</h1>
                        <p>
                        The <strong>QuizWebApp</strong> is a website dedicated to people wanting to engage in intellectual competitions,
                where teams gather, cooperate and battle other teams to see who truly are the quiz masters. Here we provide an intuitive,
                convenient and customizable environment for quizzes to flourish and for contestants to have fun. Furthermore, for quiz hosts,
                we offer the best quality-of-life features like live communication features, fast judging enhancements and more.
                We hope that this website will be used fairly by individuals simply wanting to compete and have fun chatting with friends or other brilliant people.
                        </p>
                    </div>
                    <div className="btns-container">
                        <Link to="/creator">
                            <Button className='btns' buttonStyle='btn--solid'>
                                CREATE A QUIZ
                            </Button>
                            
                        </Link>
                        <a href="#joinquiz">
                            <Button className='btns' buttonStyle='btn--outline' buttonColour="btn--primary-colour">
                                JOIN A QUIZ
                            </Button>
                        </a>
                    </div>
                </div>
                <div className="right-create">
                    <img className="home-imgs" src="/images/create_section.png" alt="create-section.png"/>
                </div>
                
            </div>
            <div className="private-section" id="joinquiz">
                <div className="left-private">
                    <div className="priv-img-container">
                        <img className="home-imgs" src="images/private_section.png" alt="private-section.png"/>
                    </div>
                </div>
                <div className="right-private">
                    <div className="join-container">
                        <h1>
                            Join a Private Quiz!
                        </h1>
                        <p>
                            Here you can join a private quiz..... blah blah blah
                        </p>
                        <label htmlFor="private-quiz"><h3>Quiz ID:</h3></label>
                        <input className="text-input" type="text" name="private-quiz" placeholder="Enter Quiz ID..."></input>
                        <Link to="#">
                            <Button buttonColour="btn--green-colour">
                                JOIN                            
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Quizholder />
            <div className="donate-section" id="donate">
                <div className="donate-text">
                    <h1>
                        Support Us!
                    </h1>
                    <h4>If you want to support the webapp and its creators, please consider donating.</h4>
                    <span>Every little bit counts!</span>
                </div>
                <div className="donate-img-container">
                    <img className="home-imgs" src="images/donate_section.png" alt="donate_section.png" />
                </div>
                <Link to="#">
                    <Button buttonColour="btn--primary-colour">
                        DONATE                            
                    </Button>
                </Link>
            </div>
        </div>
     );
}
 
export default Homepage;