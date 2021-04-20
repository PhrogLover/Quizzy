import React, { useState, useEffect  } from 'react';
import './TeamLobby.css';
import { OpenVidu } from 'openvidu-browser';
import $ from "jquery";
import StreamComponent from '../../stream/StreamComponent';
import ChatComponent from '../../chat/ChatComponent';
import UserModel from '../../../models/user-model';
import ToolbarComponent from '../../toolbar/ToolbarComponent';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TeamStream from './TeamStream';
import AnswerSheet from './AnswerSheet';
import HostReview from './HostReview';

let OV = null;
var localUserModel = new UserModel();
let leaveSessionVar = null;
let subscribers = [];
let outerTemp = [];

const TeamLobby = (props) => {

    let sessionName = props.sessionName;
    let userName = props.user.name;

    const [ mySessionId, setMySessionId ] = useState(sessionName);
    const [ myUserName, setMyUserName ] = useState(userName);
    const [ session, setSession ] = useState();
    const [ localUser, setLocalUser ] = useState();
    const [ subState, setSubState ] = useState([]);
    const [ chatDisplay, setChatDisplay ] = useState('none');
    const [ messageReceived, setMessageReceived ] = useState(false);
    const [ token, getToken ] = useState();
    const [ answerSheetVisible, setAnswerSheetVisible ] = useState(false);
    const [ endOfQuiz, setEndOfQuiz ] = useState(false);
    const [ answerSheet, setAnswerSheet ] = useState(initState());

    function initState() {
        let answers = [];
        for (let i = 0; i < props.quiz.numberOfQuestions; i++) {
            answers.push({
                index: i+1,
                value: ""
            });
        }
        return answers;
    }

    function sendAnswerSheet() {
        props.socket.emit('send sheet', outerTemp, props.lobbyState.id, props.mainId);
        setAnswerSheet(initState());
        setAnswerSheetVisible(false);
    }

    useEffect(() => {
        outerTemp = answerSheet;
    }, [answerSheet])

    function backHandler() {
        const newState = {
            type: "main"
        }
        props.setUserState("spectator");
        props.setLobbyState(newState);
        props.setgcOpen(true);
        console.log(props.userState);
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
        window.addEventListener('resize', () => {setQuizStreamSize(resizeSlide())});
        window.addEventListener('beforeunload', onbeforeunload);
        props.setUserState("player");
        console.log(props.userState);
        joinSession();
        

        return () => {
            window.removeEventListener('beforeunload', onbeforeunload);
            leaveSession();
            let newLobbyData = $.extend(true, [], props.lobbyData);
            for (let i = 0; i < newLobbyData.length; i++) {
                if (newLobbyData[i].id === props.lobbyState.id) {
                    newLobbyData[i].players = newLobbyData[i].players.filter(player => (player.id !== props.user.id));
                    break;
                }
            }
            props.socket.emit('lobby data change', props.mainId, newLobbyData);
            
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
            const sendWindow = {
                confirm: window.confirm,
                assign: window.location.assign
            }
            props.socket.emit("team lobby start", mySessionId, "room "+props.lobbyState.id, sendWindow);
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

    const [ slideSize, setSlideSize ] = useState("qss-normal");

    useEffect(() => {
        if (tcOpen) setSlideSize("qss-normal");
        else setSlideSize("qss-wide");
    }, [tcOpen])

    const teamLobbyMenuRef = React.createRef();

    const quizStreamRef = React.createRef();

    const [ quizStreamSize, setQuizStreamSize ] = useState(resizeSlide());

    useEffect(() => {
        setQuizStreamSize(resizeSlide());
    },[slideSize])

    function resizeSlide() {
        let sectionWidth= $("#quiz-stream-section").width();
        let sectionHeight= $("#quiz-stream-section").height();

        let newWidth=0;
        let newHeight=0;
        if (sectionHeight > (0.5625*sectionWidth)) {
            newWidth = sectionWidth;
            newHeight = newWidth * 0.5625;
        }
         else{
            newHeight = sectionHeight;
            newWidth = newHeight * 1.7778;
         }

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
                    <i className="fas fa-bars"/>
                </div>
            }
        
            <div id="layout" className="team-lobby">
                <div className={"team-lobby-left " + (tcOpen? "tll-normal":"tll-wide")}>
                    <div className={"members-stream-section " + (tcOpen? "mss-normal":"mss-wide")} >
                        <div className={"user-stream-wrapper "  + (tcOpen? "usw-normal":"usw-wide")}>
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
                        {subState.map((sub, i) => (
                            <div className={"user-stream-wrapper "  + (tcOpen? "usw-normal":"usw-wide")}>
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
                    <div className={"team-lobby-toolbar "+ (tcOpen? "tlt-normal":"tlt-wide")}>
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
                    <div id = "quiz-stream-section" className={"quiz-stream-section " + slideSize} ref={quizStreamRef}>
                        <div className="quiz-slides-view" style={quizStreamSize}>                            
                            <TeamStream teamList = { props.teamList } user = { props.user } sendAnswerSheet ={sendAnswerSheet} sessionName = { props.transmitSessionName } mainId = { props.mainId } lobbyId = { props.lobbyState.id } socket = { props.socket } quiz = { props.quiz } answerSheetVisible={answerSheetVisible} setAnswerSheetVisible = { setAnswerSheetVisible } setEndOfQuiz = { setEndOfQuiz } />
                        </div>
                    </div>
                </div>
                {tcOpen &&
                <div className="team-lobby-right">
                    
                    <div className="team-chat-section">
                        <div className="answer-sheet-section">
                            <div className="answer-sheet-toolbar">
                                <button className="leave-team-button" type="button" onClick={backHandler}>
                                    <i className="fas fa-sign-out-alt"></i>
                                </button>
                                <div className="chat-label">
                                    Answer Sheet
                                </div>
                                <div className="collapse-team-button" onClick={() => settcOpen(false)} >
                                    <i className="fas fa-arrow-right"/>
                                </div>
                            </div>
                            
                            { localUser && answerSheetVisible && !endOfQuiz && <AnswerSheet lobbyId = { props.lobbyState.id } socket = { props.socket } sendAnswerSheet = { sendAnswerSheet } answerSheet = { answerSheet } setAnswerSheet = {setAnswerSheet} /> }
                            { localUser && !answerSheetVisible && !endOfQuiz && <div className="no-answer-sheet">Waiting For Questions...</div> }
                            { localUser && endOfQuiz && <HostReview hostId = { props.quiz.creatorId } /> }
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
                                <div className="OT_root OT_publisher custom-class" style={{ display: true }}>
                                    <ChatComponent
                                        profilePic = { props.user.imageUrl }
                                        user={localUser}
                                        chatDisplay={true}
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
 
export default TeamLobby;
