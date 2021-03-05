import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./slide.css";
// import ScaleText from "react-scale-text";
import React, { useCallback, useState } from "react";
import useFitText from "use-fit-text";

const Slide = () => {
    const { id } = useParams();
    const quizUrl = "http://localhost:5000/api/quizzes/slide/" + id;
    const {data: quiz, isPending, error } = useFetch(quizUrl);

    console.log(quiz);
    let introSlide = "";
    let roundSlide = "";
    let questionSlide = "";
    let answers = "";


    const { fontSize, ref } = useFitText({maxFontSize: 300});


    if (!isPending) {
        introSlide = quiz.slides[0];
        roundSlide = quiz.slides[1][0];
        questionSlide = quiz.slides[1][1];

        for (let i = 0; i < questionSlide.answers.length; i++) {
            answers += questionSlide.answers[i];
            if (i !== questionSlide.answers.length-1) {
                answers += ", ";
            }
        }
    }

    return (
        <>
            { isPending && <div className="loading">loading...</div> }
            { error && <div className="loading">{ error }</div> }
            { !isPending && <>
                <div className="slides">
                    
                    {/* intro slide */}
                    <div className="testing-box">

                        
                        <div id="intro-slide" className=" slide">
                            { roundSlide.img &&
                                < div className="title-header above">
                                    <div className="slide-title">
                                        { introSlide.title }
                                    </div>                                
                                    { introSlide.family &&
                                    <div className="title-family">
                                         {introSlide.family}
                                    </div> }                                
                                </div>
                            }
                            { !roundSlide.img &&
                                < div className="title-header center">
                                    <div className="slide-title">
                                        { introSlide.title }
                                    </div>
                                    { introSlide.family && <div className="title-family">{introSlide.family}</div> }    
                                </div>
                            }
                            <div className="title-img">
                                { introSlide.img && <img id="intro-img" src={ introSlide.img } alt="intro"/> }
                            </div>
                            
                        </div>
                    </div>
                    <br/>
                    <br/>

                    {/* round slide */}
                    <div id="round-slide" className="slide">
                        <div id="question-number" className="slide-number above">
                                Round { roundSlide.round }
                        </div>
                        { !roundSlide.img &&                    
                            <div className="slide-text center">
                                { roundSlide.title }                        
                            </div>
                        }
                        { roundSlide.img &&                                              
                            <div className="slide-text top">
                                <div  ref={ref} style={{ fontSize , height:"100%", width:"100%" }}>                                
                                    { roundSlide.title }
                                </div>                                
                            </div>
                        }
                        <div className="slide-img">
                            { roundSlide.img && <img src={ roundSlide.img } alt="round"/> }
                        </div>
                    </div>

                    <br/>
                    <br/>

                    {/* question slide */}
                    <div id="question-slide" className=" slide">
                        <div id="question-number" className="slide-number above">
                                Round { questionSlide.round } - Question{ questionSlide.quest }
                        </div>
                        { !questionSlide.img &&                    
                            <div className="slide-text center">                                
                                { questionSlide.question }                                
                            </div>
                        }
                        { questionSlide.img &&                                              
                            <div className="slide-text top">                                
                                { questionSlide.question }                                
                            </div>
                        }
                        <div className="slide-img">
                            { questionSlide.img && <img src={ questionSlide.img } alt="question_image"/> }
                        </div>
                    </div>

                    {/* answer slide */}
                    <br/>
                    <br/>
                    <div id="answer-slide" className="slide">
                        <div id="question-number" className="slide-number above">
                                Round { questionSlide.round } - Question{ questionSlide.quest }
                        </div>
                        { !questionSlide.img &&                    
                            <div className="slide-text center">
                                { questionSlide.question }
                            </div>
                        }
                        { questionSlide.img &&                                              
                            <div className="slide-text top">
                                { questionSlide.question }
                            </div>
                        }
                        <div className="slide-img">
                            { questionSlide.img && <img src={ questionSlide.img } alt="question_image"/> }
                        </div>
                        <div className="answer-box center">
                            { answers }
                        </div>
                    </div>

                </div>
            </>}

        </>
     );
}
 
export default Slide;