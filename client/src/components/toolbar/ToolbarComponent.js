import { useState } from 'react';
import './ToolbarComponent.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import Tooltip from '@material-ui/core/Tooltip';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';

import IconButton from '@material-ui/core/IconButton';

const logo = require('../../assets/images/openvidu_logo.png');

const ToolbarComponent = (props) => {
    const mySessionId = props.sessionId;
    const localUser = props.user;
    const [ fullscreen, setFullscreen ] = useState(false);
    const [counter, setCounter ] = useState(0)

    function toggleFullscreen() {
        setFullscreen(!fullscreen);
        props.toggleFullscreen();
    }

    function micStatusChanged() {
        props.micStatusChanged();
        setCounter(counter+1);
    }

    function camStatusChanged() {
        props.camStatusChanged();
        setCounter(counter+1);
    }

    function leaveSession() {
        props.leaveSession();
    }

    function toggleChat() {
        props.toggleChat();
    }

    return ( 
        <AppBar className="toolbar" id="header">
                <Toolbar className="toolbar">
                    <div id="navSessionInfo">
                        <img
                            id="header_img"
                            alt="OpenVidu Logo"
                            src={logo}
                        />

                        {props.sessionId && <div id="titleContent">
                            <span id="session-title">{mySessionId}</span>
                        </div>}
                    </div>

                    <div className="buttonsContent">
                        <IconButton color="inherit" className="navButton" id="navMicButton" onClick={micStatusChanged}>
                            {localUser !== undefined && localUser.isAudioActive() ? <Mic /> : <MicOff color="secondary" />}
                        </IconButton>

                        <IconButton color="inherit" className="navButton" id="navCamButton" onClick={camStatusChanged}>
                            {localUser !== undefined && localUser.isVideoActive() ? (
                                <Videocam />
                            ) : (
                                <VideocamOff color="secondary" />
                            )}
                        </IconButton>

                        <IconButton color="inherit" className="navButton" onClick={toggleFullscreen}>
                            {localUser !== undefined && fullscreen ? <FullscreenExit /> : <Fullscreen />}
                        </IconButton>
                        <IconButton color="secondary" className="navButton" onClick={leaveSession} id="navLeaveButton">
                            <PowerSettingsNew />
                        </IconButton>
                         <IconButton color="inherit" onClick={toggleChat} id="navChatButton">
                            {props.showNotification && <div id="point" className="" />}
                            <QuestionAnswer />
                            {/* <Tooltip title="Chat">
                                
                            </Tooltip> */}
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
     );
}
 
export default ToolbarComponent;
