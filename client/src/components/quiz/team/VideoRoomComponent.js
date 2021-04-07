import React, { useState, useEffect  } from 'react';
import './VideoRoomComponent.css';
import { OpenVidu } from 'openvidu-browser';
import $ from "jquery";
import StreamComponent from '../../stream/StreamComponent';
import ChatComponent from '../../chat/ChatComponent';
import UserModel from '../../../models/user-model';
import ToolbarComponent from '../../toolbar/ToolbarComponent';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TeamStream from './TeamStream';

let OV = null;
var localUserModel = new UserModel();
let leaveSessionVar = null;
let subscribers = [];

const VideoRoomComponent = (props) => {

    let sessionName = props.sessionName ? props.sessionName : 'SessionA';
    let userName = props.user ? props.user : 'OpenVidu_User' + Math.floor(Math.random() * 100);

    const [ mySessionId, setMySessionId ] = useState(sessionName);
    const [ myUserName, setMyUserName ] = useState(userName);
    const [ session, setSession ] = useState();
    const [ localUser, setLocalUser ] = useState();
    const [ subState, setSubState ] = useState([]);
    const [ chatDisplay, setChatDisplay ] = useState('none');
    const [ messageReceived, setMessageReceived ] = useState(false);
    const [ token, getToken ] = useState();

    function backHandler() {
        const newState = {
            type: "main"
        }
        props.setLobbyState(newState);
    }

    useEffect(() => {
        props.socket.on("team lobby get token room " + props.lobbyState.id, token => {
            getToken(token);
        })
    }, [])

    useEffect(() => {
        leaveSessionVar = session;
    }, [session]);

    useEffect(() => {
        setToggleIcon(!toggleIcon);
    }, [subState.length])

    useEffect(() => {
        window.addEventListener('beforeunload', onbeforeunload);
        joinSession();

        return () => {
            window.removeEventListener('beforeunload', onbeforeunload);
            leaveSession();
        }
    }, [])

    useEffect(() => {
        if(token && !localUser){
            console.log(token)
            connect(token);
        }
        else if (session) {
            console.log('There was an error getting the token ');
        }
    }, [token])

    function onbeforeunload(event) {
        leaveSession();
    }

    const [ sessionTimer, setSessionTimer ] = useState(false);

    useEffect(() => {
        if (session) {
            subscribeToStreamCreated();
            connectToSession();
        }
    }, [sessionTimer])

    function joinSession() {
        OV = new OpenVidu();
        setSession(OV.initSession());
        setSessionTimer(!sessionTimer);
    }

    function connectToSession() {
        if (props.token !== undefined) {
            //console.log('token received: ', this.props.token);
            connect(props.token);
        } else {
            props.socket.emit("team lobby start", mySessionId, "room "+props.lobbyState.id);
        }
    }

    function connect(token) {
        session
            .connect(
                token,
                { clientData: myUserName },
            )
            .then(() => {
                connectWebCam();
            })
            .catch((error) => {
                if(props.error){
                    props.error({ error: error.error, message: error.message, code: error.code, status: error.status });
                }
                alert('There was an error connecting to the session:', error.message);
                console.log('There was an error connecting to the session:', error.code, error.message);
            });
    }

    const [ userPublisher, setUserpublisher ] = useState(false);

    useEffect(() => {
        if (localUser) {
            localUser.getStreamManager().on('streamPlaying', (e) => {
                userPublisher.videos[0].video.parentElement.classList.remove('custom-class');
            });
        }
    }, [userPublisher])

    function connectWebCam() {
        let publisher = OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: localUserModel.isAudioActive(),
            publishVideo: localUserModel.isVideoActive(),
            resolution: '640x480',
            frameRate: 30,
            insertMode: 'APPEND',
        });

        if (session.capabilities.publish) {
            session.publish(publisher).then(() => {
                if (props.joinSession) {
                    props.joinSession();
                }
            });
        }
        localUserModel.setNickname(myUserName);
        localUserModel.setConnectionId(session.connection.connectionId);
        localUserModel.setScreenShareActive(false);
        localUserModel.setStreamManager(publisher);
        subscribeToUserChanged();
        subscribeToStreamDestroyed();

        setLocalUser(localUserModel);
        setUserpublisher(publisher);
    }

    function leaveSession() {
        if (leaveSessionVar) {
            leaveSessionVar.disconnect();
        }

        // Empty all properties...
        OV = null;
        setSession(undefined);
        console.log("LEAVE SESSION")
        subscribers = [];
        setSubState(subscribers);
        setMySessionId('SessionA');
        setMyUserName('OpenVidu_User' + Math.floor(Math.random() * 100));
        setLocalUser(undefined);
        if (props.leaveSession) {
            props.leaveSession();
        }
    }

    const [ toggleIcon, setToggleIcon ] = useState(false);

    function camStatusChanged() {
        localUserModel.setVideoActive(!localUserModel.isVideoActive());
        localUserModel.getStreamManager().publishVideo(localUserModel.isVideoActive());
        sendSignalUserChanged({ isVideoActive: localUserModel.isVideoActive() });
        setLocalUser(localUserModel);
        setToggleIcon(!toggleIcon);
    }

    function micStatusChanged() {
        localUserModel.setAudioActive(!localUserModel.isAudioActive());
        localUserModel.getStreamManager().publishAudio(localUserModel.isAudioActive());
        sendSignalUserChanged({ isAudioActive: localUserModel.isAudioActive() });
        setLocalUser(localUserModel);
        setToggleIcon(!toggleIcon);
    }

    function nicknameChanged(nickname) {
        let thisLocalUser = localUser;
        thisLocalUser.setNickname(nickname);
        setLocalUser(thisLocalUser);
        sendSignalUserChanged({ nickname: localUser.getNickname() });
    }

    function deleteSubscriber(stream) {
        const remoteUsers = $.extend(true, [], subscribers)
        const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
        let index = remoteUsers.indexOf(userStream, 0);
        if (index > -1) {
            remoteUsers.splice(index, 1);
            subscribers = $.extend(true, [], remoteUsers)
            setSubState(subscribers);
        }
    }

    function subscribeToStreamCreated() {
        session.on('streamCreated', (event) => {
            const subscriber = session.subscribe(event.stream, undefined);
            subscriber.on('streamPlaying', (e) => {
                subscriber.videos[0].video.parentElement.classList.remove('custom-class');
            });
            const newUser = new UserModel();
            newUser.setStreamManager(subscriber);
            newUser.setConnectionId(event.stream.connection.connectionId);
            newUser.setType('remote');
            const nickname = event.stream.connection.data.split('%')[0];
            newUser.setNickname(JSON.parse(nickname).clientData);
            let temp = $.extend(true, [], subscribers);
            temp.push(newUser);
            subscribers = $.extend(true, [], temp);
            setSubState(subscribers);     
            if (localUser) {
                sendSignalUserChanged({
                    isAudioActive: localUser.isAudioActive(),
                    isVideoActive: localUser.isVideoActive(),
                    nickname: localUser.getNickname(),
                    isScreenShareActive: localUser.isScreenShareActive(),
                });
            }
        });
    }

    function subscribeToStreamDestroyed() {
        // On every Stream destroyed...
        session.on('streamDestroyed', (event) => {
            // Remove the stream from 'subscribers' array
            deleteSubscriber(event.stream);
            event.preventDefault();
        });
    }

    function subscribeToUserChanged() {
        session.on('signal:userChanged', (event) => {
            let remoteUsers = $.extend(true, [], subscribers);
            remoteUsers.forEach((user) => {
                if (user.getConnectionId() === event.from.connectionId) {
                    const data = JSON.parse(event.data);
                    if (data.isAudioActive !== undefined) {
                        user.setAudioActive(data.isAudioActive);
                    }
                    if (data.isVideoActive !== undefined) {
                        user.setVideoActive(data.isVideoActive);
                    }
                    if (data.nickname !== undefined) {
                        user.setNickname(data.nickname);
                    }
                }
            });
            subscribers = $.extend(true, [], remoteUsers);
            setSubState(subscribers);
        });
    }

    function sendSignalUserChanged(data) {
        const signalOptions = {
            data: JSON.stringify(data),
            type: 'userChanged',
        };
        session.signal(signalOptions);
    }

    function toggleFullscreen() {
        const document = window.document;
        const fs = document.getElementById('container');
        if (
            !document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement
        ) {
            if (fs.requestFullscreen) {
                fs.requestFullscreen();
            } else if (fs.msRequestFullscreen) {
                fs.msRequestFullscreen();
            } else if (fs.mozRequestFullScreen) {
                fs.mozRequestFullScreen();
            } else if (fs.webkitRequestFullscreen) {
                fs.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    function toggleChat(property) {
        let display = property;

        if (display === undefined) {
            display = chatDisplay === 'none' ? 'block' : 'none';
        }
        if (display === 'block') {
            setChatDisplay(display);
            setMessageReceived(false);
        } else {
            console.log('chat', display);
            setChatDisplay(display);
        }
    }

    function checkNotification(event) {
        setMessageReceived(chatDisplay === 'none');
    }

    const [ddOpen, setddOpen] = useState(false);
    const closeDropdown = () => setddOpen(false);
    const [tcOpen,settcOpen] = useState(true);
    const closeTeamChat = () => settcOpen(false);



    const teamLobbyMenuRef = React.createRef();

    const quizStreamRef = React.createRef();

    useEffect(() => {
        resizeSlide()
    })

    function resizeSlide() {
        
        let sectionWidth= $("#quiz-stream-section").width();
        let sectionHeight= $("#quiz-stream-section").height();
        // let sectionHeight = quizStreamRef.current.offsetHeight;
        // let sectionWidth = quizStreamRef.current.offsetHeight;

        let newWidth=0;
        let newHeight=0;
        if (sectionHeight > sectionWidth) {
            newWidth = sectionWidth*0.9;
            newHeight = newWidth * 0.5625;
        }
         else{
            newHeight = sectionHeight*0.9;
            newWidth = newHeight * 1.7778;
         }


        // let newWidth = quizStreamRef.offsetWidth;
        // let newHeight = quizStreamRef.current.clientHeight;
        // console.log(newHeight);

        return {maxHeight: newHeight+"px", maxWidth: newWidth+ "px" };
    }


    function TeamLobbyMenu() {

        // const [activeMenu,setActiveMenu] = useState('main');
        
    
        function DropdownItem(props){
            return(
                <div className = "menu-item">
                    <div className="dropdown-icon"><i className= {props.icon}/></div>
                    {props.children}
                </div>        
            )}

        return (
            <>
                <ClickAwayListener onClickAway={closeDropdown}>
                    <div className="team-menu" ref={teamLobbyMenuRef}>
                        <DropdownItem icon={"bruh"}>
                            bruh
                        </DropdownItem>
                        
                    </div>
                </ClickAwayListener>
            </>
        );
    }

    return ( <>
            {!tcOpen &&
                <div className="open-team-button" onClick={() => settcOpen(true)} >
                    <i className="fas fa-comment"/>
                </div>
            }
        
            <div id="layout" className="team-lobby">
                <div className="team-lobby-left">
                    
                    <div className="members-stream-section">
                        <div className="user-stream-wrapper">
                            <div className="user-stream-container-ratio">
                                {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                                    
                                        <div className="user-stream-container">
                                            <div className="OT_root OT_publisher custom-class" id="localUser">
                                                <StreamComponent toggleIcon = {toggleIcon} user={localUser} handleNickname={nicknameChanged} />
                                            </div>
                                        </div>
                                    
                                )}
                            </div>
                            
                            
                        </div>
                        {/* <div className="user-stream-wrapper">
                                <div className="user-stream-container-ratio">
                                
                                </div>
                            </div>
                            <div className="user-stream-wrapper">
                                <div className="user-stream-container-ratio">
                                
                                </div>
                            </div>
                            <div className="user-stream-wrapper">
                                <div className="user-stream-container-ratio">
                                
                                </div>
                            </div>
                            <div className="user-stream-wrapper">
                                <div className="user-stream-container-ratio">
                                    
                                </div>
                            </div> */}
                        {subState.map((sub, i) => (
                            <div className="user-stream-wrapper">
                                <div className="user-stream-container-ratio">
                                    <div className="user-stream-container">
                                        <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers">
                                            <StreamComponent toggleIcon = {toggleIcon} user={sub} streamId={sub.streamManager.stream.streamId} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="team-lobby-toolbar">
                        <ToolbarComponent
                            sessionId={mySessionId}
                            user={localUser}
                            showNotification={messageReceived}
                            camStatusChanged={camStatusChanged}
                            micStatusChanged={micStatusChanged}
                            toggleFullscreen={toggleFullscreen}
                            leaveSession={leaveSession}
                            toggleChat={toggleChat}
                        />
                    </div>
                    <div id = "quiz-stream-section" className="quiz-stream-section" ref={quizStreamRef}>
                        <div className="quiz-slides-view" style={resizeSlide()}>                            
                            <TeamStream sessionName = { props.transmitSessionName } mainId = { props.mainId } lobbyId = { props.lobbyState.id } socket = { props.socket } quiz = { props.quiz } />
                        </div>
                    </div>
                </div>
                {tcOpen &&
                <div className="team-lobby-right">
                    <div className="collapse-team-button" onClick={() => settcOpen(false)} >
                        <i className="fas fa-arrow-right"/>
                    </div>
                    
                    <div className="team-chat-section">
                        <div className="answer-sheet-section">
                            <div className="answer-sheet-toolbar">
                                <button className="leave-team-button" type="button" onClick={backHandler}>
                                    <i className="fas fa-sign-out-alt"></i>
                                </button>
                                <div className="chat-label">
                                    Answer Sheet
                                </div>
                            </div>
                            
                            answer sheet here
                            
                        </div>
                        <div className="team-chat">
                            <div className="team-chat-toolbar">
                                <div className="chat-label">
                                    Team Chat
                                </div>
                                <div className="team-menu-toggle" onClick= {() => setddOpen(!ddOpen)}>                 
                                    <div className="team-toolbar-buttons">
                                        <i className="fas fa-ellipsis-h"/>
                                    </div>
                                </div>
                                {ddOpen && <TeamLobbyMenu/>}
                            </div>
                            {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                                <div className="OT_root OT_publisher custom-class" style={{ display: chatDisplay }}>
                                    <ChatComponent
                                        user={localUser}
                                        chatDisplay={chatDisplay}
                                        close={toggleChat}
                                        messageReceived={checkNotification}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    
                </div>
                }
            </div>
        
    </>
   );
}
 
export default VideoRoomComponent;
