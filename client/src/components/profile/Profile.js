import "./profile.css";
// import { useState} from "react";
import { Link } from "react-router-dom";
import Footer from "../basic/Footer";

const Profile = ({ profile, id }) => {

    
    function NavItem(props){
        return(
            <Link to={"/profile/?id="+props.id+"&tab="+props.tab}>
                <div className = "nav-item"  >
                    {props.children}
                </div>
            </Link>        
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
                        <NavItem id={`${id}`} tab="home">                            
                            Home
                        </NavItem>
                        <NavItem id={`${id}`} tab="quizzes">                            
                            Quizzes
                        </NavItem>
                        <NavItem id={`${id}`} tab="teams">                       
                            Teams
                        </NavItem>
                        <NavItem id={`${id}`} tab="friends">
                            Friends
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