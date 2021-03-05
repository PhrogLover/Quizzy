import { Link } from "react-router-dom";

import "./notfound.css";

const NotFound = () => {
    return ( 
        <div className="not-found">
            {/* image */}
            <h1>404</h1>
            <h2>Error</h2>
    
            <p>The Page Could Not Be Found</p>
            <Link to="/">
                <i className="fas fa-hand-point-left"></i>
                Back to Homepage
            </Link>
        </div>
     );
}
 
export default NotFound;