import "./profilefriends.css"

const ProfileFriends = ({ profile }) => {
    return ( 
        <div className="profile-main">       
            <div className="profile-friends">
                <div className="profile-friends-header">
                    <i className="fas fa-user-friends"></i> Friends
                </div>
                    this user/you have no friends :(
            </div>             
        </div>
     );
}
 
export default ProfileFriends;