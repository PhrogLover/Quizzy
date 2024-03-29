import "./profile.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = ({ id, user }) => {

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
                            <img src={ user.imageUrl } alt="PROF PIC"/>
                        </div>
                        <div className="change-prof-pic">
                            <i className="fas fa-image"></i>
                        </div>
                        </div>
                        <div className="profile-username"> 
                            { user.name }
                            <div className="profile-status">
                            { user.status }
                            </div>
                            {!user.donor &&
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