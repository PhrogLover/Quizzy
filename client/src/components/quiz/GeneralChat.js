import "./generalchat.css";
import { useEffect, useState } from "react";
import GeneralChatElement from "./GeneralChatElement";
import GetUniqueId from "../../GetUniqueId";
import { CardGiftcardTwoTone } from "@material-ui/icons";

const GeneralChat = ( { chat, socket, chatSize }) => {
    if (chatSize < 50) {
        chatSize = 50;
    }
    const [ text, setText ] = useState("");
    const [ pin, setPin ] = useState("Insert a Pin Here");
    const [ pinCheck, setPinCheck ] = useState(false);

    useEffect (() => {
        console.log(pin)
    }, [pin]);

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
            colour: "blue",
            pinned: pinCheck
        }
        socket.emit('chat message', message);
        setTimeout(() => {
            setText("");
        }, 36)
        if (chat.filter(message => (message.pinned))){
            console.log(chat.filter(message => (message.pinned)));
            setPin(chat.filter(message => (message.pinned).text));
        }
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
                        <div className="pinned-message-body">
                            
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
                            <input type="checkbox" value={pinCheck} onChange={(check) => (setPinCheck(check.target.value))} />
                        </div>
                    </form>
                </div>
            </div>
            }
        </>
    );
}
 
export default GeneralChat;