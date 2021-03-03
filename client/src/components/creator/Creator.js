import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./creator.css";
import Attributes from "./Attributes";
import SlideEditor from "./SlideEditor";
import GetUniqueId from "../../GetUniqueId";

const Creator = () => {
    const history = useHistory();
    
    const [ privateDisabled, setPrivateDisabled ] = useState(false);
    const [ seasonalDisabled, setSeasonalDisabled ] = useState(false);
    const [ isPending, setIsPending ] = useState(false);
    const [ quiz, setQuiz] = useState({
        id: GetUniqueId(),
        title: "",
        category: "",
        family: "",
        domain: "public",
        type: "standard",
        numberOfTeams: 25,
        numberOfPlayers: 5,
        numberOfRounds: 5,
        numberOfQuestions: 10,
        seasonFreq: "",
        time: new Date(),
        slides: []
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
            title: quiz.title,
            family: quiz.family,
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
                img: "",
                timeOverride: "",
                transition: "",
                endTime: ""
            })
            id++;
            for (let j = 1; j <= quiz.numberOfQuestions; j++) {
                template[i].push({
                    id: id,
                    round: i,
                    quest: j,
                    type: "question",
                    question: "Insert Question",
                    answers: [],
                    caseSensitive: false,
                    img: "",
                    timeOverride: "",
                    readTime: ""
                });
                id++;
            }
        }
        return template;
    }

    function onChangeHandler(varName, varValue) {
        if (varName === "domain" && varValue === "private") {
            setSeasonalDisabled(true);
        }
        else if (varName === "domain" && varValue === "public") {
            setSeasonalDisabled(false);
        }
        else if (varName === "type" && varValue === "seasonal") {
            setPrivateDisabled(true);
        }
        else if (varName === "type" && varValue === "standard") {
            setPrivateDisabled(false);
        }

        let temp = {...quiz};
        temp[varName] = varValue;
        setQuiz(temp);
    }

    function submitHandler(e) {
        e.preventDefault();
        setIsPending(true);
        quiz.slides = slides;
        fetch('http://localhost:5000/api/quizzes/newQuiz', {
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
                <label htmlFor="seasonal-setup-id">Quickly Set Up Your Seasonal Quiz If you Have one (Input <span>Unique ID</span> Into <span>This Field</span>)</label>
                <input type="text" name="seasonal-setup-id"/><br/>

                <h3>To Create Your Brand New Quiz, First Select the <span>Main Atributes</span> of It!</h3>
                <div id="show">quiz: Title: <span>{ quiz.title }</span> Category: <span>{ quiz.category }</span> Domain: <span>{ quiz.domain }</span> Family: <span>{ quiz.family }</span> Questions: <span>{ quiz.numberOfQuestions }</span> Type: <span>{ quiz.type }</span> Teams: <span>{ quiz.numberOfTeams }</span> Players: <span>{ quiz.numberOfPlayers }</span> Rounds: <span>{ quiz.numberOfRounds }</span> </div>
                <Attributes quiz = { quiz } onChangeHandler = { onChangeHandler } privateDisabled = { privateDisabled } seasonalDisabled = { seasonalDisabled } />
                <SlideEditor slides = { slides } setSlides = { setSlides }/>

                { !isPending && <button type="submit">Submit</button> }
                { isPending && <button disabled>Adding..</button> }
            </form>
        </div>
     );
}
 
export default Creator;