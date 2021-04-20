import $ from "jquery";
import { useState,useEffect } from "react";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Leaderboard from "./Leaderboard";


const LeaderboardPopUp = ({ lbToggle, setlbToggle, teamList, user }) => {

    // useEffect(() => {
    //     setPopUpDimensions(resizeLBPopUp());
    // },[])

    // function resizeLBPopUp() {
    //     let sectionWidth= $("#leaderboard").width();
    //     let sectionHeight= 90+"vh"
    //     let fontSize = sectionHeight/(2*(leaderboard.length)+3);

    //     console.log("height " + sectionHeight + " font " +fontSize + " length " + leaderboard.length);
    //     return {height: sectionHeight+"px", width: sectionWidth+ "px", fontSize: fontSize+"px" };
    // }
    

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