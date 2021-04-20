import { useEffect } from "react";
import "./answersheet.css";

const AnswerSheet = ({ lobbyId, socket, answerSheet, setAnswerSheet, sendAnswerSheet }) => {

    useEffect(() => {
        socket.on('update sheet '+lobbyId, (sheet) => {
            setAnswerSheet(sheet);
        })
    }, [])

    function onSheetChange(ans, i) {
        let answers = [...answerSheet];
        answers[i].value = ans;
        socket.emit("update sheet", answers, lobbyId);
    }

    return ( 
        <div className="answer-sheet-container">
            <div className="answer-sheet-scroll">
                <div className="answer-sheet">
                    { answerSheet === [] && <div className="no-sheet">Answers Sent</div>}
                    { answerSheet.map((answer, i) => (
                        <div key={i} className="answer">
                            <label htmlFor={`answer${answer.index}`}> {answer.index}:</label>
                            <input type="text" value={answer.value} onChange={text => (onSheetChange(text.target.value, answer.index-1))} name={`answer${answer.index}`}/>
                        </div>
                    ))}
                </div>
            </div>
            <button className="send-answers-sheet" type="button" onClick={sendAnswerSheet}>Send Answer Sheet</button>
        </div>
     );
}
 
export default AnswerSheet;