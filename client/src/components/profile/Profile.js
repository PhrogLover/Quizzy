import "./profile.css";
import { useState} from "react";
import { Link } from "react-router-dom";

const Profile = ({ profile, id }) => {

    
    function NavItem(props){
        return(
            <div className = "nav-item" /*onClcik stuff = something  in here*/ >
                {props.children}
            </div>        
        )
    }
    return (
    <> 
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
                        <Link to={`/profile/?id=${id}&tab=home`}>
                            Home
                        </Link>
                    </NavItem>
                    <NavItem >
                        <Link to={`/profile/?id=${id}&tab=quizzes`}>
                            Quizzes
                        </Link>
                    </NavItem>
                    <NavItem >
                        <Link to={`/profile/?id=${id}&tab=teams`}>
                            Teams
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to={`/profile/?id=${id}&tab=friends`}>
                            Friends
                        </Link>
                    </NavItem>
                    {/* <NavItem>
                        Settings
                    </NavItem> */}
                </div>
            </div>
            </div>
        </>
    );
}
 
export default Profile;