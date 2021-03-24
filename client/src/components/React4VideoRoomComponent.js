import { useState, useEffect } from 'react';
import './VideoRoomComponent.css';
import { OpenVidu } from 'openvidu-browser';
import StreamComponent from './stream/StreamComponent';
import DialogExtensionComponent from './dialog-extension/DialogExtension';
import ChatComponent from './chat/ChatComponent';

import OpenViduLayout from '../layout/openvidu-layout';
import UserModel from '../models/user-model';
import ToolbarComponent from './toolbar/ToolbarComponent';
import { CenterFocusWeakTwoTone } from '@material-ui/icons';

const VideoRoomComponent = (props) => {
    //let localUser = ;

    let hasBeenUpdated = false;
    let layout = new OpenViduLayout();
    let sessionName = props.sessionName ? props.sessionName : 'SessionA';
    let userName = props.user ? props.user : 'OpenVidu_User' + Math.floor(Math.random() * 100);

    const [ mySessionId, setMySessionId ] = useState(sessionName);
    const [ myUserName, setMyUserName ] = useState(userName);
    const [ session, setSession ] = useState();
    const [ localUser, setLocalUser ] = useState(new UserModel());
    const [ subscribers, setSubscribers ] = useState([]);
    const [ chatDisplay, setChatDisplay ] = useState('none');
    const [ showExtensionDialog, setShowExtensionDialog ] = useState(false);
    const [ messageReceived, setMessageReceived ] = useState(false);
    const [ OV, setOV ] = useState(null);

    useEffect(() => {
        const openViduLayoutOptions = {
            maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
            minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
            fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
            bigClass: 'OV_big', // The class to add to elements that should be sized bigger
            bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
            bigFixedRatio: false, // fixedRatio for the big ones
            bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
            bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
            bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
            animate: true, // Whether you want to animate the transitions
        };

        layout.initLayoutContainer(document.getElementById('layout'), openViduLayoutOptions);
        window.addEventListener('beforeunload', onbeforeunload);
        window.addEventListener('resize', updateLayout);
        window.addEventListener('resize', checkSize);
        joinSession();

        return () => {
            window.removeEventListener('beforeunload', onbeforeunload);
            window.removeEventListener('resize', updateLayout);
            window.removeEventListener('resize', checkSize);
            leaveSession();
        }
    })

    useEffect(() => {
        const token = props.token;
        if(token){
            connect(token);
        }
        else {
            console.log('There was an error getting the token');
            alert('There was an error getting the token');
        }
    }, [props.token])

    function onbeforeunload(event) {
        leaveSession();
    }

    function joinSession() {
        setOV(new OpenVidu());
        setSession(OV.initSession());
        subscribeToStreamCreated();
        connectToSession();
        // this.setState(
        //     {
        //         session: this.OV.initSession(),
        //     },
        //     () => {
        //         this.subscribeToStreamCreated();

        //         this.connectToSession();
        //     },
        // );
    }

    function connectToSession() {
        if (props.token !== undefined) {
            //console.log('token received: ', this.props.token);
            connect(props.token);
        } else {
            props.socket.emit("team lobby start", mySessionId);
        }
    }

    function connect(token) {
        console.log(token);
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
                    props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
                }
                alert('There was an error connecting to the session:', error.message);
                console.log('There was an error connecting to the session:', error.code, error.message);
            });
    }

    function connectWebCam() {
        let publisher = OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
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
        localUser.setNickname(myUserName);
        localUser.setConnectionId(session.connection.connectionId);
        localUser.setScreenShareActive(false);
        localUser.setStreamManager(publisher);
        subscribeToUserChanged();
        subscribeToStreamDestroyed();
        sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });

        setLocalUser(localUser);
        localUser.getStreamManager().on('streamPlaying', (e) => {
            updateLayout();
            publisher.videos[0].video.parentElement.classList.remove('custom-class');
        });
        // this.setState({ localUser: localUser }, () => {
        //     this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
        //         this.updateLayout();
        //         publisher.videos[0].video.parentElement.classList.remove('custom-class');
        //     });
        // });
    }

    function leaveSession() {
        const mySession = session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        setOV(null);
        setSession(undefined);
        setSubscribers([]);
        setMySessionId('SessionA');
        setMyUserName('OpenVidu_User' + Math.floor(Math.random() * 100));
        setLocalUser(undefined);
        if (props.leaveSession) {
            props.leaveSession();
        }
    }

    function camStatusChanged() {
        localUser.setVideoActive(!localUser.isVideoActive());
        localUser.getStreamManager().publishVideo(localUser.isVideoActive());
        sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
        setLocalUser(localUser);
    }

    function micStatusChanged() {
        localUser.setAudioActive(!localUser.isAudioActive());
        localUser.getStreamManager().publishAudio(localUser.isAudioActive());
        sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
        setLocalUser(localUser);
    }

    function nicknameChanged(nickname) {
        let thisLocalUser = localUser;
        thisLocalUser.setNickname(nickname);
        setLocalUser(thisLocalUser);
        sendSignalUserChanged({ nickname: localUser.getNickname() });
    }

    function deleteSubscriber(stream) {
        const remoteUsers = subscribers;
        const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
        let index = remoteUsers.indexOf(userStream, 0);
        if (index > -1) {
            remoteUsers.splice(index, 1);
            setSubscribers(remoteUsers);
        }
    }

    function subscribeToStreamCreated() {
        session.on('streamCreated', (event) => {
            const subscriber = session.subscribe(event.stream, undefined);
            subscriber.on('streamPlaying', (e) => {
                checkSomeoneShareScreen();
                subscriber.videos[0].video.parentElement.classList.remove('custom-class');
            });
            const newUser = new UserModel();
            newUser.setStreamManager(subscriber);
            newUser.setConnectionId(event.stream.connection.connectionId);
            newUser.setType('remote');
            const nickname = event.stream.connection.data.split('%')[0];
            newUser.setNickname(JSON.parse(nickname).clientData);
            setSubscribers(prevState => ([...prevState, newUser]));
            if (localUser) {
                sendSignalUserChanged({
                    isAudioActive: localUser.isAudioActive(),
                    isVideoActive: localUser.isVideoActive(),
                    nickname: localUser.getNickname(),
                    isScreenShareActive: localUser.isScreenShareActive(),
                });
            }
            updateLayout();
            // this.setState(
            //     {
            //         subscribers: subscribers,
            //     },
            //     () => {
            //         if (this.state.localUser) {
            //             this.sendSignalUserChanged({
            //                 isAudioActive: this.state.localUser.isAudioActive(),
            //                 isVideoActive: this.state.localUser.isVideoActive(),
            //                 nickname: this.state.localUser.getNickname(),
            //                 isScreenShareActive: this.state.localUser.isScreenShareActive(),
            //             });
            //         }
            //         this.updateLayout();
            //     },
            // );
        });
    }

    function subscribeToStreamDestroyed() {
        // On every Stream destroyed...
        session.on('streamDestroyed', (event) => {
            // Remove the stream from 'subscribers' array
            deleteSubscriber(event.stream);
            setTimeout(() => {
                checkSomeoneShareScreen();
            }, 20);
            event.preventDefault();
            updateLayout();
        });
    }

    function subscribeToUserChanged() {
        session.on('signal:userChanged', (event) => {
            let remoteUsers = subscribers;
            remoteUsers.forEach((user) => {
                if (user.getConnectionId() === event.from.connectionId) {
                    const data = JSON.parse(event.data);
                    console.log('EVENTO REMOTE: ', event.data);
                    if (data.isAudioActive !== undefined) {
                        user.setAudioActive(data.isAudioActive);
                    }
                    if (data.isVideoActive !== undefined) {
                        user.setVideoActive(data.isVideoActive);
                    }
                    if (data.nickname !== undefined) {
                        user.setNickname(data.nickname);
                    }
                    if (data.isScreenShareActive !== undefined) {
                        user.setScreenShareActive(data.isScreenShareActive);
                    }
                }
            });
            setSubscribers(remoteUsers);
            checkSomeoneShareScreen()
            // this.setState(
            //     {
            //         subscribers: remoteUsers,
            //     },
            //     () => this.checkSomeoneShareScreen(),
            // );
        });
    }

    function updateLayout() {
        setTimeout(() => {
            layout.updateLayout();
        }, 20);
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

    function screenShare() {
        const videoSource = navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
        const publisher = OV.initPublisher(
            undefined,
            {
                videoSource: videoSource,
                publishAudio: localUser.isAudioActive(),
                publishVideo: localUser.isVideoActive(),
                mirror: false,
            },
            (error) => {
                if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
                    setShowExtensionDialog(true);
                } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
                    alert('Your browser does not support screen sharing');
                } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
                    alert('You need to enable screen sharing extension');
                } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
                    alert('You need to choose a window or application to share');
                }
            },
        );

        publisher.once('accessAllowed', () => {
            session.unpublish(localUser.getStreamManager());
            localUser.setStreamManager(publisher);
            session.publish(localUser.getStreamManager()).then(() => {
                localUser.setScreenShareActive(true);
                setLocalUser(localUser);
                sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() })
                // this.setState({ localUser: localUser }, () => {
                //     this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });
                // });
            });
        });
        publisher.on('streamPlaying', () => {
            updateLayout();
            publisher.videos[0].video.parentElement.classList.remove('custom-class');
        });
    }

    function closeDialogExtension() {
        setShowExtensionDialog(false);
    }

    function stopScreenShare() {
        session.unpublish(localUser.getStreamManager());
        connectWebCam();
    }

    function checkSomeoneShareScreen() {
        let isScreenShared;
        // return true if at least one passes the test
        isScreenShared = subscribers.some((user) => user.isScreenShareActive()) || localUser.isScreenShareActive();
        const openviduLayoutOptions = {
            maxRatio: 3 / 2,
            minRatio: 9 / 16,
            fixedRatio: isScreenShared,
            bigClass: 'OV_big',
            bigPercentage: 0.8,
            bigFixedRatio: false,
            bigMaxRatio: 3 / 2,
            bigMinRatio: 9 / 16,
            bigFirst: true,
            animate: true,
        };
        layout.setLayoutOptions(openviduLayoutOptions);
        updateLayout();
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
        updateLayout();
    }

    function checkNotification(event) {
        setMessageReceived(chatDisplay === 'none');
    }
    
    function checkSize() {
        if (document.getElementById('layout').offsetWidth <= 700 && !hasBeenUpdated) {
            toggleChat('none');
            hasBeenUpdated = true;
        }
        if (document.getElementById('layout').offsetWidth > 700 && hasBeenUpdated) {
            hasBeenUpdated = false;
        }
    }

    return ( <div className="container" id="container">
        <ToolbarComponent
            sessionId={mySessionId}
            user={localUser}
            showNotification={messageReceived}
            camStatusChanged={camStatusChanged}
            micStatusChanged={micStatusChanged}
            screenShare={screenShare}
            stopScreenShare={stopScreenShare}
            toggleFullscreen={toggleFullscreen}
            leaveSession={leaveSession}
            toggleChat={toggleChat}
        />

        <DialogExtensionComponent showDialog={showExtensionDialog} cancelClicked={closeDialogExtension} />

        <div id="layout" className="bounds">
            {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                <div className="OT_root OT_publisher custom-class" id="localUser">
                    <StreamComponent user={localUser} handleNickname={nicknameChanged} />
                </div>
            )}
            {subscribers.map((sub, i) => (
                <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers">
                    <StreamComponent user={sub} streamId={sub.streamManager.stream.streamId} />
                </div>
            ))}
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
    </div> );
}
 
export default VideoRoomComponent;
