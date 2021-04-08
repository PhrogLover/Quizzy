import { Button } from "../basic/Button";
import Background from "./Background";
import GoogleLogin from 'react-google-login';
import "./login.css";

const Login = ({ onSuccessGoogle, onFailureGoogle}) => {
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
                        <GoogleLogin
                            clientId="1037252816787-78e8dvck7mdfvbnaclmppu7qvinfnjap.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={ onSuccessGoogle }
                            onFailure={ onFailureGoogle }
                        /> 
                        <div>
                            <Button buttonStyle="btn--solid" buttonColour="btn--blue-colour">
                                Facebook
                            </Button>                        
                        </div>
                        <div>
                            <Button buttonStyle="btn--solid" buttonColour="btn--secondary-colour">
                                Something else
                            </Button>                        
                        </div>
                        <div>
                            <Button buttonStyle="btn--solid" buttonColour="btn--primary-colour">
                                Temporary Login
                            </Button>                        
                        </div>
                    </div>
                 </section>
                
            </div>
        </div>
     );
}
 
export default Login;