import { useEffect } from 'react';
import React from "react";
import './StreamComponent.css';

const OvVideoComponent = (props) => {
    const videoRef = React.createRef();

    useEffect(() => {
        if (props && props.user.streamManager && !!videoRef) {
            console.log('PROPS: ',  props);
             props.user.getStreamManager().addVideoElement(videoRef.current);
        }

        if (props && props.user.streamManager.session && props.user && !!videoRef) {
             props.user.streamManager.session.on('signal:userChanged', (event) => {
                const data = JSON.parse(event.data);
                if (data.isScreenShareActive !== undefined) {
                    props.user.getStreamManager().addVideoElement(videoRef.current);
                }
            });
        }
    }, [])

    useEffect(() => {
        if (props && !!videoRef) {
            props.user.getStreamManager().addVideoElement(videoRef.current);
        }
    }, [props])

    return ( 
        <video
                autoPlay={true}
                id={'video-' + props.user.getStreamManager().stream.streamId}
                ref={videoRef}
                muted={props.mutedSound}
        />
     );
}

export default OvVideoComponent;