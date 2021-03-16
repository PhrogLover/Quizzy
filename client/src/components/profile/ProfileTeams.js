import "./profileteams.css";

const ProfileTeams = ({ profile }) => {
    return ( 
        <div className="profile-main">       
            <div className="profile-teams">
                <div className="profile-teams-header">
                    <i className="fas fa-users"></i> Teams
                </div>
                    <p className="part-of-a-team">{ profile.partOfTeam && <span>True</span> }{ !profile.partPOfTeam && <span>False</span> }</p>
                    <p className="team-name">{ profile.teamName }</p>
            </div>             
        </div>
     );
}
 
export default ProfileTeams;