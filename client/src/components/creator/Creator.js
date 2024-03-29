import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import React from "react";

import "./creator.css";
import Attributes from "./Attributes";
import SlideEditor from "./SlideEditor";
import GetUniqueId from "../../scripts/GetUniqueId";
// import { OverlayTrigger , Tooltip } from "react-bootstrap";
import HelpIcon from "../basic/HelpIcon";
import useFetch from "../../hooks/useFetch";
import { Button } from "../basic/Button";
import QuizSelector from "../basic/QuizSelector";


const Creator = ({ user, socket }) => {
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    
    const [ editing, setEditing ] = useState(false);
    const [ isPending, setIsPending ] = useState(false);
    const [ quiz, setQuiz] = useState({
        id: GetUniqueId(),
        creatorId: user.id,
        creator: user.name,
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
        showAns: true,
        showLeaderboards: true,
        showFinalLeaderboard: true,
        allowLeaderboard: true,
        deployIds: []
    });

    const [slides, setSlides ] = useState(init())

    function init() {
        let template = [];
        template.push({
            quizId: quiz.id,
            round: 0,
            quest: -1,
            type: "intro",
            title: "Insert Title",
            family: "Insert Family Name",
            img: null
        });
        for (let i = 1; i <= quiz.numberOfRounds; i++) {
            template.push([]);
            template[i].push({
                round: i,
                quest: 0,
                type: "round",
                title: "Insert Title",
                img: null,
                timeOverride: quiz.timePerQuestion || 60,
                transition: 5,
                endTime: 30
            })
            for (let j = 1; j <= quiz.numberOfQuestions; j++) {
                template[i].push({
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
            }
        }
        return template;
    }

    function slidesState() {
        let template = [];
        template.push({
            quizId: quiz.id,
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
        for (let i = 1; i <= quiz.numberOfRounds; i++) {
            template.push([]);
            template[i].push({
                round: i,
                quest: 0,
                type: "round",
                title: "Insert Title",
                img: null,
                timeOverride: slides[i][0] ? slides[i][0].timeOverride : 60,
                transition: 5,
                endTime: 30
            })
            if (typeof slides[i][0] !== 'undefined') {
                template[i][0].title = slides[i][0].title || template[i][0].title;
                template[i][0].img = slides[i][0].img || template[i][0].img;
                template[i][0].transition = slides[i][0].transition || template[i][0].transition;
                template[i][0].endTime = slides[i][0].endTime || template[i][0].endTime;
            }
            for (let j = 1; j <= quiz.numberOfQuestions; j++) {
                template[i].push({
                    round: i,
                    quest: j,
                    type: "question",
                    question: "Insert Question",
                    answers: [],
                    caseSensitive: false,
                    img: null,
                    timeOverride: slides[i][j] ? slides[i][0].timeOverride : 60,
                    readTime: 6,
                    suspenseTime: 6,
                    answerShowTime: 9,
                });
                if (typeof slides[i][j] !== 'undefined') {
                    template[i][j].question = slides[i][j].question || template[i][j].question;
                    template[i][j].answers = slides[i][j].answers || template[i][j].answers;
                    template[i][j].caseSensitive = slides[i][j].caseSensitive || template[i][j].caseSensitive;
                    template[i][j].img = slides[i][j].img || template[i][j].img;
                    template[i][j].readTime = slides[i][j].readTime || template[i][j].readTime;
                    template[i][j].suspenseTime = slides[i][j].suspenseTime || template[i][j].suspenseTime;
                    template[i][j].answerShowTime = slides[i][j].answerShowTime || template[i][j].answerShowTime;
                }
            }
        }
        return template;
    }

    function changeQuiz(id) {
        const quizUrl = "http://localhost:5000/api/quizzes/quiz/full/" + id;

        fetch(quizUrl)
        .then(res => {return res.json()})
        .then(quiz => {
            setSlides(quiz.slides);
            quiz.slides = [];
            setQuiz(quiz);
        })
        .then(setEditing(true));
    }

    function timePropagate() {
        let template = [...slides];
        for (let i = 1; i <= quiz.numberOfRounds; i++) {
            for (let j = 0; j <= quiz.numberOfQuestions; j++) {
                template[i][j].timeOverride = quiz.timePerQuestion;
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

    function saveChanges() {
        setIsPending(true);
        if (editing) {
            fetch('http://localhost:5000/api/quizzes/newQuiz', {
                method: 'PUT',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(
                    {
                        quiz: quiz,
                        slides: slides
                    })
            }).then(setIsPending(false));
        }
        else {
            fetch('http://localhost:5000/api/quizzes/newQuiz', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(
                    {
                        quiz: quiz,
                        slides: slides
                    })
            }).then(setIsPending(false));
        }
    }

    function submitHandler(e) {
        e.preventDefault();
        setIsPending(true);
        if (editing) {
            fetch('http://localhost:5000/api/quizzes/newQuiz', {
                method: 'PUT',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(
                    {
                        quiz: quiz,
                        slides: slides
                    })
            }).then(setIsPending(false))
            .then(history.push("/"));
        }
        else {
            fetch('http://localhost:5000/api/quizzes/newQuiz', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(
                    {
                        quiz: quiz,
                        slides: slides
                    })
            }).then(setIsPending(false))
            .then(history.push("/"));
        }
    }

    useEffect(() => {
        setSlides(slidesState());
    }, [quiz.id, quiz.title, quiz.category, quiz.family, quiz.type, quiz.domain, quiz.numberOfPlayers, quiz.numberOfQuestions, quiz.numberOfRounds, quiz.numberOfTeams, quiz.time, quiz.seasonFreq, quiz.showAns])

    useEffect(() => {
        setSlides(timePropagate());
    }, [quiz.timePerQuestion])

    useEffect(() => {
        console.log(quiz)
    }, [quiz])

    const refUniqueID = React.createRef();

    return ( 
        <div className="creator">
            <div className="creator-heading">
                <h1>Welcome to the Quiz Creator!</h1>
            </div>
            <form className="creator-form" onSubmit={ submitHandler }>
                    {/* <div className="input-uniqueid-container">
                        <QuizSelector user = { user } socket = { socket } creator = { true } setQuiz = { changeQuiz }/>
                    </div> */}
                    <div className="main-form">
                        <Attributes quiz = { quiz } onChangeHandler = { onChangeHandler } GetUniqueId = { GetUniqueId }/>
                    
                        <SlideEditor onChangeHandler = {onChangeHandler} slides = { slides } setSlides = { setSlides } quiz={ quiz }/>
                        
                        { !isPending && 
                        <div className="bottom-buttons-container">
                            <div onClick={() => (history.push("/"))}>
                                <Button buttonType="button" buttonStyle="btn--solid" buttonColour="btn--secondary-colour">
                                    <i className="fas fa-trash-alt"></i> Delete & Exit 
                                </Button>
                            </div>
                            <div className="button-gap"/>
                            <div onClick={ saveChanges }>
                                <Button buttonType="button" buttonStyle="btn--solid" buttonColour="btn--primary-colour">
                                    <i className="fas fa-save"></i> Save Changes
                                </Button>
                            </div>
                            <div className="button-gap"/>
                            { !editing && <Button buttonType="submit" buttonStyle="btn--solid" buttonColour="btn--green-colour">
                                Submit <i className="fas fa-share"></i>
                            </Button>}
                            { editing && <Button buttonType="submit" buttonStyle="btn--solid" buttonColour="btn--green-colour">
                                Save & Exit <i className="fas fa-share"></i>
                            </Button>}

                        </div>
                        
                        }
                        { isPending && <button disabled>Adding..</button> }
                </div>
            </form>
        </div>
     );
}
 
export default Creator;