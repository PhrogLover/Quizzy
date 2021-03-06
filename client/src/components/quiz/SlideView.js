import useFitText from "use-fit-text";

const SlideView = ( { quiz, error } ) => {

    const introSlide = quiz.slides[0];
    const roundSlide = quiz.slides[1][0];
    const questionSlide = quiz.slides[1][1];
    let answers = "";

    for (let i = 0; i < questionSlide.answers.length; i++) {
        answers += questionSlide.answers[i];
        if (i !== questionSlide.answers.length-1) {
            answers += ", ";
        }
    }

    const { fontSize: introTitleImgFontSize, ref: introTitleImgRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 20,
        onFinish: () => {}
    });

    const { fontSize: familyImgFontSize, ref: familyImgRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 20,
        onFinish: () => {}
    });

    const { fontSize: introTitleFontSize, ref: introTitleRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 20,
        onFinish: () => {}
    });

    const { fontSize: familyFontSize, ref: familyRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 20,
        onFinish: () => {}
    });

    const { fontSize: roundFontSize, ref: roundRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 20,
        onFinish: () => {}
    });

    const { fontSize: roundTitleImgFontSize, ref: roundTitleImgRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 20,
        onFinish: () => {}
    });

    const { fontSize: roundTitleFontSize, ref: roundTitleRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 20,
        onFinish: () => {}
    });

    const { fontSize: questionFontSize, ref: questionRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 20,
        onFinish: () => {}
    });
    const { fontSize: questionRoundFontSize, ref: questionRoundRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 20,
        onFinish: () => {}
    });

    const { fontSize: questionTextImgFontSize, ref: questionTextImgRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 20,
        onFinish: () => {}
    });

    const { fontSize: questionTextFontSize, ref: questionTextRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 20,
        onFinish: () => {}
    });

    const { fontSize: questionTextAnswerFontSize, ref: questionTextAnswerRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 20,
        onFinish: () => {}
    });

    const { fontSize: questionTextImgAnswerFontSize, ref: questionTextImgAnswerRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 20,
        onFinish: () => {}
    });

    const { fontSize: answerFontSize, ref: answerRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 20,
        onFinish: () => {}
    });

    const { fontSize: timerFontSize, ref: timerRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 20,
        onFinish: () => {}
    });

    return (
        <>
            { error && <div className="loading">{ error }</div> }
            <div className="slides">
                    <div id="intro-slide" className=" slide" style="--slide-width: 100%">
                        <div className="slide-bg-title"/>
                        { roundSlide.img &&
                            < div className="title-header above">
                                <div className="slide-title" ref={introTitleImgRef} style={{ fontSize: introTitleImgFontSize }}>
                                    { introSlide.title }
                                </div>                                
                                { introSlide.family &&
                                    <div className="title-family" ref={familyImgRef} style={{ fontSize: familyImgFontSize }}>
                                            {introSlide.family}
                                    </div> 
                                }                                
                            </div>
                        }
                        { !roundSlide.img &&
                            < div className="title-header center">
                                <div className="slide-title" ref={introTitleRef} style={{ fontSize: introTitleFontSize }}>
                                    { introSlide.title }
                                </div>
                                { introSlide.family && 
                                    <div className="title-family" ref={familyRef} style={{ fontSize: familyFontSize }}>
                                        {introSlide.family}
                                    </div>
                                }    
                            </div>
                        }
                        <div className="title-img">
                            { introSlide.img && <img id="intro-img" src={ introSlide.img } alt="intro"/> }
                        </div>
                        
                    </div>
                <br/>
                <br/>

                <div id="round-slide" className="slide">
                    <div className="slide-bg"/>
                    <div id="question-number" className="slide-number above" ref={roundRef} style={{ fontSize: roundFontSize }}>
                            Round { roundSlide.round }
                    </div>
                    { !roundSlide.img &&                    
                        <div className="slide-text center" ref={roundTitleRef} style={{ fontSize: roundTitleFontSize }}>
                            { roundSlide.title }                        
                        </div>
                    }    
                    { roundSlide.img &&                              
                    <div className="slide-text top" ref={roundTitleImgRef} style={{ fontSize: roundTitleImgFontSize }}>
                            { roundSlide.title }                              
                    </div>
                    }  
                    { roundSlide.img && <div className="slide-img">
                         <img src={ roundSlide.img } alt="round"/> 
                    </div> }
                </div>

                <br/>
                <br/>
                {/* <div className="testing-box"> */}
                <div id="question-slide" className=" slide">
                    <div className="slide-bg"/>
                        <div className="timer-container">
                            <div className="timer" ref={ timerRef } style={{ fontSize: timerFontSize }}>
                                50s
                            </div>
                        </div>
                        <div id="question-number" className="slide-number above" ref={ questionRef } style={{ fontSize: questionFontSize }}>
                                Question { questionSlide.quest }
                        </div>
                        <div id="question-round-number" className="question-round-number" ref={ questionRoundRef } style={{ fontSize: questionRoundFontSize }}>
                                Round { questionSlide.round } 
                        </div>
                        { !questionSlide.img &&                    
                            <div className="slide-text center" ref={questionTextRef} style={{ fontSize: questionTextFontSize }}>                                
                                { questionSlide.question }                                
                            </div>
                        }
                        { questionSlide.img &&                                              
                            <div className="slide-text top" ref={questionTextImgRef} style={{ fontSize: questionTextImgFontSize }}>                                
                                { questionSlide.question }                                
                            </div>
                        }
                        <div className="slide-img">
                            { questionSlide.img && <img src={ questionSlide.img } alt="question_image"/> }
                        </div>
                    </div>
                {/* </div> */}

                <br/>
                <br/>

                <div id="answer-slide" className="slide">
                <div className="slide-bg"/>
                    <div id="question-number" className="slide-number above" ref={ questionRef } style={{ fontSize: questionFontSize }}>
                            Question { questionSlide.quest }
                    </div>
                    <div id="question-round-number" className="question-round-number" ref={ questionRoundRef } style={{ fontSize: questionRoundFontSize }}>
                            Round { questionSlide.round } 
                    </div>
                    { !questionSlide.img &&                    
                        <div className="slide-text center" ref={questionTextAnswerRef} style={{ fontSize: questionTextAnswerFontSize }}>
                            { questionSlide.question }
                        </div>
                    }
                    { questionSlide.img &&                                              
                        <div className="slide-text top" ref={questionTextImgAnswerRef} style={{ fontSize: questionTextImgAnswerFontSize }}>
                            { questionSlide.question }
                        </div>
                    }
                    <div className="slide-img">
                        { questionSlide.img && <img src={ questionSlide.img } alt="question_image"/> }
                    </div>
                    <div className="answer-box center" ref={answerRef} style={{ fontSize: answerFontSize }}>
                        { answers }
                    </div>
                </div>

            </div>
        </>
     );
}
 
export default SlideView;