import { useState, useEffect } from "react";
import React from "react";
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Send from '@material-ui/icons/Send';

import './ChatComponent.css';
import { Tooltip } from '@material-ui/core';

const ChatComponent = (props) => {
    const styleChat = { display: props.chatDisplay };
    const [ messageList, setMessageList ] = useState([]);
    const [ message, setMessage ] = useState('');
    const chatScroll = React.createRef();

    useEffect(() => {
        props.user.getStreamManager().stream.session.on('signal:chat', (event) => {
            const data = JSON.parse(event.data);
            const newMessage = { connectionId: event.from.connectionId, nickname: data.nickname, message: data.message };
            // const document = window.document;
            // setTimeout(() => {
            //     const userImg = document.getElementById('userImg-' + (messageList.length - 1));
            //     const video = document.getElementById('video-' + data.streamId);
            //     const avatar = userImg.getContext('2d');
            //     avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
            //     props.messageReceived();
            // }, 50);
            setMessageList(prevNames => [...prevNames, newMessage]);
            scrollToBottom();
        });
    }, [])

    function handlePressKey(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    function sendMessage() {
        if (props.user && message) {
            let newMessage = message.replace(/ +(?= )/g, '');
            if (newMessage !== '' && newMessage !== ' ') {
                const data = { message: newMessage, nickname: props.user.getNickname(), streamId: props.user.getStreamManager().stream.streamId };
                props.user.getStreamManager().stream.session.signal({
                    data: JSON.stringify(data),
                    type: 'chat',
                });
            }
        }
        setMessage('');
    }

    function scrollToBottom() {
        setTimeout(() => {
            try {
                chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
            } catch (err) {}
        }, 20);
    }

    function close() {
        props.close(undefined);
    }

    return ( 
        <div id="chatContainer" className="chat-container">
                <div id="chatComponent" className="chat-component" style={styleChat}>
                    <div className="message-wrap" ref={chatScroll}>
                        {messageList.map((data, i) => (
                            <div
                                key={i}
                                id="remoteUsers"
                                className={
                                    'message' + (data.connectionId !== props.user.getConnectionId() ? ' left' : ' right')
                                }
                            >
                                <div id={'userImg-' + i} className="user-img" />
                                <div className="msg-detail">
                                    <div className="msg-info">
                                        <p> {data.nickname}</p>
                                    </div>
                                    <div className="msg-content">
                                        <p className="text">{data.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div id="messageInput" className="message-input-container">                        
                        <input 
                            placeholder="Send a message..."
                            id="chatInput"
                            value={message}
                            onChange={event => (setMessage(event.target.value))}
                            onKeyPress={handlePressKey}
                        />
                        <button id="sendButton" onClick={sendMessage} className="team-send-button">
                            Send
                        </button>
                        
                    </div>
                </div>
            </div>
     );
}
 
export default ChatComponent;