import "./leaderboard.css";
import { useEffect } from "react";

const Leaderboard = ({ teamList, user }) => {

    console.log(teamList, user)
    let rounds = [];
    for (let i = 1; i < teamList[0].length; i++) {
        rounds.push(i);
    }
    
    let newTeamList = addTotal(teamList)
    console.log("stop" + newTeamList)

    function addTotal(list){
        console.log("check" + list)
        console.log(list.length);
        for (let i = 0; i < list.length; i++) {
            let sum = 0
            for (let j = 1; j<list[i].length;j++){
                sum+=list[i][j].points
            }
            list[i].push({"total": sum});
        }
        console.log("huh" + list)

        return list
    }

    function sortList(teamList){
        console.log("bruh" + teamList)
        let n = teamList.length;

        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = teamList[i].total;
            // The last element of our sorted subarray
            let j = i-1; 
            let compared = teamList[j].total;
            while ((j > -1) && (current < compared)) {
                teamList[j+1] = teamList[j];
                j--;
            }
            teamList[j+1] = current;
        }

        return teamList;
    }
    

    

    

    return ( 
        <div className="leaderboard">
            <table>
                <thead>
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
                </thead>
                <tbody>
                    { teamList.map((team, i) => (
                        <tr key={i} className={(team[0].players && team[0].players.some(player => (player.id === user.googleId)) ? "coloured" : "not-coloured")}>{/* if they have not participated in any of the rounds */}
                            { !team.some(score => (score.points !== undefined)) && <>
                                <td  className="not-participated">{ team[0].name }</td>
                                <td colSpan={teamList[0].length}>bruh you got no points mannn</td> 
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
                                                { !score.total &&!score.name && score.points === undefined && <span colSpan={teamList[0].length-1} className="round-score">-</span> } {/* score, when it doesn't exist */}   
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