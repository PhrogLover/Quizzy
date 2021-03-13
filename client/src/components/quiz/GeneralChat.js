import "./generalchat.css";
import { useState } from "react";
import GeneralChatElement from "./GeneralChatElement";
import GetUniqueId from "../../GetUniqueId";

const GeneralChat = ( { chat, socket }) => {
    const [ text, setText ] = useState("");

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
        socket.emit('chat message', message);
    }

    return ( 
        <div className="general-chat">
            <div className="pinned-message-container">
                <div className="pinned-message-box">
                    <div className="pinned-message-header">
                        <i className="fas fa-thumbtack"/> Pinned Message: 
                    </div>
                    <div className="pinned-message-body">
                        insert pin mesage here
                    </div>
                </div>
            </div>
            <div className="messages-container">
                { chat.map((message) => (
                    <GeneralChatElement key={ message.id } message = { message } />
                ))}
            </div>
            <div className="chat-toolbar-container">
                
            </div>
            <div className="message-box-container">
                <form onSubmit={ sendHandler }>
                    <div className="message-box-form">
                        <input className="message-input" placeholder="Send a message..." type="text" value={text} onChange={(text) => (setText(text.target.value))}/>
                        <button className="send-button">Send <i className="fas fa-paper-plane"></i></button>
                    </div>
                </form>
            </div>
        </div> 
    );
}
 
export default GeneralChat;