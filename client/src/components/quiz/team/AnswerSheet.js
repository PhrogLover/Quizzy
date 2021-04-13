import { useEffect } from "react";

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
        <>
            <div className="answer-sheet">
                { answerSheet === [] && <div className="no-sheet">Answers Sent</div>}
                { answerSheet.map((answer, i) => (
                    <div key={i} className="answer">
                        <label htmlFor={`answer${answer.index}`}>Answer for Q{answer.index}</label>
                        <input type="text" value={answer.value} onChange={text => (onSheetChange(text.target.value, answer.index-1))} name={`answer${answer.index}`}/>
                    </div>
                ))}
            </div>
            <button type="button" onClick={sendAnswerSheet}>Send Answer Sheet</button>
        </>
     );
}
 
export default AnswerSheet;