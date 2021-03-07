import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import React from "react";

import "./creator.css";
import Attributes from "./Attributes";
import SlideEditor from "./SlideEditor";
import GetUniqueId from "../../GetUniqueId";
// import { OverlayTrigger , Tooltip } from "react-bootstrap";
import HelpIcon from "../basic/HelpIcon";
import { Button } from "../basic/Button";

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
        slides: [],
        showAns: true
    });

    const [slides, setSlides ] = useState(slidesState())

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
                transition: 5,
                endTime: 30
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
                    timeOverride: 60,
                    readTime: 5,
                    suspenseTime: 5,
                    answerShowTime: 10,
                });
                id++;
            }
        }
        return template;
    }

    function onChangeHandler(varName, varValue) {
        if (varName === "domain" && varValue === true) {
            setSeasonalDisabled(true);
            varValue = "private";
        }
        else if (varName === "domain" && varValue === false) {
            setSeasonalDisabled(false);
            varValue = "public";
        }
        else if (varName === "type" && varValue === true) {
            setPrivateDisabled(true);
            varValue = "seasonal";
        }
        else if (varName === "type" && varValue === false) {
            setPrivateDisabled(false);
            varValue = "standard";
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

    useEffect(() => {
        console.log(quiz);
    }, [quiz])

    const ref = React.createRef();

    return ( 
        <div className="creator">
            <div className="creator-heading">
                <h1>Welcome to the Quiz Creator!</h1>
            </div>
            <form onSubmit={ submitHandler }>
                <div className="input-uniqueid-container">
                    <HelpIcon ref={ref}>
                        Quickly set up your <strong> Seasonal Quiz </strong> by entering its Unique ID
                    </HelpIcon>
                    <div className="uniqueid-label" htmlFor="seasonal-setup-id">
                        Unique ID:
                    </div>
                    <input type="text" name="seasonal-setup-id" className="uniqueid-input"/>
                </div>
                
                <h3>To Create Your Brand New Quiz, First Select the <span>Main Atributes</span> of It!</h3>
                <div className="main-form">
                    <div className="hide-me" id="show">quiz: Title: <span>{ quiz.title }</span> Category: <span>{ quiz.category }</span> Domain: <span>{ quiz.domain }</span> Family: <span>{ quiz.family }</span> Questions: <span>{ quiz.numberOfQuestions }</span> Type: <span>{ quiz.type }</span> Teams: <span>{ quiz.numberOfTeams }</span> Players: <span>{ quiz.numberOfPlayers }</span> Rounds: <span>{ quiz.numberOfRounds }</span> </div>
                    <Attributes quiz = { quiz } onChangeHandler = { onChangeHandler } privateDisabled = { privateDisabled } seasonalDisabled = { seasonalDisabled } />
                </div>
                    <SlideEditor slides = { slides } setSlides = { setSlides }/>

                    { !isPending && <button type="submit">Submit</button>
                    //  <Button> </Button>
                     }
                    { isPending && <button disabled>Adding..</button> }
                
                
            </form>
        </div>
     );
}
 
export default Creator;