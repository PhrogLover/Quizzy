import "./answerjudge.css";
import { useState, useEffect } from "react";
import $ from "jquery";
import SlideView from "../SlideView";

const AnswerJudge = ({ quiz, socket, mainId, round, setLobbyState, testAnswerSheet, testCorrectAnswerSheet }) => {
    const [ answers, setAnswers ] = useState([]);
    const [ correctAnswers, setCorrectAnswers ] = useState([]);
    const [ currentSlide, setCurrentSlide ] = useState(null);
    const [ index, setIndex ] = useState();
    const [ submittedAnswer, setSubmittedAnswer ] = useState();
    const [ currIndex, setCurrIndex ] = useState({
        i: 0,
        j: 0
    })
    const parse = answerParser();

    useEffect(() => {
        if (testAnswerSheet) {
            setAnswers(testAnswerSheet);
            setCorrectAnswers(testCorrectAnswerSheet);
        }
        socket.on("send sheet "+mainId, (sheet, lobbyId) => {
            console.log(sheet, answers.length)
            setAnswers([...answers, {
                id: lobbyId,
                sheet: sheet
            }]);
            setCorrectAnswers([...correctAnswers, {
                id: lobbyId,
                sheet: []
            }]);
        })
    }, [])

    useEffect(() => {
        if (answers.length === 2) {
            setCurrentSlide(parse.next().value);
        }
    }, [answers])

    useEffect(() => {
        if (currentSlide === "end") {
            //change lobbyState
            setLobbyState(correctAnswers);
        }
    }, [currentSlide])

    function answerAllowed() {
        let temp = $.extend(true, [], correctAnswers);
        temp[index].sheet.push(submittedAnswer);
        setCorrectAnswers(temp);
        setCurrentSlide(parse.next().value);
    }

    function* answerParser() {
        //splice answer arrays into question-wise arrays instead of team-wise
        let orderedArray = [];
        let orderedSheet = [];
        for (let i = 0; i < answers[i].sheet.length; i++) {
            for (let j = 0; j < answers.length; j++) {
                orderedSheet.push(answers[j].sheet[i]);
            }
            orderedArray.push(orderedSheet);
            orderedSheet = [];
        }
        //cycle through answers;if answer not in array of answers, display slide with buttons to mark it as correct or not
        for (let i = currIndex.i; i < orderedArray.length; i++) {
            for (let j = currIndex.j; j < orderedArray[i].length; j++) {
                let correctAnswer = quiz.slides[round][i+1].answers.some((answer) => answer === orderedArray[i][j].value);
                if (!correctAnswer) {
                    //set current slide to this slide for judging
                    if (orderedArray[i][j].value !== "") {
                        let tempSlide = quiz.slides[round][i+1];
                        setIndex(j);
                        setSubmittedAnswer(orderedArray[i][j]);
                        setCurrIndex({
                            i: i,
                            j: j+1
                        })
                        tempSlide.type = "judge";
                        yield tempSlide;
                    }
                }
                else {
                    let temp = $.extend(true, [], correctAnswers);
                    temp[j].sheet.push(orderedArray[i][j]);
                    setCorrectAnswers(temp);
                }
            }
        }
        return "end";
        //end of judging phase for this round
    }

    return ( 
        <div className="answer-judge">
            { currentSlide && currentSlide !== "end" && <>
                <SlideView quiz = { quiz } slide = { currentSlide } slideWidthPass = "width--100per" />
                <button type="button" onClick={answerAllowed}>Allow</button>
                <button type="button" onClick={() => (setCurrentSlide(parse.next().value))}>Deny</button>
            </>}
        </div>
     );
}
 
export default AnswerJudge;