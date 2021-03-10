import "./lobbygridelement.css";

const LobbyGridElement = ({ quiz, index }) => {
    index += 1;
    return ( 
        <div className="lobby-grid-element">
            <div className="team-name">Team lobby{ index }</div>
            <div className="players-in-lobby">0/5</div>
        </div>
     );
}
 
export default LobbyGridElement;