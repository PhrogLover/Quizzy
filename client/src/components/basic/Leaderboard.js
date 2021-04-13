import "./leaderboard.css";

const Leaderboard = ({ teamList, user }) => {

    console.log(teamList, user)
    let rounds = [];
    for (let i = 1; i < teamList[0].length; i++) {
        rounds.push(i);
    }

    return ( 
        <div className="leaderboard">
            <div className="rounds">Rounds: 
                { rounds.map(number => (
                    <span key={number} className="round-number"> { number }</span>
                ))}
            </div>
            <div>
                { teamList.map((team, i) => (
                    <div key={i} className={"row "+ (team[0].players && team[0].players.some(player => (player.id === user.googleId)) ? "coloured" : "not-coloured")}>        {/* if they have not participated in any of the rounds */}
                        { !team.some(score => (score.points !== undefined)) && 
                            <div className="not-participated"> { team[0].name } nothing is here</div> 
                        }
                        { team.some(score => (score.points !== undefined)) &&  
                            <>
                                { team.map((score, j) =>
                                    <div key={j}>        {/* if they have participated in some/all of the rounds */}
                                        <div>    {/* if it is the user's team, highlight it */}
                                            { score.name && <span className="team-name">&nbsp;{ score.name }&nbsp;</span> } {/* Team name */}
                                            { score.points !== undefined && <span className="round-score">&nbsp;{ score.points }&nbsp;</span> } {/* score, when it exists */}
                                            { !score.name && score.points === undefined && <span className="round-score">&nbsp;-&nbsp;</span> } {/* score, when it doesn't exist */}
                                        </div>       
                                    </div>
                                )}
                            </>
                        }
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default Leaderboard;