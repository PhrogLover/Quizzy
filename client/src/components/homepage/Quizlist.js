import "./quizlist.css";
import "./quizholder.css";
import { Link } from "react-router-dom";

const Quizlist = ({ quizzes, sortRating }) => {
    if (sortRating) {
        quizzes = SortQuizzes(quizzes);
    }

    function SortQuizzes(quizzes) {
        for (let i = 1; i < quizzes.length; i++) {
            let j = i;
            let temp;
            while (j > 0 && quizzes[j].rating > quizzes[j-1].rating)  {
                temp = quizzes[j];
                quizzes[j] = quizzes[j-1];
                quizzes[j-1] = temp;
                j--;
            }
        }
        return quizzes;
    }

    for (let i = 0; i < quizzes.length; i++) {
        quizzes[i].spaces = quizzes[i].numberOfTeams * quizzes[i].numberOfPlayers;
    }

    return ( 
        <div className="quiz-row-container" >
            {quizzes.map(quiz => (
                <Link className="quiz-row" to={`/mainLobby/${quiz.id}`} key={ quiz.id }>
                    <div className="starttime cell">
                        <span id="startingTime"> { quiz.time }</span>
                    </div>
                    <div className="spaces cell">
                        <span id="spaces"> 0/{ quiz.spaces }</span>
                    </div>
                    <div className="quiztitle cell">
                        <span id="title"> { quiz.title }</span>
                    </div>
                    <div className="category cell">
                        <span id="category"> { quiz.category }</span>
                    </div>
                    <div className="type cell">
                        <span id="type"> { quiz.type }</span>
                    </div>
                    <div className="family cell">
                        <span id="family"> { quiz.family }</span>
                    </div>                            
                    <div className="host cell">
                        <span id="creator"> { quiz.creator }</span>
                    </div>
                    <div className="hostrating cell end-cell">
                        <span id="rating"> { quiz.rating }/5</span>
                    </div>
                </Link>
            ))}
        </div>
     );
}
 
export default Quizlist;