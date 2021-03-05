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

    const { fontSize, ref } = useFitText({
        maxFontSize: 200,
        minFontSize: 20,
        onFinish: () => {}
    });

    return ( 
        <>
            { error && <div className="loading">{ error }</div> }
            <div className="slides">
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

                <div id="round-slide" className="slide">
                    <div id="question-number" className="slide-number above">
                            Round { roundSlide.round }
                    </div>
                    { !roundSlide.img &&                    
                        <div className="slide-text center">
                            { roundSlide.title }                        
                        </div>
                    }                                     
                    <div className="slide-text top">
                            { roundSlide.title }                              
                    </div>
                    <div className="slide-img">
                        { roundSlide.img && <img src={ roundSlide.img } alt="round"/> }
                    </div>
                </div>

                <br/>
                <br/>

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
        </>
     );
}
 
export default SlideView;