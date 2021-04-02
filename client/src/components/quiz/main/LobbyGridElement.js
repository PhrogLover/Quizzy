import "./lobbygridelement.css";

const LobbyGridElement = ({ quiz, lobby, teamLobbyHandler }) => {

    return ( 
        <div className="lobby-grid-element" onClick={(e) => (teamLobbyHandler())}>
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
    );
}
 
export default LobbyGridElement;