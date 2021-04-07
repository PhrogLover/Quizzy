import "./answerjudge.css";
import { useState, useEffect } from "react";
import SlideView from "../SlideView";

const AnswerJudge = ({ quiz, socket, mainId, round, setLobbyState }) => {
    const [ answers, setAnswers ] = useState([]);
    const [ correctAnswers, setCorrectAnswers ] = useState([]);
    const [ currentSlide, setCurrentSlide ] = useState(null);

    useEffect(() => {
        socket.on("send sheet "+mainId, (sheet, lobbyId) => {
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
        if (answers.length === quiz.numberOfTeams) {
            setCurrentSlide(answerParser().slide);
        }
    }, [answers])

    useEffect(() => {
        if (currentSlide === "end") {
            //change lobbyState
            setLobbyState();
        }
    }, [currentSlide])

    function answerAllowed() {
        setCorrectAnswers((prevState) => (prevState[currentSlide.index].sheet.push(currentSlide.answer)));
        setCurrentSlide(answerParser().slide);
    }

    function* answerParser() {
        //splice answer arrays into question-wise arrays instead of team-wise
        let orderedArray = [];
        let orderedSheet = [];
        for (let i = 0; i < answers[i].sheet.length; i++) {
            for (let j = 0; j < answers.length; j++) {
                orderedSheet.push(answers[i].sheet[j]);
            }
            orderedArray.push(orderedSheet);
            orderedSheet = [];
        }
        //cycle through answers;if answer not in array of answers, display slide with buttons to mark it as correct or not
        for (let i = 0; i < orderedArray.length; i++) {
            for (let j = 0; j < orderedArray[i].length; j++) {
                let correctAnswer = quiz.slides[round][j+1].answers.some((answer) => answer.includes(orderedArray[i][j]));
                if (!correctAnswer) {
                    //set current slide to this slide for judging
                    yield {
                        slide: quiz.slides[round][j+1],
                        index: j,
                        answer: orderedArray[i][j]
                    }
                }
                else {
                    setCorrectAnswers((prevState) => (prevState[j].sheet.push(orderedArray[i][j])));
                }
            }
        }
        yield "end";
        //end of judging phase for this round
    }

    return ( 
        <div className="answer-judge">
            { currentSlide && currentSlide !== "end" && <>
                <SlideView quiz = { quiz } />
                <button type="button" onClick={answerAllowed}>Allow</button>
                <button type="button" onClick={() => (setCurrentSlide(answerParser().slide))}>Deny</button>
            </>}
        </div>
     );
}
 
export default AnswerJudge;