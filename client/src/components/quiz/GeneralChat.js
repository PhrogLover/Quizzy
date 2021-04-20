import "./generalchat.css";
import { useEffect, useState } from "react";
import GeneralChatElement from "./GeneralChatElement";
import GetUniqueId from "../../scripts/GetUniqueId";
import generateColour from "../../scripts/generateColour";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


const GeneralChat = ( { lbToggle, setlbToggle, gcOpen, setgcOpen, userState, mainId, socket }) => {
    const [ chat, setChat ] = useState([]);

    useEffect(() => {
        socket.on("chat message "+mainId, msg => {
            setChat((prevState) => [...prevState, msg]);
        });
    }, [])

    const [ text, setText ] = useState("");
    const [ pin, setPin ] = useState("Insert a Pin Here");
    const [ pinCheck, setPinCheck ] = useState(false);

    function sendHandler(e) {
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
        socket.emit('chat message', message, mainId);
        setTimeout(() => {
            setText("");
            if (chat.filter(message => (message.pinned === true))[0]){
                setPin(chat.filter(message => (message.pinned === true))[0].text);
                setChat(chat.filter(message => (message.pinned !== true)));
                setPinCheck(false);
            }
        }, 36)
    }

    const closeGeneralChat = () => setgcOpen(false);

    const [pinMessageOpen,setPmOpen] = useState(false);
    const [pinEditable,setPinEditable] = useState(false);


    const [gcDropdown, setgcDropdown] = useState(false);
    const closegcDropdown = () => setgcDropdown(false);

    function GcDropdown() {       
    
        function DropdownItem(props){
            return(
                <div className = "menu-item">
                    <div className="dropdown-icon"><i className= {props.icon}/></div>
                    {props.children}
                </div>        
            )}

        return (
            <>
                <ClickAwayListener onClickAway={closegcDropdown}>
                    <div className="general-menu" >
                        <div className="leaderboard-button" onClick={() => setlbToggle(true)}>
                            <DropdownItem icon={"fas fa-medal"}>
                                LeaderBoard
                            </DropdownItem>
                        </div>
                        <DropdownItem icon={"bruh"}>
                            Bruhhhhh
                        </DropdownItem>
                        
                    </div>
                </ClickAwayListener>
            </>
        );
    }

    

    return ( <>
            {!gcOpen && userState === "player" && 
                <div className="open-chat-button" onClick={() => setgcOpen(true)} >
                    <i className="fas fa-comment-alt"/>
                </div>
            }
            {gcOpen && <div className= "general-chat">
                <div className="chat-toolbar-container">
                    {userState === "player" &&
                    <div className="collapse-chat-button chat-toolbar-buttons" onClick={() => setgcOpen(false)} >
                        <i className="fas fa-times"/>
                    </div>
                    }
                    <div className="chat-toolbar-buttons">
                    <i className="fas fa-user-friends"/>
                    </div>
                    {leaderboard && <div className="chat-toolbar-buttons" onClick={() => setgcDropdown(!gcDropdown)}>
                        <i className="fas fa-ellipsis-h"/>
                    </div>
                    }
                    <div className="chat-label">
                        Lobby Chat
                    </div>
                </div>
                {gcDropdown && <GcDropdown/>}
                <div className="pinned-message-container">                    
                    <div className="pinned-message-box">
                        {pinMessageOpen && <div className="collapse-pin-message" onClick={ () => setPmOpen(!pinMessageOpen)}> <i className="fas fa-compress-alt"></i></div>}
                        {!pinMessageOpen && <div className="collapse-pin-message" onClick={ () => setPmOpen(!pinMessageOpen)}> <i className="fas fa-expand-alt"></i></div>}
                        
                        {!pinEditable && <div className="edit-pin-message" onClick={ () => setPinEditable(!pinEditable)}> <i className="fas fa-edit"></i></div>}
                        {pinEditable && <div className="edit-pin-message" onClick={ () => setPinEditable(!pinEditable)}> <i className="fas fa-times"></i></div>}


                        <div className="pinned-message-header">
                            <i className="fas fa-thumbtack"/> Pinned Message: 
                        </div>
                        { pinMessageOpen &&
                        <div className="pinned-message-body" contentEditable={pinEditable}>
                            { pin }
                        </div>
                        }
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
                            {/* <label htmlFor="gc-pin">pin this message</label> */}
                            {/* <input name="gc-pin" type="checkbox" checked={pinCheck} onChange={(check) => (setPinCheck(check.target.checked))} /> */}
                        </div>
                    </form>
                </div>
                
            </div>
            
            }
        </>
    );
}
 
export default GeneralChat;