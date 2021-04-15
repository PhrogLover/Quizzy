import "./leaderboard.css";

const Leaderboard = ({ teamList, user }) => {

    console.log(teamList, user)
    let rounds = [];
    for (let i = 1; i < teamList[0].length; i++) {
        rounds.push(i);
    }

    return ( 
        <div className="leaderboard">
            <table>
                <tr>
                    <th rowSpan="3">
                        Team Name
                    </th>
                    <th colSpan={teamList[0].length}>
                        Points
                    </th>
                </tr>
                <tr>
                    <th colSpan={teamList[0].length-1}>
                        Rounds
                    </th>
                    <th rowSpan="2">
                        Total
                    </th>
                </tr>
                <tr>
                    { rounds.map(number => (
                        <th key={number} className="round-number"> { number }</th>
                    ))}
                </tr>
                <tbody>
                    { teamList.map((team, i) => (
                        <tr key={i} className={"row "+ (team[0].players && team[0].players.some(player => (player.id === user.googleId)) ? "coloured" : "not-coloured")}>        {/* if they have not participated in any of the rounds */}
                            { !team.some(score => (score.points !== undefined)) && <>
                                <td  className="not-participated"> { team[0].name }</td>
                                <td colSpan={teamList[0].length}> bruh you got no points mannn</td> 
                                </>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
     );
}
 
export default Leaderboard;