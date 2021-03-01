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
        <Container className="slide-editor">
            <Row>
                <Col xs={3}>
                    <SlideNav slides = { slides }/>
                </Col>
                <Col xs={9}>
                    <Editor slide = { currentSlide } changeSlideHandler = { changeSlideHandler }/>
                </Col>
            </Row>
        </Container>
     );
}
 
export default SlideEditor;