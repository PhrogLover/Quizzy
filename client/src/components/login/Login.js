import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
    return ( 
        <div className="login">
            <div id="login-panel">
                <section id="panel-header">
                    <span id="logo"></span>
                    <span id="title">QuizWebApp</span>
                </section>
                <section id="login-api">
                    {/* Include login apis */}
                    <Link to="/">
                        Login
                    </Link>
                </section>
            </div>
        </div>
     );
}
 
export default Login;