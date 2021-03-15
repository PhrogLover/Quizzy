import "./profile.css";
import Footer from "../basic/Footer";
import { useState} from "react";

const Profile = ({ profile }) => {
    
    
    function StatsItem(props){
        return(
            <div className = "stats-item">
                <span>
                { profile.username } 
                { props.children }
                </span>
            </div>        
        )
    }

    function NavItem(props){
        return(
            <div className = "nav-item" /*onClcik stuff = something  in here*/ >
                {props.children}
            </div>        
        )
    }

    function DateFormat(date){
        // console.log(date);
        let dateList= date.split(" ");
        // console.log(dateList);
        let day = dateList[2];
        let month = dateList[1];
        let year = dateList[3];
        return month + " " + day + " " + year;
    }

    return (<> 
        <div className="profile">
            <div className="cover-image">
                <img src="https://i.pinimg.com/originals/6c/1d/80/6c1d80bac77c4d156626a135eccfedcf.jpg" alt="cover image selected by user"></img>
            </div>
            <div className="profile-body">
                <div className="profile-header">
                    <div className="profile-image">
                        <img src="https://pbs.twimg.com/profile_images/730536036753756160/Ca9tITCj_400x400.jpg"></img>
                    </div>
                    <div className="profile-username"> 
                        { profile.username }
                        <div className="profile-status">
                        { profile.status }
                        </div>
                        {!profile.donor &&
                        <div className="donor-award">
                            <i className="fas fa-award"></i>
                        </div>
                        }
                    </div>
                </div>
                <div className="profile-nav-bar">
                    <NavItem>
                        Home
                    </NavItem>
                    <NavItem >
                        Quizzes
                    </NavItem>
                    <NavItem >
                        Teams
                    </NavItem>
                    <NavItem>
                        Friends
                    </NavItem>
                    {/* <NavItem>
                        Settings
                    </NavItem> */}
                </div>
                <div className="profile-main">
                    <div className="profile-stats">
                        <div className="profile-stats-header">
                            <i className="fas fa-chart-area"></i> Stats
                        </div>
                        <StatsItem >
                        <span> joined on <i className="stat">{DateFormat( profile.registerTime )}</i> </span>
                        </StatsItem>
                        <StatsItem >
                        <span> created <i className="stat">{ profile.created }</i> quizzes </span>
                        </StatsItem>
                        <StatsItem >
                        <span> won <i className="stat">{ profile.won }</i> quizzes </span>
                        </StatsItem >
                        <StatsItem >
                        <span> answered <i className="stat">{ profile.answered }</i> questions </span>
                        </StatsItem>
                        <StatsItem>
                        <span> participated in <i className="stat">{ profile.participated }</i> quizzes </span>
                        </StatsItem>
                        <StatsItem>
                        <span> participated in <i className="stat">{ profile.seasonal }</i> Seasonal quizzes </span>
                        </StatsItem>
                    </div>
                    <div className="profile-container">
                        {/* load the different pages here... */}
                        {/* {profilePage === "home" &&
                        <div>
                            this is the home page, here i think we can have all the previous activites of the user, last quiz won? just finished a quiz
                        </div>

                        }
                        {profilePage === "quizzes" &&
                        <div>
                            quizzes will be here, playnow button
                        </div>
                        }
                        {profilePage === "teams" &&
                        <div>
                            teams will be here, playnow button, view and link to all the teams, if not teams it will show
                        </div>
                        }
                        {profilePage === "friends" &&
                        <div>
                            list of players friends
                        </div>
                        } */}

                    </div>
                </div>
            </div>







            <div className="test">
                <p className="part-of-a-team">{ profile.partOfTeam && <span>True</span> }{ !profile.partPOfTeam && <span>False</span> }</p>
                <p className="team-name">{ profile.teamName }</p>
                <p className="donor"></p>
            </div>
        </div> 
        <footer>
            <Footer/>
        </footer>
        </>
    );
}
 
export default Profile;