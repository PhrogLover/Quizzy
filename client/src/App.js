import './App.css';
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

function App() {
  const [ googleObj, setGoogleObj ] = useState({
    email: "aryjeleng@gmail.com",
    familyName: "Lengvenis",
    givenName: "Arijus",
    googleId: "112380395290543152389",
    imageUrl: "https://lh3.googleusercontent.com/-3hP2gkuIj-M/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckUVLf3SPlN7M1LkxUym_XQw6sYAw/s96-c/photo.jpg",
    name: "Arijus Lengvenis"
  });

  function onSuccessGoogle({ profileObj }) {
    console.log(profileObj)
    setGoogleObj(profileObj);
  }

  function onFailureGoogle(err) {
    console.log(err);
  }

  return (
      <div className="App">
        <Router>
          <header>
            <Navbar user={googleObj} setGoogleObj = { setGoogleObj }/>
          </header>
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
            <Route exact path="/">
              <Homepage user={googleObj} />
              <Footer/>
            </Route>
            <Route exact path="/profile">
              <GetProfile user={googleObj} />
              <Footer/>
            </Route>
            <Route exact path="/mainLobby/:id">
              <GetQuiz user={googleObj} />
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
