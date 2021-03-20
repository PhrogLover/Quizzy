import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/basic/Navbar';
import Footer from './components/basic/Footer';
import Login from './components/login/Login';
import Creator from './components/creator/Creator';
import Homepage from './components/homepage/Homepage';
import NotFound from './components/basic/NotFound';
import GetQuiz from './components/quiz/GetQuiz';
import GetVideoRoomComponent from "./components/GetVideoRoomComponent";
import GetProfile from './components/profile/GetProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Navbar />
        </header>
        <Switch>
          <Route exact path="/">
            <Homepage />
            <Footer/>
          </Route>
          <Route exact path="/profile">
            <GetProfile />
            <Footer/>
          </Route>
          <Route exact path="/mainLobby/teamLobby/:id">
            <GetVideoRoomComponent />
          </Route>
          <Route path="/mainLobby/:id">
            <GetQuiz />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/creator">
            <Creator />
          </Route>
          <Route path="*">
            <NotFound />
            <Footer/>
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
