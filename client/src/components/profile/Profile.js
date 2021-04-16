import "./profile.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = ({ profile, id }) => {

    useEffect(() => {
        window.scrollTo(0, 300)
      }, [])
    
    function NavItem(props){
        return(
            <Link to={"/profile/?tab="+props.tab}>
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
                    <div className="change-cover-pic">
                        <i className="fas fa-image"></i>
                        Change Cover Photo
                    </div>
                    <img src="https://tokystorage.s3.amazonaws.com/images/default-cover.png" alt="cover image selected by user"></img>
                </div>
                <div className="profile-body">
                    <div className="profile-header">
                        <div className="profile-image-container">
                        <div className="profile-image">
                            <img src="https://pbs.twimg.com/profile_images/730536036753756160/Ca9tITCj_400x400.jpg"></img>
                        </div>
                        <div className="change-prof-pic">
                            <i className="fas fa-image"></i>
                        </div>
                        </div>
                        <div className="profile-username"> 
                            { profile.name }
                            <div className="profile-status">
                            { profile.status }
                            </div>
                            {!profile.donor &&
                            <div className="donor-award">
                                <i className="fas fa-award"></i>
                            </div>
                            }                          
                        </div>
                        <div className="edit-profile-button">
                            <i className="fas fa-edit"></i>
                            </div>
                            <div className="profile-dropdown-button">
                                <i className="fas fa-ellipsis-h"></i>
                            </div>
                        
                    </div>
                    <div className="profile-nav-bar">
                        <NavItem tab="home">                            
                            Home
                        </NavItem>
                        <NavItem tab="quizzes">                            
                            Quizzes
                        </NavItem>
                        <NavItem tab="teams">                       
                            Teams
                        </NavItem>
                        <NavItem tab="friends">
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