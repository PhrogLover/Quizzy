const Profile = ({ profile }) => {
    return ( 
        <div className="profile">
            <div className="test">
                <p className="username">{ profile.username }</p>
                <p className="status">{ profile.status }</p>
                <p className="register-time">{ profile.registerTime }</p>
                <p className="quizzes-created">{ profile.created }</p>
                <p className="quizzes-won">{ profile.won }</p>
                <p className="questions-answered">{ profile.answered }</p>
                <p className="quizzes-participated">{ profile.participated }</p>
                <p className="seasonal-quizzes-participated">{ profile.seasonal }</p>
                <p className="part-of-a-team">{ profile.partOfTeam && <span>True</span> }{ !profile.partPOfTeam && <span>False</span> }</p>
                <p className="team-name">{ profile.teamName }</p>
                <p className="donor">{ profile.donor && <span>True</span> }{ !profile.donor && <span>False</span> }</p>
            </div>
        </div> 
    );
}
 
export default Profile;