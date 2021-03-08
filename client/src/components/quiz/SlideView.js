import { useState } from "react";
import useFitText from "use-fit-text";
import Timer from "./Timer";

const SlideView = ( { slide, error = "", showAns = false, timer, slideWidthPass } ) => {

    let answers = "";
    if(slide.type === "question") {
        for (let i = 0; i < slide.answers.length; i++) {
            answers += slide.answers[i];
            if (i !== slide.answers.length-1) {
                answers += " OR ";
            }
        }
    }    

    const { fontSize: familyFontSize, ref: familyRef } = useFitText({
        maxFontSize: 300,
    });
    const { fontSize: roundFontSize, ref: roundRef } = useFitText({
        maxFontSize: 300,
    });
    const { fontSize: titleFontSize, ref: titleRef } = useFitText({
        maxFontSize: 300,
    });
    const { fontSize: questionFontSize, ref: questionRef } = useFitText({
        maxFontSize: 300,
    });
    const { fontSize: questionRoundFontSize, ref: questionRoundRef } = useFitText({
        maxFontSize: 300,
    });
    const { fontSize: questionTextAnswerFontSize, ref: questionTextAnswerRef } = useFitText({
        maxFontSize: 300,
    });
    const { fontSize: answerFontSize, ref: answerRef } = useFitText({
        maxFontSize: 300,
    });

    //const slideWidthes = ['width--20per','width--50per','width--100per','width--200','width--400','width--800'];
    const [ slideSize, setSlideSize ] = useState(slideWidthPass);    

    return (
        <>
            { error && <div className="loading">{ error }</div> }
            <div className="slides">
                <div className={`slide-resize-me ${slideSize} `}>
                    { slide.type !== "question" && 
                        <div id="intro-slide" className=" slide">
                            { slide.type === "round" && <> 
                                <div className="slide-bg"/> <div className="slide-number above" ref={roundRef} style={{ fontSize: roundFontSize }}>
                                        Round { slide.round }
                                </div>
                                { !slide.img &&                   
                                    <div className="slide-text center" ref={titleRef} style={{ fontSize: titleFontSize }}>
                                        { slide.title }                        
                                    </div>
                                }    
                                { slide.img &&                              
                                    <div className="slide-text top" ref={titleRef} style={{ fontSize: titleFontSize }}>
                                            { slide.title }                              
                                    </div>
                                }  
                                { slide.img && <div className="slide-img">
                                        <img src={ slide.img } alt="round"/> 
                                    </div> 
                                }
                        </>}

                            { slide.type !== "round" && <> 
                                <div className="slide-bg-title"/>
                                { timer && <div className="timer-container">
                                        <Timer seconds = { timer }/>
                                    </div>
                                }
                                { slide.img &&
                                    < div className="title-header above">
                                        <div className="slide-title" ref={titleRef} style={{ fontSize: titleFontSize }}>
                                            { slide.title }
                                        </div>  
                                        { slide.family && 
                                            <div className="title-family" ref={familyRef} style={{ fontSize: familyFontSize }}>
                                                { slide.family }
                                            </div>
                                        }                                                           
                                    </div>
                                }
                                { !slide.img &&
                                    < div className="title-header center">
                                        <div className="slide-title" ref={titleRef} style={{ fontSize: titleFontSize }}>
                                            { slide.title }
                                        </div> 
                                        { slide.family && 
                                            <div className="title-family" ref={familyRef} style={{ fontSize: familyFontSize }}>
                                                { slide.family }
                                            </div>
                                        } 
                                    </div>
                                }
                                { slide.img && <div className="title-img">
                                        <img id="intro-img" src={ slide.img } alt="intro"/> 
                                    </div> 
                                }
                        </>}
                    </div> }
                    


                    { slide.type === "question" &&
                        <div id="answer-slide" className="slide">
                            <div className="slide-bg"/>
                                { timer &&<div className="timer-container">
                                    <Timer seconds = { timer }/>
                                </div>}
                                <div className="slide-number above" ref={ questionRef } style={{ fontSize: questionFontSize }}>
                                        Question { slide.quest }
                                </div>
                                <div id="question-round-number" className="question-round-number" ref={ questionRoundRef } style={{ fontSize: questionRoundFontSize }}>
                                        Round { slide.round } 
                                </div>
                                { !slide.img &&                    
                                    <div className="slide-text center" ref={questionTextAnswerRef} style={{ fontSize: questionTextAnswerFontSize }}>
                                        { slide.question }
                                    </div>
                                }
                                { slide.img &&                                              
                                    <div className="slide-text top" ref={questionTextAnswerRef} style={{ fontSize: questionTextAnswerFontSize }}>
                                        { slide.question }
                                    </div>
                                }
                                <div className="slide-img">
                                    { slide.img && <img src={ slide.img } alt="question_image"/> }
                                </div>
                                { showAns &&<div className="answer-box center" ref={answerRef} style={{ fontSize: answerFontSize }}>
                                    { answers }
                                </div> }
                        </div>
                    }
                </div>
            </div>
        </>
     );
}
 
export default SlideView;