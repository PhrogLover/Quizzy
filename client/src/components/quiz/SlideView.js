import { useState, useEffect } from "react";
import useFitText from "use-fit-text";
import Family from "./Family";
import AnswerJudge from "./host/AnswerJudge";
import Timer from "./Timer";

const SlideView = ( { quiz, onSlideChange, slide, error = "", showAns = false, timer, slideWidthPass } ) => {

    const [ index, setIndex ] = useState({
        round: 0,
        question: -1
    });

    let answers = "";
    if(slide.type === "question") {
        for (let i = 0; i < slide.answers.length; i++) {
            answers += slide.answers[i];
            if (i !== slide.answers.length-1) {
                answers += " OR ";
            }
        }
    }
    
    useEffect(() => {
        if (slide.type === "judge") {
            //do nothing
        }
        else if (slide.type === "none") {
            setIndex({
                round: -1,
                question: -1
            })
        }
        else if (quiz.slides[0] === slide) {
            setIndex({
                round: 0,
                question: -1
            })
        }
        else {
            for (let i = 1; i < quiz.slides.length; i++) {
                for (let j = 0; j < quiz.slides[i].length; j++) {
                    if (quiz.slides[i][j] === slide) {
                        setIndex({
                            round: i,
                            question: j
                        })
                        return;
                    }
                }
            }
        }
    }, [slide])
    
    useEffect(() => {
        if (onSlideChange) {
            let slideBundle = {
                round: index.round,
                question: index.question,
                error: error,
                showAns: showAns,
                timer: timer,
                slideWidthPass: slideWidthPass
            }
            console.log(slideBundle)
            onSlideChange(slideBundle);
        }
    }, [quiz, index, error, showAns, timer, slideWidthPass])

    const { fontSize: roundFontSize, ref: roundRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 3,
    });
    const { fontSize: titleFontSize, ref: titleRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 3,
    });
    const { fontSize: questionFontSize, ref: questionRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 3,
    });
    const { fontSize: questionRoundFontSize, ref: questionRoundRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 3,
    });
    const { fontSize: questionTextAnswerFontSize, ref: questionTextAnswerRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 3,
    });
    const { fontSize: answerFontSize, ref: answerRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 3,
    });

    //const slideWidthes = ['width--20per','width--50per','width--80per','width--100per','width--200','width--400','width--800'];
    const [ slideSize, setSlideSize ] = useState(slideWidthPass);    

    return (
        <>
            { error && <div className="loading">{ error }</div> }
            <div className="slides" id="slides">
                <div className={`slide-resize-me ${slideSize} `}>
                    { slide.type !== "question" && 
                        <div id="intro-slide" className=" slide">
                            { slide.type === "round" && <> 
                                <div className="slide-bg"/>
                                 <div className="slide-number above" ref={roundRef} style={{ fontSize: roundFontSize }}>
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
                                
                                { timer && <div className="timer-container">
                                        <Timer seconds = { timer }/>
                                    </div>
                                }
                                { slide.img && <>
                                    <div className="slide-bg-title normal-title"/>
                                    < div className="title-header above">
                                        <div className="slide-title" ref={titleRef} style={{ fontSize: titleFontSize }}>
                                            { slide.title }
                                        </div>  
                                        { slide.family && quiz.type === "seasonal" && 
                                            <Family family={ slide.family } iteration={ quiz.seasonIteration } />
                                        }                                                           
                                    </div>
                                    </>
                                }
                                { !slide.img && <>
                                    <div className="slide-bg-title middle-title"/>
                                    < div className="title-header center">
                                        <div className="slide-title" ref={titleRef} style={{ fontSize: titleFontSize }}>
                                            { slide.title }
                                        </div> 
                                        { slide.family && quiz.type === "seasonal" && 
                                            <Family family={ slide.family } iteration={ quiz.seasonIteration } />
                                        }  
                                    </div>
                                    </>
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
                    { slide.type === "judge" &&
                        <AnswerJudge/>
                    }
                </div>
            </div>
        </>
     );
}
 
export default SlideView;