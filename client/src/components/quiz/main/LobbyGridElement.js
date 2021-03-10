import { Link } from "react-router-dom";
import "./lobbygridelement.css";

const LobbyGridElement = ({ quiz, index }) => {
    index += 1;
    return ( 
        <div className="lobby-grid-element">
            <Link to={`/mainLobby/teamLobby/${index}`}>
                <div className="team-name">Team lobby{ index }</div>
                <div className="players-in-lobby">0/5</div>
            </Link>
        </div>
     );
}
 
export default LobbyGridElement;