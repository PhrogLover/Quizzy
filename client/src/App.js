import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Navbar from './components/basic/Navbar';
import Footer from './components/basic/Footer';
import Login from './components/login/Login';
import Creator from './components/creator/Creator';
import Homepage from './components/homepage/Homepage';
import NotFound from './components/basic/NotFound';
import GetQuiz from './components/quiz/GetQuiz';
import GetProfile from './components/profile/GetProfile';
import LoginRerouter from './components/login/LoginRerouter';
import LoginDerouter from './components/login/LoginDerouter';
import TestLeaderboard from './components/quiz/host/TestLeaderboard';

function App() {
  const [ googleObj, setGoogleObj ] = useState({
    email: "quizzyapp.dev@gmail.com",
    familyName: "Admin",
    givenName: "Quizzy",
    id: "106812796264951400312",
    imageUrl: "https://lh5.googleusercontent.com/-a7zvn0K9S3I/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnDv_BhF6AuY08z9CbmJ-F9pFYIjA/s96-c/photo.jpg",
    name: "Quizzy Admin"
  });

  console.log(new Date().toString());

  // {
  //   email: "aryjeleng@gmail.com",
  //   familyName: "Lengvenis",
  //   givenName: "Arijus",
  //   id: "112380395290543152389",
  //   imageUrl: "https://lh3.googleusercontent.com/-3hP2gkuIj-M/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckUVLf3SPlN7M1LkxUym_XQw6sYAw/s96-c/photo.jpg",
  //   name: "Arijus Lengvenis"
  // }

  // {
  //   email: "quizzyapp.dev@gmail.com",
  //   familyName: "Admin",
  //   givenName: "Quizzy",
  //   id: "106812796264951400312",
  //   imageUrl: "https://lh5.googleusercontent.com/-a7zvn0K9S3I/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnDv_BhF6AuY08z9CbmJ-F9pFYIjA/s96-c/photo.jpg",
  //   name: "Quizzy Admin"
  // }

  function onSuccessGoogle({ profileObj }) {
    const url = "http://localhost:5000/api/profiles/"+profileObj.googleId;
    fetch(url)
    .then(res => {
        if (!res.ok) {
            throw Error('Could not fetch the data for that resource.')
        }
        return res.json();
    })
    .then((data) => {
      console.log(data);
        if (!data.msg) {
          const userObj = {
            id: profileObj.googleId,
            name: data.username,
            imageUrl: data.imageUrl,
            email: data.email
          }
          console.log(userObj)
          setGoogleObj(userObj);
        }
        else {
          const userObj = {
            id: profileObj.googleId,
            name: profileObj.name,
            imageUrl: profileObj.imageUrl,
            email: profileObj.email,
          }
          const userObjSend = {
            id: profileObj.googleId,
            name: profileObj.name,
            imageUrl: profileObj.imageUrl,
            email: profileObj.email,
            donor: false, 
            status: "New User",
            registerTime: new Date().toString(),
            created: 0,
            hosted: 0,
            won: 0,
            answered: 0,
            participated:0,
            seasonal: 0,
            partOfTeam: false,
            teamName: "",
            rating: 4,
            numberOfRatings: 1
          }
          //additional stats as well.
          console.log(userObjSend)
          fetch('http://localhost:5000/api/profiles/add', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(userObjSend)
        }).then(setGoogleObj(userObj));
        }
    })
    .catch((err) => {
        console.log(err);
    })
    setGoogleObj(profileObj);
  }

  function onFailureGoogle(err) {
    console.log(err);
  }

  const ENDPOINT = "http://localhost:5000/";
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
      return () => socket.disconnect();
  }, []);

  return (
      <div className="App">
        <Router>
          { googleObj && 
          <header>
            <Navbar user={googleObj} setGoogleObj = { setGoogleObj }/>
          </header> }
          <Switch>
            { !googleObj && <>
            <Route exact path="/login">
              <Login onSuccessGoogle = { onSuccessGoogle } onFailureGoogle = { onFailureGoogle }/>
            </Route> 
            <Route path="*">
              <LoginRerouter />
            </Route> </>}
            { googleObj && <>
            <Route exact path="/login">
              <LoginDerouter />
            </Route>
            <Route exact path="/test">
              <TestLeaderboard user = { googleObj }/>
            </Route>
            <Route exact path="/">
              <Homepage user={googleObj} />
              <Footer/>
            </Route>
            <Route exact path="/profile">
              <GetProfile user={googleObj} socket={socket} />
              <Footer/>
            </Route>
            <Route exact path="/mainLobby/:id">
              <GetQuiz user={googleObj} socket={socket} />
            </Route>
            <Route exact path="/creator">
              <Creator user={googleObj} />
            </Route> 
            </>}
            { googleObj &&
              <Route path="*">
                <NotFound />
                <Footer/>
              </Route> }
          </Switch>
        </Router>
      </div>
    
  );
}

export default App;
