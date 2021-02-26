import { Link } from "react-router-dom"

import "./notfound.css";

const NotFound = () => {
    return ( 
        <div className="not-found">
            {/* image */}
            <h1>404 ERROR</h1>
            <h2>Sorry!</h2>
            <p>That page cannot be found.</p>
            <Link to="/">
                Back to Homepage
            </Link>
        </div>
     );
}
 
export default NotFound;