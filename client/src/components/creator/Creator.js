import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./creator.css";
import Attributes from "./Attributes";
import SlideEditor from "./SlideEditor";

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
    const [slides, setSlides ] = useState(slidesState());

    function slidesState() {
        let template = [];
        let id = 1;
        template.push({
            id: id,
            round: 0,
            quest: -1,
            type: "intro",
            title: "Quiz title",
            img: ""
        });
        id++;
        for (let i = 1; i <= quiz.numberOfRounds; i++) {
            template.push([]);
            template[i].push({
                id: id,
                round: i,
                quest: 0,
                type: "round",
                title: "Insert Title",
                number: i,
                img: ""
            })
            id++;
            for (let j = 1; j <= quiz.numberOfQuestions; j++) {
                template[i].push({
                    id: id,
                    round: i,
                    quest: j,
                    type: "question",
                    number: j,
                    question: "Insert Question",
                    answers: [],
                    img: ""
                });
                id++;
            }
        }
        return template;
    }

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

    useEffect(() => {
        setSlides(slidesState());
    }, [quiz.numberOfRounds, quiz.numberOfQuestions])

    return ( 
        <div className="creator">
            <h1>Welcome to the Quiz Creator!</h1>
            <form onSubmit={ submitHandler }>
                <label htmlFor="seasonal-setup-id">Quickly Set Up Your Seasonal Quiz If you Have one (Input <span>Unique ID</span> Into <span>This Field)</span></label>
                <input type="text" name="seasonal-setup-id"/><br/>

                <h3>To Create Your Brand New Quiz, First Select the <span>Main Atributes</span> of It!</h3>
                <div id="show">quiz: Title: <span>{ quiz.title }</span> Category: <span>{ quiz.category }</span> Domain: <span>{ quiz.domain }</span> Family: <span>{ quiz.family }</span> Questions: <span>{ quiz.numberOfQuestions }</span> Type: <span>{ quiz.type }</span> Teams: <span>{ quiz.numberOfTeams }</span> Players: <span>{ quiz.numberOfPlayers }</span> Rounds: <span>{ quiz.numberOfRounds }</span> </div>
                <Attributes onChangeHandler = { onChangeHandler } />
                <SlideEditor slides = { slides } setSlides = { setSlides }/>

                { !isPending && <button type="submit">Submit</button> }
                { isPending && <button disabled>Adding..</button> }
            </form>
        </div>
     );
}
 
export default Creator;