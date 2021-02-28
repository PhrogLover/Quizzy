import { useState } from "react";
import { useHistory } from "react-router-dom";

import "./creator.css";
import Attributes from "./Attributes";

const Creator = () => {
    const history = useHistory();
    
    const [isPending, setIsPending] = useState(false);
    const [quiz, setQuiz] = useState({
        title: "",
        category: "",
        family: "",
        domain: "public",
        type: "standard",
        numberOfTeams: 25,
        numberOfPlayers: 5,
        numberOfRounds: 5,
        numberOfQuestions: 10
    });

    function onChangeHandler(varName, varValue) {
        let temp = {...quiz};
        temp[varName] = varValue;
        setQuiz(temp);
    }

    function submitHandler(e) {
        e.preventDefault();
        setIsPending(true);
        fetch('/api/quizzes/newQuiz', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(quiz)
        }).then(setIsPending(false))
        .then(history.push("/"));
    }

    return ( 
        <div className="creator">
            <h1>Welcome to the Quiz Creator!</h1>
            <form onSubmit={ submitHandler }>
                <label htmlFor="seasonal-setup-id">Quickly Set Up Your Seasonal Quiz If you Have one (Input <span>Unique ID</span> Into <span>This Field)</span></label>
                <input type="text" name="seasonal-setup-id"/><br/>

                <h3>To Create Your Brand New Quiz, First Select the <span>Main Atributes</span> of It!</h3>
                <div id="show">quiz: Title: <span>{ quiz.title }</span> Category: <span>{ quiz.category }</span> Domain: <span>{ quiz.domain }</span> Family: <span>{ quiz.family }</span> Questions: <span>{ quiz.numberOfQuestions }</span> Type: <span>{ quiz.type }</span> Teams: <span>{ quiz.numberOfTeams }</span> Players: <span>{ quiz.numberOfPlayers }</span> Rounds: <span>{ quiz.numberOfRounds }</span> </div>
                <Attributes onChangeHandler = { onChangeHandler } />
                { !isPending && <button type="submit">Submit</button> }
                { isPending && <button disabled>Adding..</button> }
            </form>
        </div>
     );
}
 
export default Creator;