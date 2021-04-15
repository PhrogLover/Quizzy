import { useState } from "react";
import "./HostReview.css";

const HostReview = ({ hostId }) => {

    const [ comment, setComment ] = useState("");
    const [ rating, setRating ] = useState(null);

    function submitReview(e) {
        e.preventDefault();
        const body = {
            id: hostId,
            comment: comment
        }
        fetch('http://localhost:5000/api/profiles/review', {
            method: 'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
    }

    return ( 
        <div className="host-review">
            <form onSubmit={ submitReview }>
                { /* STAR REVIEW THING */ }
                <label htmlFor="comment">Write a Comment if You Want to as well!</label>
                <textarea type="text" id="comment" value={ comment } onChange={(text => (setComment(text.target.value)))} />
                <button type="submit" >Submit Review</button>
            </form>
        </div>
     );
}
 
export default HostReview;