import "./quizlist.css";
import "./quizholder.css";

const Quizlist = ({ quizzes, sortRating, deleteHandler }) => {
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
        <div>
            {quizzes.map(quiz => (
                <div className="quiz-row" key={ quiz.id }>
                    <div className="starttime cell">
                        <span id="startingTime"> 16:00</span>
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
                    <div className="hostrating cell end">
                        <span id="rating"> { quiz.rating }/5</span>
                    </div>
                    <button className="hide-me" onClick={() => (deleteHandler(quiz.id))}>Delete</button>
                </div>
            ))}
        </div>
     );
}
 
export default Quizlist;