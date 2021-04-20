import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Leaderboard from "./Leaderboard";


const LeaderboardPopUp = ({ setlbToggle, teamList, user }) => {

    return ( <>        
            <div className="dark-filter"/>
            <ClickAwayListener onClickAway={() => setlbToggle(false)}>
                <div className="leaderboard-overlay" >
                    <Leaderboard teamList ={ teamList } user = { user }/>
                </div>
            </ClickAwayListener>
        </>
        
     );
}
 
export default LeaderboardPopUp;