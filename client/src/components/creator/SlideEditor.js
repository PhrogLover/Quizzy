import { useEffect, useState } from "react";
import Editor from "./Editor";
import "./slideeditor.css";

import SlideNav from "./SlideNav";

const SlideEditor = ( { onChangeHandler, slides, setSlides, quiz } ) => {
    
    const [ currentSlide, setCurrentSlide ] = useState(slides[0]);
    const [ index, setIndex ] = useState({
        round: 0,
        question: -1
    });

    function changeSlideHandler(name, value) {
        if (name === "showAns") {
            onChangeHandler(name, value);
            return;
        }

        if (value === -1) {
            value = null;
        }

        if (name === "answers") {
            value = value.split(", ");
        }
        let temp = [];
        temp = [...slides];
        let tempObj = {};
        if (currentSlide.type === "round" && name === "timeOverride") {
            temp[index.round][0].timeOverride = value;
            for (let i = 1; i < quiz.numberOfQuestions; i++) {
                temp[index.round][i].timeOverride = value;
            }
        }
        else if (index.question !== -1) {
            tempObj = {...temp[index.round][index.question]};
            tempObj[name] = value;
            temp[index.round][index.question] = tempObj;
        }
        else {
            tempObj = {...temp[index.round]};
            tempObj[name] = value;
            temp[0] = tempObj;
        } 
        setSlides(temp);
        tempObj = {...currentSlide};
        tempObj[name] = value;
        setCurrentSlide(tempObj);
    }

    function changeCurrentSlide(round, quest) {
        setIndex({
            round: round,
            question: quest
        })
        if (quest !== -1) {
            setCurrentSlide(slides[round][quest]);
        }
        else {
            setCurrentSlide(slides[round]);
        }
    }

    useEffect(() => {
        console.log(currentSlide);
    }, [currentSlide]);

    useEffect(() => {
        if (index.question !== -1) {
            setCurrentSlide(slides[index.round][index.question]);
        }
        else setCurrentSlide(slides[index.round]);
    }, [slides[0]]);

    return ( 
        <div className="slide-editor">
            <div className="main-slideEditor-container">
                <div className="left-SE-container">
                    <SlideNav slides = { slides } changeCurrentSlide = { changeCurrentSlide } quiz={ quiz }/>
                </div>
                <div className="right-SE-container">
                    <Editor slide = { currentSlide } changeSlideHandler = { changeSlideHandler } quiz={ quiz }/>
                </div>
            </div>
        </div>
     );
}
 
export default SlideEditor;