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
    
    const [ isPending, setIsPending ] = useState(false);
    const [ quiz, setQuiz] = useState({
        id: GetUniqueId(),
        title: null,
        category: null,
        family: null,
        domain: "public",
        type: "standard",
        numberOfTeams: 25,
        numberOfPlayers: 5,
        numberOfRounds: 5,
        numberOfQuestions: 10,
        timePerQuestion: 60,
        seasonFreq: null,
        seasonIteration: 1,
        time: new Date(),
        slides: [],
        showAns: true
    });

    const [slides, setSlides ] = useState(init())

    function init() {
        let template = [];
        let id = 1;
        template.push({
            id: id,
            round: 0,
            quest: -1,
            type: "intro",
            title: quiz.title || "Insert Title",
            family: quiz.family,
            img: null
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
                img: null,
                timeOverride: quiz.timePerQuestion || 60,
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
                    img: null,
                    timeOverride: template[i][0].timeOverride || quiz.timePerQuestion || 60,
                    readTime: 6,
                    suspenseTime: 6,
                    answerShowTime: 9,
                });
                id++;
            }
        }
        return template;
    }

    function slidesState() {
        let template = [];
        let id = 1;
        template.push({
            id: id,
            round: 0,
            quest: -1,
            type: "intro",
            title: "Insert Title",
            family: "Insert Family Name",
            img: null
        });
        if (typeof slides !== 'undefined') {
            template[0].title = quiz.title || slides[0].title || template[0].title;
            template[0].family = quiz.family || slides[0].family || template[0].family;
            template[0].img = slides[0].img || template[0].img;
            if (quiz.type !== "seasonal") {
                template[0].family = "Insert Family Name";
            }
        }
        id++;
        for (let i = 1; i <= quiz.numberOfRounds; i++) {
            template.push([]);
            template[i].push({
                id: id,
                round: i,
                quest: 0,
                type: "round",
                title: "Insert Title",
                img: null,
                timeOverride: quiz.timePerQuestion || 60,
                transition: 5,
                endTime: 30
            })
            if (typeof slides[i][0] !== 'undefined') {
                template[i][0].title = slides[i][0].title || template[i][0].title;
                template[i][0].img = slides[i][0].img || template[i][0].img;
                template[i][0].timeOverride = slides[i][0].timeOverride || template[i][0].timeOverride;
                template[i][0].transition = slides[i][0].transition || template[i][0].transition;
                template[i][0].endTime = slides[i][0].endTime || template[i][0].endTime;
            }
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
                    img: null,
                    timeOverride: template[i][0].timeOverride || quiz.timePerQuestion || 60,
                    readTime: 6,
                    suspenseTime: 6,
                    answerShowTime: 9,
                });
                if (typeof slides[i][j] !== 'undefined') {
                    template[i][j].question = slides[i][j].question || template[i][j].question;
                    template[i][j].answers = slides[i][j].answers || template[i][j].answers;
                    template[i][j].caseSensitive = slides[i][j].caseSensitive || template[i][j].caseSensitive;
                    template[i][j].img = slides[i][j].img || template[i][j].img;
                    template[i][j].timeOverride = slides[i][j].timeOverride || template[i][j].timeOverride;
                    template[i][j].readTime = slides[i][j].readTime || template[i][j].readTime;
                    template[i][j].suspenseTime = slides[i][j].suspenseTime || template[i][j].suspenseTime;
                    template[i][j].answerShowTime = slides[i][j].answerShowTime || template[i][j].answerShowTime;
                }
                id++;
            }
        }
        return template;
    }

    function onChangeHandler(varName, varValue) {
        if (varName === "domain" && varValue === true) {
            varValue = "private";
        }
        else if (varName === "domain" && varValue === false) {
            varValue = "public";
        }
        else if (varName === "type" && varValue === true) {
            varValue = "seasonal";
        }
        else if (varName === "type" && varValue === false) {
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
    }, [quiz])

    // useEffect(() => {
    //     console.log(quiz);
    // }, [quiz])

    const refUniqueID = React.createRef();

    return ( 
        <div className="creator">
            <div className="creator-heading">
                <h1>Welcome to the Quiz Creator!</h1>
            </div>
            <form className="creator" onSubmit={ submitHandler }>
            
                
                    <div className="input-uniqueid-container">
                        <HelpIcon ref={refUniqueID}>
                            Quickly set up your <strong> Seasonal Quiz </strong> by entering its Unique ID
                        </HelpIcon>
                        <div className="uniqueid-label" htmlFor="seasonal-setup-id">
                            Unique ID:
                        </div>
                        <input type="text" name="seasonal-setup-id" className="uniqueid-input"/>
                    </div>
                    <div className="main-form">
                        <div className="hide-me" id="show">quiz: Title: <span>{ quiz.title }</span> Category: <span>{ quiz.category }</span> Domain: <span>{ quiz.domain }</span> Family: <span>{ quiz.family }</span> Questions: <span>{ quiz.numberOfQuestions }</span> Type: <span>{ quiz.type }</span> Teams: <span>{ quiz.numberOfTeams }</span> Players: <span>{ quiz.numberOfPlayers }</span> Rounds: <span>{ quiz.numberOfRounds }</span> </div>
                        <Attributes quiz = { quiz } onChangeHandler = { onChangeHandler } />
                    
                        <SlideEditor slides = { slides } setSlides = { setSlides } quiz={ quiz }/>
                        
                        { !isPending && 
                        <div className="bottom-buttons-container">
                            <Button buttonStyle="btn--solid" buttonColour="btn--secondary-colour">
                                <i className="fas fa-trash-alt"></i> Delete & Exit 
                            </Button>
                            <div className="button-gap"/>
                            <Button buttonStyle="btn--solid" buttonColour="btn--primary-colour">
                                <i className="fas fa-save"></i> Save Draft & Exit 
                            </Button>
                            <div className="button-gap"/>
                            <Button buttonType="submit" buttonStyle="btn--solid" buttonColour="btn--green-colour">
                                Submit <i className="fas fa-share"></i>
                            </Button>
                        </div>
                        
                        }
                        { isPending && <button disabled>Adding..</button> }
                </div>
            </form>
        </div>
     );
}
 
export default Creator;