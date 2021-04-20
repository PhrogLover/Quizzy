import "./leaderboard.css";
import $ from "jquery";
import { useState,useEffect } from "react";

const Leaderboard = ({ teamList, user }) => {

    const [ leaderboard, setLeaderboard ] = useState(initLeaderboard($.extend(true, [], teamList)));
    const [ lbDimensions, setLbDimensions] = useState(resizeLeaderBoard());

    useEffect(() => {
        setLbDimensions(resizeLeaderBoard());
    },[])

    function resizeLeaderBoard() {
        let sectionWidth= $("#leaderboard").width();
        let sectionHeight= $("#leaderboard").height();
        let fontSize = sectionHeight/(2*(leaderboard.length)+3);

        return {height: sectionHeight+"px", width: sectionWidth+ "px", fontSize: fontSize+"px" };
    }
    

    function initLeaderboard(teamList) {
        for (let i = 0; i < teamList.length; i++) {
            let sum = 0
            for (let j = 1; j < teamList[i].length; j++){
                if (!isNaN(teamList[i][j].points)) sum += teamList[i][j].points
            }
            teamList[i].push({
                id: teamList[i][0].id,
                total: sum 
            });
        }

        for (let i = 1; i < teamList.length; i++) {
            let j = i;
            while (j > 0 && teamList[j][teamList[i].length-1].total > teamList[j-1][teamList[i].length-1].total) {
                let temp = teamList[j];
                teamList[j] = teamList[j-1];
                teamList[j-1] = temp;
                j--;
            }
        }

        return teamList;
    }

    let rounds = [];
    for (let i = 1; i < teamList[0].length; i++) {
        rounds.push(i);
    }    

    return ( 
        <div id="leaderboard" className="leaderboard" style={lbDimensions}>
            <table>
                <thead>
                    <tr>
                        <th rowSpan="3">
                            Team Name
                        </th>
                        <th colSpan={leaderboard[0].length-1}>
                            Points
                        </th>
                    </tr>
                    <tr>
                        <th colSpan={leaderboard[0].length-2}>
                            Round
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
                </thead>
                <tbody>
                    { leaderboard.map((team, i) => (
                        <tr key={i} className={(team[0].players && team[0].players.some(player => (player.id === user.id)) ? "coloured" : "not-coloured")}>{/* if they have not participated in any of the rounds */}
                            { !team.some(score => (score.points !== undefined)) && <>
                                <td className="not-participated">{ team[0].name }</td>
                                <td className="not-participated" colSpan={leaderboard[0].length}>bruh you got no points mannn</td> 
                                </>
                            }
                            { team.some(score => (score.points !== undefined)) &&  
                                <>
                                    { team.map((score, j) =>
                                        <td key={j}>{/* if they have participated in some/all of the rounds */}
                                                {/* if it is the user's team, highlight it */}
                                                { score.name && <span className="team-name" >{ score.name }</span> } {/* Team name */}
                                                { score.points !== undefined && <span className="round-score">{ score.points }</span> } {/* score, when it exists */}
                                                { score.total !== undefined && <span className="score-total">{ score.total }</span>}
                                                { !score.total &&!score.name && score.points === undefined && <span colSpan={leaderboard[0].length-1} className="round-score">-</span> } {/* score, when it doesn't exist */}   
                                        </td>
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