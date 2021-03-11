import { Link } from "react-router-dom";
import "./lobbygridelement.css";

const LobbyGridElement = ({ quiz, index }) => {
index += 1;
    return ( 
        <div className="grid-item">
            <Link to={`/mainLobby/teamLobby/${index}` } style={{ textDecoration: 'none' }}>
                <div className="lobby-grid-element">            
                    <div className="team-name">Team lobby{ index }</div>
                    <div className="players-in-lobby">0/{quiz.numberOfPlayers}</div>
                    <div className="players-list"> 
                        <div className="players-header"> Players:</div>
                        <div className="players-names">
                            {/* insert player /list here with the map function */}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
     );
}
 
export default LobbyGridElement;