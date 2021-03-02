import { useEffect, useState } from "react";
import Editor from "./Editor";
import "./slideeditor.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SlideNav from "./SlideNav";

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
        let temp = {};
        let tempObj = {}
        if (index.question !== -1) {
            temp = [...slides];
            tempObj = {...temp[index.round][index.question]};
            tempObj[name] = value;
            temp[index.round][index.question] = tempObj;
            setSlides(temp);
        }
        else {
            temp = {...slides};
            temp[index.round] = value;
            setSlides(temp);
        } 
        temp = {...currentSlide};
        temp[name] = value;
        setCurrentSlide(temp);
    }

    function changeCurrentSlide(round, quest) {
        console.log(round, quest);
        console.log(slides[round][quest]);
        console.log(currentSlide);
        if (quest !== -1) {
            setCurrentSlide(slides[round][quest]);
            setIndex({
                round: round,
                question: quest
            })
        }
        else {
            setCurrentSlide(slides[round]);
            setIndex({
                round: round,
                question: quest
            })
        }
    }

    return ( 
        <Container className="slide-editor">
            <Row>
                <Col xs={3}>
                    <SlideNav slides = { slides } changeCurrentSlide = { changeCurrentSlide }/>
                </Col>
                <Col xs={9}>
                    <Editor slide = { currentSlide } changeSlideHandler = { changeSlideHandler }/>
                </Col>
            </Row>
        </Container>
     );
}
 
export default SlideEditor;