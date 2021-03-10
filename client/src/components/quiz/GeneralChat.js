import "./generalchat.css";
import { useState } from "react";
import GeneralChatElement from "./GeneralChatElement";
import GetUniqueId from "../../GetUniqueId";

const GeneralChat = ( { chat, id, generalChatRefresh }) => {
    const [ text, setText ] = useState("");
    const [ isPending, setIsPending ] = useState(false);
    const [ refreshValue, setRefreshValue ] = useState(false);

    function sendHandler(e) {
        e.preventDefault();
        if (text === "") {
            return;
        }
        const message = {
            id: GetUniqueId(),
            text: text,
            creator: "AriG7"
        }
        setText("");
        console.log(message);
        fetch('http://localhost:5000/api/quizzes/quiz/chat/' + id, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(message)
        }).then(setIsPending(false))
        .then(generalChatRefresh(refreshValue))
        .then(setRefreshValue(!refreshValue));
    }
    console.log("chat: " ,chat);

    return ( 
        <div className="general-chat">
            { chat.map((message, index) => (
                <GeneralChatElement key={ index } message = { message } />
            ))}
            <form onSubmit={ sendHandler }>
                <input type="text" value={text} onChange={(text) => (setText(text.target.value))}/>
                { !isPending && <button>Send</button> }
                { isPending && <button disabled>Sending...</button> }
            </form>
        </div> 
    );
}
 
export default GeneralChat;