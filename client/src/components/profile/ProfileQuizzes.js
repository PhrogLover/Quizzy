import QuizSelector from "../basic/QuizSelector";
import "./profilequizzes.css";

const ProfileQuizzes = ({ user, socket }) => {
    

    return ( 
        <div className="profile-main">       
            <div className="profile-quizzes">
                <div className="profile-quizzes-header">
                    <i className="fas fa-question"></i> Quizzes
                    <QuizSelector user = { user } socket = { socket }/> 
                </div>
            </div>
        </div>
     );
}
 
export default ProfileQuizzes;