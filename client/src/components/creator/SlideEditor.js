import { useEffect, useState } from "react";
import Editor from "./Editor";
import "./slideeditor.css";

const SlideEditor = ( { slides, setSlides } ) => {
    
    const [ currentSlide, setCurrentSlide ] = useState(slides[1][1]);
    const [ index, setIndex ] = useState({
        round: 1,
        question: 1
    });

    function changeSlideHandler(name, value) {
        if (name === "answers") {
            value = value.split(", ");
        }

        let temp = {...slides};
        temp[index.round][index.question] = value;
        setSlides(temp);
        
        temp = {...currentSlide};
        temp[name] = value;
        setCurrentSlide(temp);
    }

    useEffect(() => {
        console.log(currentSlide);
    }, [currentSlide]);

    return ( 
        <div className="slide-editor">
            <div className="slidenav"></div>
            <Editor slide = { currentSlide } changeSlideHandler = { changeSlideHandler }/>
        </div>
     );
}
 
export default SlideEditor;