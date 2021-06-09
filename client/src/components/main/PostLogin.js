import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";
import Navbar from '../basic/Navbar';
import Footer from '../basic/Footer';
import Creator from '../creator/Creator';
import Homepage from '../homepage/Homepage';
import NotFound from '../basic/NotFound';
import GetQuiz from '../quiz/GetQuiz';
import GetProfile from '../profile/GetProfile';
import LoginDerouter from '../login/LoginDerouter';

let sock;

const PostLogin = ({ user, setGoogleObj }) => {

    const ENDPOINT = "http://localhost:5000/";
    const [ socket, setSocket ] = useState();
    
    useEffect(() => {
      if (socket) sock = socket;
    }, [socket])

    useEffect(() => {
        setSocket(socketIOClient(ENDPOINT));
        return () => sock.disconnect();
    }, []);

    return ( 
        <Router>
          <header>
            <Navbar user={user} setGoogleObj = { setGoogleObj }/>
          </header>
          <Switch>
            <Route exact path="/login">
              <LoginDerouter />
            </Route>
            <Route exact path="/">
              <Homepage user={user} />
              <Footer/>
            </Route>
            <Route exact path="/profile">
              <GetProfile user={user} socket={socket} />
              <Footer/>
            </Route>
            <Route exact path="/mainLobby/:id">
              <GetQuiz user={user} socket={socket} />
            </Route>
            <Route exact path="/creator">
              <Creator user={user} />
            </Route>
              <Route path="*">
                <NotFound />
                <Footer/>
              </Route>
          </Switch>
        </Router>
     );
}
 
export default PostLogin;