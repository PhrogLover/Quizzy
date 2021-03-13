import "./generalchat.css";
import { useState } from "react";
import GeneralChatElement from "./GeneralChatElement";
import GetUniqueId from "../../GetUniqueId";

const GeneralChat = ( { chat, socket }) => {
    console.log(chat);
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
        socket.emit('chat message', message);
        setTimeout(() => {
            setText("");
        }, 36)
        
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
<<<<<<< HEAD
                        <div className="pinned-message-body" contentEditable="true">
                            
=======
                        <div className="pinned-message-body">
                            insert pin mesage here
>>>>>>> 088dd149da0b46e291115d7149b76d52184d4823
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
                            <button className="send-button">Send <i className="fas fa-paper-plane"></i></button>
                        </div>
                    </form>
                </div>
            </div>
            }
        </>
    );
}
 
export default GeneralChat;