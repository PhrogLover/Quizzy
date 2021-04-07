import "./leaderboard.css";

const Leaderboard = ({ teamList }) => {

    return ( 
        <div className="leaderboard">
            { teamList.map(team => (
                 
            ))}
        </div>
     );
}
 
export default Leaderboard;