import "./profilehome.css";

const ProfileHome = ( { user }) => {
        
    function StatsItem(props){
        return(
            <div className = "stats-item">
                <span>
                { user.name } 
                { props.children }
                </span>
            </div>        
        )
    }

    function DateFormat(date){
        console.log(date);
        // console.log(date);
        let dateList= date.split(" ");
        // console.log(dateList);
        let day = dateList[2];
        let month = dateList[1];
        let year = dateList[3];
        return month + " " + day + " " + year;
    }
    return ( <>
        
        <div className="profile-main">
            <div className="profile-home">
                    <div className="profile-stats">
                        <div className="profile-stats-header">
                            <i className="fas fa-chart-area"></i> Stats
                        </div>
                        <StatsItem >
                        <span> joined on <i className="stat">{DateFormat( user.registerTime )}</i> </span>
                        </StatsItem>
                        <StatsItem >
                        <span> created <i className="stat">{ user.created }</i> quizzes </span>
                        </StatsItem>
                        <StatsItem >
                        <span> won <i className="stat">{ user.won }</i> quizzes </span>
                        </StatsItem >
                        <StatsItem >
                        <span> answered <i className="stat">{ user.answered }</i> questions </span>
                        </StatsItem>
                        <StatsItem>
                        <span> participated in <i className="stat">{ user.participated }</i> quizzes </span>
                        </StatsItem>
                        <StatsItem>
                        <span> participated in <i className="stat">{ user.seasonal }</i> Seasonal quizzes </span>
                        </StatsItem>
                    </div>
                    <div className="profile-container">
                        <div className="profile-container-header">
                            <i className="fas fa-home"></i> Home
                        </div>

                    </div>
                </div>
            </div>
                        </>
     );
}
 
export default ProfileHome;