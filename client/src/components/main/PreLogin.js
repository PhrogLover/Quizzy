import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from '../login/Login';
import LoginRerouter from '../login/LoginRerouter';

const PreLogin = ({ onSuccess, onFailure }) => {
    return ( 
        <Router>
            <Switch>
                <Route exact path="/login">
                    <Login onSuccessGoogle = { onSuccess } onFailureGoogle = { onFailure }/>
                </Route>
                <Route path="*">
                    <LoginRerouter />
                </Route>
            </Switch>
        </Router>
     );
}
 
export default PreLogin;