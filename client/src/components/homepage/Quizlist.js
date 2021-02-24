import "./quizlist.css";

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

    return ( 
        <div>
            {quizzes.map(quiz => (
                <div className="quiz-row" key={ quiz.id }>
                    <span className="title"> { quiz.title }</span>
                    <span className="creator"> Host: { quiz.creator }</span>
                    <span className="rating"> Host's rating: { quiz.rating }/5</span>
                </div>
            ))}
        </div>
     );
}
 
export default Quizlist;