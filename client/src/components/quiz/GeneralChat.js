import "./generalchat.css";
import { useEffect, useState } from "react";
import GeneralChatElement from "./GeneralChatElement";
import GetUniqueId from "../../scripts/GetUniqueId";
import generateColour from "../../scripts/generateColour";

const GeneralChat = ( { chat, setChat, socket, chatSize }) => {
    if (chatSize < 50) {
        chatSize = 50;
    }
    const [ text, setText ] = useState("");
    const [ pin, setPin ] = useState("Insert a Pin Here");
    const [ pinCheck, setPinCheck ] = useState(false);

    function sendHandler(e) {
        if (chat.length > chatSize) {
            chat.splice(0,1);
        }
        e.preventDefault();
        if (text === "") {
            return;
        }
        const message = {
            id: GetUniqueId(),
            text: text,
            creator: "AriG7",
            colour: generateColour(),
            pinned: pinCheck
        }
        console.log(message)
        socket.emit('chat message', message);
        setTimeout(() => {
            setText("");
            if (chat.filter(message => (message.pinned === true))[0]){
                setPin(chat.filter(message => (message.pinned === true))[0].text);
                setChat(chat.filter(message => (message.pinned !== true)));
                setPinCheck(false);
            }
        }, 36)
    }

    const [gcOpen,setgcOpen] = useState(true);
    const closeGeneralChat = () => setgcOpen(false);

    const [pinMessageOpen,setPmOpen] = useState(false);

    return ( <>
            {!gcOpen &&
                <div className="open-chat-button" onClick={() => setgcOpen(true)} >
                    <i className="fas fa-comment"/>
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
                        {!pinMessageOpen && <div className="collapse-pin-message" onClick={ () => setPmOpen(!pinMessageOpen)}> <i className="fas fa-compress-alt"></i></div>}
                        {pinMessageOpen && <div className="collapse-pin-message" onClick={ () => setPmOpen(!pinMessageOpen)}> <i className="fas fa-expand-alt"></i></div>}

                        <div className="pinned-message-header">
                            <i className="fas fa-thumbtack"/> Pinned Message: 
                        </div>
<<<<<<< HEAD
                        { pinMessageOpen &&
                        <div className="pinned-message-body" contentEditable="true"></div>
                        }
=======
                        <div className="pinned-message-body">
                            { pin }
                        </div>
>>>>>>> 3670593fdfef2357411d9bb1bd4e0afa160a46ab
                    </div>
                </div>
                <div className="messages-scroll">
                    <div className="messages-container">                        
                        { chat.map((message) => (
                            <GeneralChatElement key={ message.id } message = { message } />
                        ))}                    
                    </div>
                </div>
                <div className="message-box-container">
                    <form onSubmit={ sendHandler }>
                        <div className="message-box-form">
                            <input className="message-input" placeholder="Send a message..." type="text" value={text} onChange={(text) => (setText(text.target.value))}/>
                            <button className="send-button">Send <i className="fas fa-paper-plane"></i></button><br/>
                            <label htmlFor="gc-pin">pin this message</label>
                            <input name="gc-pin" type="checkbox" checked={pinCheck} onChange={(check) => (setPinCheck(check.target.checked))} />
                        </div>
                    </form>
                </div>
            </div>
            }
        </>
    );
}
 
export default GeneralChat;