import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/basic/Navbar';
import Footer from './components/basic/Footer';
import Login from './components/login/Login';
import Creator from './components/creator/Creator';
import Homepage from './components/homepage/Homepage';

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
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/creator">
            <Creator />
          </Route>
        </Switch>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
    
  );
}

export default App;
