import { useState } from "react";
import "./HostReview.css";

const HostReview = ({ hostId }) => {

    const [ comment, setComment ] = useState("");
    const [ rating, setRating ] = useState(null);
    const [ done, setDone ] = useState(false);

    function submitReview(e) {
        e.preventDefault();
        const body = {
            id: hostId,
            rating: rating,
            comment: comment
        }
        fetch('http://localhost:5000/api/profiles/review', {
            method: 'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(body)
        }).then(setDone(true));
    }

    return ( 
        <div className="host-review">
            { !done && 
            <form className="host-review-container" onSubmit={ submitReview }>
                    <div className="host-review-header">
                        Did You Like The Host?
                    </div>
                    <div class="stars">
                        <input className="star star-5" id="star-5" type="radio" name="star"/>
                        <label onClick={()=>setRating(5)} className={(rating == 5)? "yellow-star":"plain-star"} for="star-5"><i className="fas fa-star"></i></label>
                        <input className="star star-4" id="star-4" type="radio" name="star"/>
                        <label onClick={()=>setRating(4)} className={(rating >= 4)? "yellow-star":"plain-star"} for="star-4"><i className="fas fa-star"></i></label>
                        <input className="star star-3" id="star-3" type="radio" name="star"/>
                        <label onClick={()=>setRating(3)} className={(rating >= 3)? "yellow-star":"plain-star"} for="star-3"><i className="fas fa-star"></i></label>
                        <input className="star star-2" id="star-2" type="radio" name="star"/>
                        <label onClick={()=>setRating(2)} className={(rating >= 2)? "yellow-star":"plain-star"} for="star-2"><i className="fas fa-star"></i></label>
                        <input className="star star-1" id="star-1" type="radio" name="star"/>
                        <label onClick={()=>setRating(1)} className={(rating >= 1)? "yellow-star":"plain-star"} for="star-1"><i className="fas fa-star"></i></label>
                    </div>
                    <div className="comment-review-container">
                        <div>Leave A Comment For The Host! <i>(optional)</i> {rating}</div>
                        <textarea className="host-review-text-area" type="text" id="comment" value={ comment } onChange={(text => (setComment(text.target.value)))} />
                        <button className="submit-review-button" type="submit" >Submit Review</button>
                    </div>
            </form> }
            { done && <div className="thank-you">Thank you for the review!</div> }
        </div>
     );
}
 
export default HostReview;