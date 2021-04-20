import "./answerjudge.css";
import { useState, useEffect } from "react";
import $ from "jquery";
import SlideView from "../SlideView";

const AnswerJudge = ({ quiz, round, setLobbyState, ans, correctAns }) => {
    const [ currentSlide, setCurrentSlide ] = useState(null);
    const [ index, setIndex ] = useState();
    const [ submittedAnswer, setSubmittedAnswer ] = useState();
    const [ slideAnswers, setSlideAnswers ] = useState();
    const [ answers, setAnswers ] = useState(ans);
    const [ correctAnswers, setCorrectAnswers ] = useState(correctAns);
    const parse = answerParser();
    const [ currIndex, setCurrIndex ] = useState({
        i: 0,
        j: 0
    });

    useEffect(() => {
        console.log("CA: ",correctAnswers)
    }, [correctAnswers])

    useEffect(() => {
        console.log("ANSWERS: ", answers, correctAnswers)
        if (answers.length > 0 && correctAnswers.length > 0) setCurrentSlide(parse.next().value);
    }, [])

    useEffect(() => {
        if (currentSlide === "end") {
            console.log(currIndex);
            //change lobbyState
            let pointsArr = [];
            for (let i = 0; i < correctAnswers.length; i++) {
                pointsArr.push({
                    id: correctAnswers[i].id,
                    points: correctAnswers[i].sheet.length
                });
            }
            setLobbyState(pointsArr);
        }
    }, [currentSlide])

    function addAnswer(index, answer) {
        setCorrectAnswers(prevState => ([ ...prevState.slice(0, index), {...prevState[index], sheet: [...prevState[index].sheet, answer] }, ...prevState.slice(index+1) ] ));
    }

    function answerAllowed() {
        addAnswer(index, submittedAnswer);
        setCurrentSlide(parse.next().value);
    }

    function* answerParser() {
        //splice answer arrays into question-wise arrays instead of team-wise
        let orderedArray = [];
        let orderedSheet = [];
        for (let i = 0; i < answers[0].sheet.length; i++) {
            for (let j = 0; j < answers.length; j++) {
                orderedSheet.push(answers[j].sheet[i]);
            }
            orderedArray.push(orderedSheet);
            orderedSheet = [];
        }

        let i = currIndex.i;
        let j = currIndex.j;
        console.log(i, j, "BEGIN");

        //cycle through answers;if answer not in array of answers, display slide with buttons to mark it as correct or not
        
        for (; i < orderedArray.length; i++) {
            for (; j < orderedArray[i].length; j++) {
                console.log(i,j, currIndex);
                let correctAnswer = quiz.slides[round][i+1].answers.some((answer) => answer === orderedArray[i][j].value);
                if (!quiz.slides[round][i+1].caseSensitive) correctAnswer = quiz.slides[round][i+1].answers.some((answer) => answer.toLowerCase() === orderedArray[i][j].value.toLowerCase());
                if (!correctAnswer) {
                    //set current slide to this slide for judging
                    if (orderedArray[i][j].value !== "") {
                        setIndex(j);
                        setSubmittedAnswer(orderedArray[i][j]);
                        if (currIndex.j === orderedArray[i].length-1) {
                            setCurrIndex({
                                i: i+1,
                                j: 0
                            })
                        }
                        else {
                            setCurrIndex({
                                i: i,
                                j: j+1
                            })
                        }                     
                        let answers = "";
                        const slide = quiz.slides[round][i+1];
                        for (let i = 0; i < slide.answers.length; i++) {
                            answers += slide.answers[i];
                            if (i !== slide.answers.length-1) {
                                answers += " OR ";
                            }
                        }
                        setSlideAnswers(answers);
                        yield slide;
                    }
                }
                else {
                    addAnswer(j, orderedArray[i][j]);
                }
                if (currIndex.j !== 0 && currIndex.j === orderedArray[i].length-1) {
                    setCurrIndex({
                        i: i+1,
                        j: 0
                    });
                }
            }
            j = 0;
        }
        console.log("END: ", currIndex)
        return "end";
        //end of judging phase for this round
    }

    const [ judgeSlideSize, setJudgeSlideSize ] = useState(resizeSlide());
    const [ judgeSlideHeight, setJudgeSlideHeight ] = useState(getHeight());

    useEffect(() => {
        setJudgeSlideSize(resizeSlide());
        setJudgeSlideHeight(getHeight());
    },[])

    useEffect(() => {
        function handleResize() {
            setJudgeSlideSize(resizeSlide());
            setJudgeSlideHeight(getHeight());
        }

        window.addEventListener('resize', handleResize);

        return _ => {
        window.removeEventListener('resize', handleResize)
        }
    })

    function resizeSlide() {
        let sectionWidth= $("#host-slideview-wrapper").width();
        let sectionHeight= $("#host-slideview-wrapper").height();
        return {maxHeight: sectionHeight+"px", maxWidth: sectionWidth+ "px" };
    }
    function getHeight() {
        let sectionHeight= $("#main-host-slideview").height();
        return {height: sectionHeight+"px"};
    }

    return ( 
        <div className="answer-judge">
            <div className="judge-prompt"> JUDGEMENT DAY</div>
            { currentSlide && currentSlide !== "end" && <>
                <div className="judge-questions-slides" style={judgeSlideHeight}>
                    <div className="judge-slide-wrapper" style={judgeSlideSize}>
                        <SlideView quiz = { quiz } slide = { currentSlide } slideWidthPass = "width--100per" judge = { true } />
                    </div>
                </div>
                <div className="judge-container"> 
                    <div className="correct-answer"> Correct Answer was: "<i> { slideAnswers } </i>"</div>
                    <div className="submitted-answer"> Submitted Answer was: "<i>{ submittedAnswer.value }</i>"</div>
                    <div className="judge-buttons">
                        <button className="judge-allow-button" type="button" onClick={answerAllowed}><i className="fas fa-check"></i> Allow</button>
                        <button className="judge-deny-button" type="button" onClick={() => (setCurrentSlide(parse.next().value))}><i className="fas fa-times"></i> Deny</button>
                    </div> 
                </div>
            </>}
        </div>
     );
}
 
export default AnswerJudge;