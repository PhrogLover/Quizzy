import "./profilequizzes.css";
import useFetch from "../../hooks/useFetch";
import { useHistory } from "react-router";
import { useState } from "react";
import GetUniqueId from "../../scripts/GetUniqueId";

const ProfileQuizzes = ({ profile, user, socket }) => {
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

    function closeQuiz(quiz) {
        quiz.deployIds = [];
        const body = {
            id: quiz.id,
            quiz: quiz
        }
        fetch('http://localhost:5000/api/quizzes/update', {
            method: 'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(body)
        }).then(socket.emit('lobby data delete', quiz.id))
        .then(history.push("/"));
    }

    function publishQuiz(quiz) {
        quiz.deployIds = generateIds(quiz.numberOfTeams);
        let lobbyCount = [];
        for (let i = 1; i <= quiz.numberOfTeams; i++) {
            lobbyCount.push({id: quiz.deployIds[i-1], index: i, players: [], name: `Team Lobby ${i}` });
        }
        socket.emit('lobby data create', quiz.id, lobbyCount);

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
                    { quizzes && quizzes.length === 0 && <div className="empty">You have not Created any Quizzed thus far!</div> } 
                    { quizzes && quizzes.map((quiz) => (
                        <div className="quiz-item-container"  key={quiz.id}>
                            { quiz.deployIds && quiz.deployIds.length > 0 && <>
                                <div className="quiz-item-labels">
                                    <div className="quiz-item-title">
                                        {quiz.title}
                                    </div>
                                    <div className="quiz-item-type">
                                        {quiz.type}
                                    </div>
                                </div>
                                <div className="quiz-item-buttons">
                                    <button className="edit-quiz-button">
                                        <i className="fas fa-edit"></i>
                                        Edit
                                    </button>           
                                    <button className="publish-quiz-button" type="button" onClick={() => (closeQuiz(quiz))}>
                                        <i className="fas fa-upload"></i>
                                        Close
                                    </button>
                                </div>
                            </> }
                            { quiz.deployIds.length === 0 && <>
                                <div className="quiz-item-labels">
                                    <div className="quiz-item-title">
                                        {quiz.title}
                                    </div>
                                    <div className="quiz-item-type">
                                        {quiz.type}
                                    </div>
                                </div>
                                <div className="quiz-item-buttons">
                                    <button className="edit-quiz-button">
                                        <i className="fas fa-edit"></i>
                                        Edit
                                    </button>           
                                    <button className="publish-quiz-button" type="button" onClick={() => (publishQuiz(quiz))}>
                                        <i className="fas fa-upload"></i>
                                        Publish
                                    </button>
                                </div>
                            </> }
                        </div>
                    ))}
                </div>
            </div>             
        </div>
     );
}
 
export default ProfileQuizzes;