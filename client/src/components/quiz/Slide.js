import { useParams } from "react-router-dom";
import useFetch from "../../useFetch";
import "./slide.css";

const Slide = () => {
    const { id } = useParams();
    const quizUrl = "http://localhost:5000/api/quizzes/slide/" + id;
    const {data: quiz, isPending, error } = useFetch(quizUrl);

    console.log(quiz);
    let introSlide = "";
    let roundSlide = "";
    let questionSlide = "";
    let answers = "";

    if (!isPending) {
        introSlide = quiz.slides[0];
        roundSlide = quiz.slides[1][0];
        questionSlide = quiz.slides[1][1];

        for (let i = 0; i < questionSlide.answers.length; i++) {
            answers += questionSlide.answers[i];
            if (i !== questionSlide.answers.length-1) {
                answers += ", ";
            }
        }
    }
    

    return (
        <>
            { !isPending && <>
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
                        { roundSlide.img && <img src={ roundSlide.img } alt="round"/> }
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
            </>}
        </>
     );
}
 
export default Slide;