import React, { useState, useEffect  } from 'react';
import "./hostview.css";
import { OpenVidu } from 'openvidu-browser';
import $ from "jquery";
import StreamComponent from '../../stream/StreamComponent';
import UserModel from '../../../models/user-model';
import ToolbarComponent from '../../toolbar/ToolbarComponent';
import SlideScript from '../SlideScript';
import HostStream from './HostStream';


const HostView = ({ id, socket, quiz }) => {

    return ( 
        <div id="layout" className="host-lobby">
            <div className="bruh">
                HELLLLOOOOO
            </div>
           <HostStream mainId = { id } socket = { socket } quiz={ quiz } sessionName={"MainQuiz"+id}/>
        </div>
   );
}
 
export default HostView;
