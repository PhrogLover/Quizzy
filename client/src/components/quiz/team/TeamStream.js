import React, { useState, useEffect  } from 'react';
import "./TeamStream.css";
import { OpenVidu } from 'openvidu-browser';
import $ from "jquery";
import StreamComponent from '../../stream/StreamComponent';
import UserModel from '../../../models/user-model';
import SlideView from '../SlideView';

let OV = null;
var localUserModel = new UserModel();
let leaveSessionVar = null;
let subscribers = [];

const TeamStream = (props) => {

    let sessionName = props.sessionName ? props.sessionName : 'SessionA';
    let userName = props.user ? props.user : 'OpenVidu_User' + Math.floor(Math.random() * 100);

    const [ mySessionId, setMySessionId ] = useState(sessionName);
    const [ myUserName, setMyUserName ] = useState(userName);
    const [ session, setSession ] = useState();
    const [ localUser, setLocalUser ] = useState();
    const [ subState, setSubState ] = useState([]);
    const [ token, getToken ] = useState();
    const [ slideData, setSlideData ] = useState({
        slide: null,
        round: -1,
        question: 0
    });

    const emptySlide = {
        id: 0,
        type: "none",
        title: " ",
        img: ""
    }

    useEffect(() => {
        props.socket.on("team lobby get token stream " + props.lobbyId, token => {
            getToken(token);
        })

        props.socket.on("slide data "+props.mainId, data => {
            let slideBundle = data;
            if (slideBundle.round === -1) {
                slideBundle.slide = emptySlide;
            }
            else if (slideBundle.question === -1) {
                slideBundle.slide = props.quiz.slides[slideBundle.round];
            }
            else {
                slideBundle.slide = props.quiz.slides[slideBundle.round][slideBundle.question];
            }
            setSlideData(slideBundle);
        })
    }, [])

    useEffect(() => {
        setToggleIcon(!toggleIcon);
    }, [slideData])

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
            connect(props.token);
        } else {
            props.socket.emit("team lobby start", mySessionId, "stream "+props.lobbyId);
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

    function connectWebCam() {
        // let publisher = OV.initPublisher(undefined, {
        //     audioSource: undefined,
        //     videoSource: undefined,
        //     publishAudio: localUserModel.isAudioActive(),
        //     publishVideo: localUserModel.isVideoActive(),
        //     resolution: '640x480',
        //     frameRate: 30,
        //     insertMode: 'APPEND',
        // });

        // if (session.capabilities.publish) {
        //     session.publish(publisher).then(() => {
        //         if (props.joinSession) {
        //             props.joinSession();
        //         }
        //     });
        // }
        localUserModel.setNickname(myUserName);
        localUserModel.setConnectionId(session.connection.connectionId);
        localUserModel.setScreenShareActive(false);
        // localUserModel.setStreamManager(publisher);
        subscribeToUserChanged();
        subscribeToStreamDestroyed();

        setLocalUser(localUserModel);
        props.socket.emit('ping host', props.mainId);
        // setUserpublisher(publisher);
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

    return ( 
                <div className="slide-stream">
                    { slideData && slideData.slide && <SlideView quiz = {props.quiz} slide = {slideData.slide} error = {slideData.error} showAns = {slideData.showAns} timer = {slideData.timer} slideWidthPass = {slideData.slideWidthPass} toggleIcon={toggleIcon}/> }
                    <div className="hosts-cameras">
                    {subState.map((sub, i) => (
                        <div key={i} className="user-stream-wrapper">
                            <div className="user-stream-container-ratio">
                                <div className="user-stream-container">
                                    <div className="OT_root OT_publisher custom-class" id="remoteUsers">
                                        <StreamComponent toggleIcon = {toggleIcon} user={sub} streamId={sub.streamManager.stream.streamId} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
   );
}
 
export default TeamStream;
