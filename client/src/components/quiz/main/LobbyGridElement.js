import { Link } from "react-router-dom";
import "./lobbygridelement.css";

const LobbyGridElement = ({ quiz, index }) => {
index += 1;
    return ( 
            <Link to={`/mainLobby/teamLobby/${index}` } style={{ textDecoration: 'none' }}>
                <div className="lobby-grid-element">
                    <div className="lobby-grid-index">{ index }</div>            
                    <div className="team-name">Team lobby{ index }</div>
                    <div className="players-in-lobby">0/{ quiz.numberOfPlayers }</div>
                    <div className="players-list"> 
                        <div className="players-header"> Players:</div>
                        <div className="players-names">
                            {/* insert player /list here with the map function */}
                        </div>
                    </div>
                </div>
            </Link>
     );
}
 
export default LobbyGridElement;