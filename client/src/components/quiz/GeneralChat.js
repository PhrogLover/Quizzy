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
        fetch('http://localhost:5000/api/quizzes/quiz/chat/' + id, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(message)
        }).then(setIsPending(false))
        .then(generalChatRefresh(refreshValue))
        .then(setRefreshValue(!refreshValue));
    }

    const [gcOpen,setgcOpen] = useState(true);
    const closeGeneralChat = () => setgcOpen(false);

    

    return ( <>
            {!gcOpen &&
                <div className="open-chat-button" onClick={() => setgcOpen(true)} >
                    <i className="fas fa-chevron-left"/>
                </div>
            }
            {gcOpen && <div className= "general-chat">
                <div className="chat-toolbar-container">
                    <div className="collapse-chat-button chat-toolbar-buttons" onClick={() => setgcOpen(false)} >
                        <i className="fas fa-chevron-right"/>
                    </div>
                    <div className="chat-toolbar-buttons">
                    <i className="fas fa-user-friends"/>
                    </div>
                    <div className="chat-toolbar-buttons">
                        <i className="fas fa-ellipsis-h"/>
                    </div>
                </div>
                <div className="pinned-message-container">
                    <div className="pinned-message-box">
                        <div className="pinned-message-header">
                            <i className="fas fa-thumbtack"/> Pinned Message: 
                        </div>
                        <div className="pinned-message-body" contenteditable="true">
                            insert pin mesage here
                        </div>
                    </div>
                </div>
                <div className="messages-container">
                    { chat.map((message) => (
                        <GeneralChatElement key={ message.id } message = { message } />
                    ))}
                </div>
                <div className="message-box-container">
                    <form onSubmit={ sendHandler }>
                        <div className="message-box-form">
                            <input className="message-input" placeholder="Send a message..." type="text" value={text} onChange={(text) => (setText(text.target.value))}/>
                            { !isPending && <button className="send-button">Send <i className="fas fa-paper-plane"></i></button> }
                            { isPending && <button className="send-button" disabled>Sending...</button> }
                        </div>
                    </form>
                </div>
            </div>
            }
        </>
    );
}
 
export default GeneralChat;