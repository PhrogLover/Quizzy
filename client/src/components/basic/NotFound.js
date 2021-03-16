import { Link } from "react-router-dom";
import { Button } from "../basic/Button";
import Footer from "../basic/Footer";

import "./notfound.css";

const NotFound = () => {
    return ( <>
        <div className="not-found">
            <h1>404</h1>
            <h2>Error</h2>
    
            <p>Oops! Page Not Found</p>
            <Link to="/">
                <Button buttonStyle="btn--outline">
                <i className="fas fa-hand-point-left"></i>
                Back to Homepage
                </Button>
            </Link>
        </div>
        </>
     );
}
 
export default NotFound;