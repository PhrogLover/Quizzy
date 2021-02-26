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
        quizDomain: "public",
        quizType: "standard",
        numberOfTeams: 25,
        numberOfMembers: 5,
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
        })
        .then(
            setTimeout(() => {
                setIsPending(false)
                history.push("/")
            }, 1)
            
        );
    }

    return ( 
        <div className="creator">
            <h1>Welcome to the Quiz Creator!</h1>
            <form onSubmit={ submitHandler }>
                <label htmlFor="seasonal-setup-id">Quickly Set Up Your Seasonal Quiz If you Have one (Input <span>Unique ID</span> Into <span>This Field)</span></label>
                <input type="text" name="seasonal-setup-id"/><br/>

                <h3>To Create Your Brand New Quiz, First Select the <span>Main Atributes</span> of It!</h3>
                <div id="show">quiz: Title: <span>{ quiz.title }</span> Category: <span>{ quiz.category }</span> Domain: <span>{ quiz.quizDomain }</span> Questions: <span>{ quiz.numberOfQuestions }</span> Type: <span>{ quiz.quizType }</span> Teams: <span>{ quiz.numberOfTeams }</span> Members: <span>{ quiz.numberOfMembers }</span> Rounds: <span>{ quiz.numberOfRounds }</span> </div>
                <Attributes onChangeHandler = { onChangeHandler } />
                { !isPending && <button type="submit">Submit</button> }
                { isPending && <button disabled>loading</button> }
            </form>
        </div>
     );
}
 
export default Creator;