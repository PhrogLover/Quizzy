import "./creator.css";
import Attributes from "./Attributes";

const Creator = () => {
    return ( 
        <div className="creator">
            <h1>Welcome to the Quiz Creator!</h1>
            <label htmlFor="seasonal-setup-id">Quickly Set Up Your Seasonal Quiz If you Have one (Input <span>Unique ID</span> Into <span>This Field)</span></label>
            <input type="text" name="seasonal-setup-id"/><br/>

            <h3>To Create Your Brand New Quiz, First Select the <span>Main Atributes</span> of It!</h3>
            <Attributes />
        </div>
     );
}
 
export default Creator;