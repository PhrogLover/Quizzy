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
        console.log('this was set');
        props.user.getStreamManager().stream.session.on('signal:chat', (event) => {
            const data = JSON.parse(event.data);
            const newMessage = { connectionId: event.from.connectionId, nickname: data.nickname, message: data.message };
            setMessageList(prevNames => [...prevNames, newMessage]);
            scrollToBottom();
        });
    }, [])

    useEffect(() => {
        console.log("hello?");
        console.log(messageList);
    }, [messageList])

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
                console.log('message sent woohoo');
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
        <div id="chatContainer">
                <div id="chatComponent" style={styleChat}>
                    <div id="chatToolbar">
                        <span>{props.user.getStreamManager().stream.session.sessionId} - CHAT</span>
                        <IconButton id="closeButton" onClick={close}>
                            <HighlightOff color="secondary" />
                        </IconButton>
                    </div>
                    <div className="message-wrap" ref={chatScroll}>
                        {messageList.map((data, i) => (
                            <div
                                key={i}
                                id="remoteUsers"
                                className={
                                    'message' + (data.connectionId !== props.user.getConnectionId() ? ' left' : ' right')
                                }
                            >
                                <canvas id={'userImg-' + i} width="60" height="60" className="user-img" />
                                <div className="msg-detail">
                                    <div className="msg-info">
                                        <p> {data.nickname}</p>
                                    </div>
                                    <div className="msg-content">
                                        <span className="triangle" />
                                        <p className="text">{data.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div id="messageInput">
                        <input
                            placeholder="Send a messge"
                            id="chatInput"
                            value={message}
                            onChange={event => (setMessage(event.target.value))}
                            onKeyPress={handlePressKey}
                        />
                        <Tooltip title="Send message">
                            <Fab size="small" id="sendButton" onClick={sendMessage}>
                                <Send />
                            </Fab>
                        </Tooltip>
                    </div>
                </div>
            </div>
     );
}
 
export default ChatComponent;