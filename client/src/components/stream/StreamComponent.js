import { useState, useEffect } from 'react';
import './StreamComponent.css';
import OvVideoComponent from './OvVideo';

import MicOff from '@material-ui/icons/MicOff';
import VideocamOff from '@material-ui/icons/VideocamOff';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOff from '@material-ui/icons/VolumeOff';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import HighlightOff from '@material-ui/icons/HighlightOff';
import FormHelperText from '@material-ui/core/FormHelperText';

const StreamComponent = (props) => {
    const [ nickname, setNickname ] = useState(props.user.getNickname());
    const [ showForm, setShowForm ] = useState(false);
    const [ mutedSound, setMutedSound ] = useState(false);
    const [ isFormValid, setIsFormValid ] = useState(true);

    function handleChange(event) {
        setNickname(event.target.value);
        event.preventDefault();
    }

    function toggleNicknameForm() {
        if (props.user.isLocal()) {
            setShowForm(!showForm);
        }
    }

    function handlePressKey(event) {
        if (event.key === 'Enter') {
            console.log(nickname);
            if (nickname.length >= 3 && nickname.length <= 20) {
                props.handleNickname(nickname);
                toggleNicknameForm();
                setIsFormValid(true);
            } else {
                setIsFormValid(false);
            }
        }
    }

    return ( 
        <div className="OT_widget-container">
            <div className="pointer nickname">
                {showForm ? (
                    <FormControl id="nicknameForm">
                        <IconButton color="inherit" id="closeButton" onClick={toggleNicknameForm}>
                            <HighlightOff />
                        </IconButton>
                        <InputLabel htmlFor="name-simple" id="label">
                            Nickname
                        </InputLabel>
                        <Input
                            color="inherit"
                            id="input"
                            value={nickname}
                            onChange={handleChange}
                            onKeyPress={handlePressKey}
                            required
                        />
                        {!isFormValid && nickname.length <= 3 && (
                            <FormHelperText id="name-error-text">Nickname is too short!</FormHelperText>
                        )}
                        {!isFormValid && nickname.length >= 20 && (
                            <FormHelperText id="name-error-text">Nickname is too long!</FormHelperText>
                        )}
                    </FormControl>
                ) : (
                    <div onClick={toggleNicknameForm}>
                        <span id="nickname">{props.user.getNickname()}</span>
                        {props.user.isLocal() && <span id=""> (edit)</span>}
                    </div>
                )}
            </div>

            {props.user !== undefined && props.user.getStreamManager() !== undefined ? (
                <div className="streamComponent">
                    <OvVideoComponent user={props.user} mutedSound={mutedSound} />
                    <div id="statusIcons">
                        {!props.user.isVideoActive() ? (
                            <div id="camIcon">
                                <VideocamOff id="statusCam" />
                            </div>
                        ) : null}

                        {!props.user.isAudioActive() ? (
                            <div id="micIcon">
                                <MicOff id="statusMic" />
                            </div>
                        ) : null}
                    </div>
                    <div>
                        {!props.user.isLocal() && (
                            <IconButton id="volumeButton" onClick={() => (setMutedSound(!mutedSound))}>
                                {mutedSound ? <VolumeOff color="secondary" /> : <VolumeUp />}
                            </IconButton>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
 
export default StreamComponent;
