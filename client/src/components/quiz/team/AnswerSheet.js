import { useState, useEffect } from "react";

const AnswerSheet = ({ mainId, lobbyId, socket, questionCount }) => {

    const [ answerSheet, setAnswerSheet ] = useState(initState());

    useEffect(() => {
        socket.on('update sheet '+lobbyId, (sheet) => {
            setAnswerSheet(sheet);
        })
        socket.on('ping sheet '+mainId, () => {
            socket.emit('send sheet', answerSheet, lobbyId, mainId)
        })
    }, [])

    function initState() {
        let answers = [];
        for (let i = 0; i < questionCount; i++) {
            answers.push({
                index: i+1,
                value: ""
            });
        }
        return answers;
    }

    function onSheetChange(ans, i) {
        let answers = [...answerSheet];
        answers[i].value = ans;
        socket.emit("update sheet", answers, lobbyId);
    }

    return ( 
        <>
            <div className="answer-sheet">
                { answerSheet.map((answer, i) => (
                    <div key={i} className="answer">
                        <label htmlFor={`answer${answer.index}`}>Answer for Q{answer.index}</label>
                        <input type="text" value={answer.value} onChange={text => (onSheetChange(text.target.value, answer.index-1))} name={`answer${answer.index}`}/>
                    </div>
                ))}
            </div>
            <button type="button" onClick={() => (socket.emit("send sheet", answerSheet, lobbyId, mainId))}>Test send sheet</button>
        </>
     );
}
 
export default AnswerSheet;