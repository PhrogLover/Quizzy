import "./profilequizzes.css"

const ProfileQuizzes = ({ profile }) => {
    return ( 
        <div className="profile-main">       
            <div className="profile-quizzes">
                <div className="profile-quizzes-header">
                    <i className="fas fa-question"></i> Quizzes
                </div>
                    This user / you has/have created no quizzes
            </div>             
        </div>
     );
}
 
export default ProfileQuizzes;