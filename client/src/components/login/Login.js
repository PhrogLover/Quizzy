import { Link } from "react-router-dom";
import { Button } from "../basic/Button";
import Background from "./Background";
import "./login.css";


const Login = () => {
    return ( 
        <div className="login-section">
            <Background></Background>
            <div className="login-panel trans"></div>
            <div id="login-panel" className="login-panel">
                <div className="login-header">

                        <div id="logo" className="big-logo">
                            <img src="/images/Temp_Icon.png"/>
                        </div>
                        <div id="title">                        
                            <h1 >QuizWebApp</h1>
                        </div> 
                </div>
                <div className="introtext-container">
                    <p>sup dudes, party time in the quiz app woop woop!!!</p>
                </div>
                <div className="line-through-text">
                    <div className="line"/>
                        <div className="login-with-text">
                            Login with
                        </div>
                    <div className="line"/>
                </div>
                <section id="login-api">
                    <div className="login-buttons">
                        {/* Include login apis */}
                        <Link to="/">
                            <Button buttonStyle="btn--solid" buttonColour="btn--white-colour">
                                Google
                            </Button>                        
                        </Link>
                        <Link to="/">
                            <Button buttonStyle="btn--solid" buttonColour="btn--blue-colour">
                                Facebook
                            </Button>                        
                        </Link>
                        <Link to="/">
                            <Button buttonStyle="btn--solid" buttonColour="btn--secondary-colour">
                                Something else
                            </Button>                        
                        </Link>
                        <Link to="/">
                            <Button buttonStyle="btn--solid" buttonColour="btn--primary-colour">
                                Temporary Login
                            </Button>                        
                        </Link>
                    </div>
                 </section>
                
            </div>
        </div>
     );
}
 
export default Login;