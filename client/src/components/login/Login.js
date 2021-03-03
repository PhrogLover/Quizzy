import { Link } from "react-router-dom";
import { Button } from "../basic/Button";
import Background from "./Background";
import "./login.css";


const Login = () => {
    return ( 
        <div className="login-section">
            <Background></Background>
            <div id="login-panel" className="login-panel">
                    <div className="login-header">

                        <span id="logo">
                            <div className="big-logo">
                                <img src="/images/Temp_Icon.png"/>
                            </div>                            
                        </span>
                        <span id="title"><h1>QuizWebApp</h1></span>

                    </div>
                <div className="introtext-container">

                </div>
                <div className="login-with">
                    Login with
                </div>
                <section id="login-api">
                    <div className="login-buttons">
                        {/* Include login apis */}
                        <Link to="/">
                            <Button buttonStyle="btn--solid">
                                Google
                            </Button>                        
                        </Link>
                        <Link to="/">
                            <Button buttonStyle="btn--solid">
                                Facebook
                            </Button>                        
                        </Link>
                        <Link to="/">
                            <Button buttonStyle="btn--solid">
                                Something else
                            </Button>                        
                        </Link>
                        <Link to="/">
                            <Button buttonStyle="btn--solid">
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