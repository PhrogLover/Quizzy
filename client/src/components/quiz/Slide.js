import { useParams } from "react-router-dom";
import useFetch from "../../useFetch";
import "./slide.css";

const Slide = () => {
    const { id } = useParams();
    const quizUrl = "/api/quizzes/slide/" + id;
    const {data: quiz, isPending, error } = useFetch(quizUrl);
    const introSlide = quiz.slides[0];
    const roundSlide = quiz.slides[1][0];
    const questionSlide = quiz.slides[1][1];

    let answers = "";
    for (let i = 0; i < questionSlide.answers.length; i++) {
        answers += questionSlide.answers[i];
        if (i !== questionSlide.answers.length-1) {
            answers += ", ";
        }
    }

    return (
        <div className="slide">
            <div className="intro-slide">
                <h2 id="intro-title">{ introSlide.title }</h2>
                { introSlide.family && <h3 id="intro-family">{ introSlide.family }</h3> }
                { introSlide.img && <img id="intro-img" src={ introSlide.img } alt="intro"/> }
            </div>
            <br/>
            <br/>
            <div className="round-slide">
                <h2 id="round-number">{ roundSlide.round }</h2>
                <h3 id="round-title">{ roundSlide.title }</h3>
                { roundSlide.img && <img src={ introSlide.img } alt="round"/> }
            </div>
            <br/>
            <br/>
            <div className="question-slide">
                <h2 id="question-number">{ questionSlide.round }, { questionSlide.question }</h2>
                <p id="question-question">{ questionSlide.question }</p>
                <p id="question-answers"> { answers }</p>
                { questionSlide.img && <img src={ questionSlide.img } alt="question"/> }
            </div>
        </div>
     );
}
 
export default Slide;