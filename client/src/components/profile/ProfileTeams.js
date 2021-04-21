import "./profileteams.css";

const ProfileTeams = ({ user }) => {
    return ( 
        <div className="profile-main">       
            <div className="profile-teams">
                <div className="profile-teams-header">
                    <i className="fas fa-users"></i> Teams
                </div>
                    <p className="part-of-a-team">{ user.partOfTeam && <span>True</span> }{ !user.partOfTeam && <span>False</span> }</p>
                    <p className="team-name">{ user.teamName }</p>
            </div>             
        </div>
     );
}
 
export default ProfileTeams;