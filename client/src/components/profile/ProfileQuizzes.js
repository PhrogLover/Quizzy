import "./profilequizzes.css";
import useFetch from "../../hooks/useFetch";
import { useHistory } from "react-router";
import { useState } from "react";
import GetUniqueId from "../../scripts/GetUniqueId";

const ProfileQuizzes = ({ profile, user }) => {
    const quizUrl = `http://localhost:5000/api/quizzes/profile/${user.googleId}`;
    const { data: quizzes, isPending, error} = useFetch(quizUrl);
    const [ sending, setSending ] = useState(false);
    let history = useHistory();

    function generateIds(lobbyCount) {
        let idList = [];
        for (let i = 0; i < lobbyCount; i++) {
            idList.push(GetUniqueId());
        }
        return idList
    }

    function publishQuiz(quiz) {
        quiz.deployIds = generateIds(quiz.numberOfTeams);
        const body = {
            id: quiz.id,
            quiz: quiz
        }
        fetch('http://localhost:5000/api/quizzes/update', {
            method: 'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(body)
        }).then(setSending(false))
        .then(history.push("/"));
    }

    return ( 
        <div className="profile-main">       
            <div className="profile-quizzes">
                <div className="profile-quizzes-header">
                    <i className="fas fa-question"></i> Quizzes
                </div>
                <div className="quizzes">
                    { error && <div className="error">{ error }</div>}
                    { isPending && <div className="Loading">Loading...</div>}
                    { quizzes && quizzes.length === 0 && <span>This user / you has/have created no quizzes</span> }
                    { quizzes && quizzes.map((quiz) => (
                        <div className="quiz-item-container">
                            <div className="quiz-item-labels">
                                <div className="quiz-item-title">
                                    {quiz.title}
                                </div>
                                <div className="quiz-item-type">
                                    {quiz.type}
                                </div>
                            </div>
                            <div className="quiz-item-buttons">
                                <button>
                                    Edit Quiz
                                </button>           
                                <button key={quiz.id} type="button" onClick={() => (publishQuiz(quiz))}>
                                    <div className="quiz">
                                        Publish
                                    </div>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>             
        </div>
     );
}
 
export default ProfileQuizzes;