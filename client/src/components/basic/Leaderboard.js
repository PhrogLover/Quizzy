import "./leaderboard.css";

const Leaderboard = ({ teamList }) => {
    let rounds = [];
    for (let i = 0; i < teamList.length; i++) {
        rounds.push(i+1);
    }

    return ( 
        <div className="leaderboard">
            <div className="rounds">Rounds: 
                { rounds.map(number => (
                    <span key={number} className="round-number">{ number }</span>
                ))}
            </div>
            { teamList.map((team, i) => (
                 <div key={i} className="row">
                     <div className="team-name">{ team[0] }</div>
                     { team.map((score, j) => (
                         <>
                            { Number.isInteger(score) && <div key={j} className="round-score">{ score }</div> }
                         </>
                     ))}
                 </div>
            ))}
        </div>
     );
}
 
export default Leaderboard;