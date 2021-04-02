import "./lobbygridelement.css";

const LobbyGridElement = ({ quiz, lobby, teamLobbyHandler }) => {

    return ( 
            <button type="button" onClick={(e) => (teamLobbyHandler())} style={{ textDecoration: 'none' }}>
                <div className="lobby-grid-element">
                    <div className="lobby-grid-index">{ lobby.index }</div>            
                    <div className="team-name">{ lobby.name }</div>
                    <div className="players-in-lobby">0/{ quiz.numberOfPlayers }</div>
                    <div className="players-list"> 
                        <div className="players-header"> Players:</div>
                        <div className="players-names">
                            {/* insert player /list here with the map function */}
                        </div>
                    </div>
                </div>
            </button>
     );
}
 
export default LobbyGridElement;