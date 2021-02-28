import "./quizlist.css";

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
                    <span id="title"> { quiz.title }</span>
                    <span id="category"> { quiz.category }</span>
                    <span id="type"> { quiz.type }</span>
                    <span id="family"> { quiz.family }</span>
                    <span id="startingTime"> 16:00</span>
                    <span id="spaces"> 0/{ quiz.spaces }</span>
                    <span id="creator"> Host: { quiz.creator }</span>
                    <span id="rating"> Host's rating: { quiz.rating }/5</span>
                    <button onClick={() => (deleteHandler(quiz.id))}>Delete</button>
                </div>
            ))}
        </div>
     );
}
 
export default Quizlist;