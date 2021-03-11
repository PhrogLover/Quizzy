import { useEffect, useState } from "react";
import Editor from "./Editor";
import "./slideeditor.css";

import SlideNav from "./SlideNav";

const SlideEditor = ( { slides, setSlides, quiz } ) => {
    
    const [ currentSlide, setCurrentSlide ] = useState(slides[1][1]);
    const [ index, setIndex ] = useState({
        round: 1,
        question: 1
    });

    function changeSlideHandler(name, value) {
        if (value === -1) {
            value = null;
        }

        if (name === "answers") {
            value = value.split(", ");
        }
        let temp = [];
        let tempObj = {};
        if (index.question !== -1) {
            temp = [...slides];
            tempObj = {...temp[index.round][index.question]};
            tempObj[name] = value;
            temp[index.round][index.question] = tempObj;
            setSlides(temp);
        }
        else {
            temp = [...slides];
            tempObj = {...temp[index.round]};
            tempObj[name] = value;
            temp[0] = tempObj;
            setSlides(temp);
        } 
        temp = {...currentSlide};
        temp[name] = value;
        setCurrentSlide(temp);
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
            console.log(slides);
        }, [slides])

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