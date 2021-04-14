import { useState, useEffect } from "react";
import SlideView from "./SlideView";
import "./slideview.css";
import $ from "jquery";


const SlideScript = ({ quiz, onSlideChange, slideData, onSlideChangeVar, socket, mainId }) => {
    const [ isPending, setIsPending ] = useState(false);
    const [ showAns, setShowAns ] = useState(false);
    const [ currentSlideScript, setCurrentSlideScript ] = useState(quiz.slides[0]);
    const [ timer, setTimer ] = useState(null);
    const [ answerSheet, setAnswerSheet ] = useState(false);
    const [ roundsRemaining, setRoundsRemaining ] = useState(quiz.numberOfRounds);
    const [ scriptButtonValue, setScriptButtonValue ] = useState("Start Quiz");
    const [ scriptButtonDisabled, setScriptButtonDisabled ] = useState(false);
<<<<<<< HEAD
    const [ scriptButtonStyle, setScriptButtonStyle ] = useState({
        backgroundColor: "var(--colour-green)",
        border: "2px var(--colour-green)",
    });
    const [ globalRoundIndex, setGlobalRoundIndex ] = useState(null);
=======
    const [ globalRoundIndex, setGlobalRoundIndex ] = useState(0);
>>>>>>> ac2c63f5f1457f66cd985e387d5a57f85a2e091f
    const [ globalQuizIntro, setGlobalQuizIntro ] = useState(true);
    const [ globalEndOfQuiz, setGlobalEndOfQuiz ] = useState(false);

    useEffect(() => {
        socket.emit('set round', globalRoundIndex, mainId);
    }, [globalRoundIndex])

    const emptySlide = {
        id: 0,
        type: "none",
        title: " ",
        img: ""
    }

    let roundIndex = globalRoundIndex;
    let quizIntro = globalQuizIntro;
    let endOfQuiz = globalEndOfQuiz;

    useEffect(() => {
        console.log(answerSheet);
    }, [answerSheet])

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async function changeCurrentSlideScript() {
        console.log('Round index: '+roundIndex);
        console.log('Quiz intro: '+quizIntro);
        console.log('End of quiz: '+endOfQuiz);
        console.log('Show answer(state): '+showAns);
        console.log('Rounds remaining: '+roundsRemaining);
        if (endOfQuiz) {
            console.log("woo");
            //show leaderboard
        }
        else if (quizIntro) {
            setIsPending(true);
            setCurrentSlideScript(emptySlide);
            setScriptButtonDisabled(true);
            setTimeout(() => {
                roundIndex++;
                setGlobalRoundIndex(roundIndex);
                setCurrentSlideScript(quiz.slides[roundIndex][0]);
                setIsPending(false);
                setScriptButtonValue("Start Next Round");
                quizIntro = false;
                setGlobalQuizIntro(quizIntro);
                setScriptButtonDisabled(false);
                setScriptButtonStyle({
                    backgroundColor: "var(--primary-colour)",
                    border: "2px var(--primary-colour)",
                })
            }, 5000);
            await sleep(5000);
        }
        else if (!showAns) {
            setScriptButtonDisabled(true);
            setScriptButtonValue("Quiz in Progress...");
            setScriptButtonStyle({
                border: "var(--colour-grey) 2px solid",
                backgroundColor: "transparent",
                color: "var(--colour-grey)"
            })
            setIsPending(true);
            setCurrentSlideScript(emptySlide);
            setTimeout(() => {
                //pre-round time
                console.log("pre-round time");
            }, 5000);
            await sleep(5000);
            setAnswerSheet(true);
            for (let i = 1; i < quiz.slides[roundIndex].length; i++) {
                setCurrentSlideScript(quiz.slides[roundIndex][i]);
                setIsPending(false);
                console.log("question reading time");
                for (let j = quiz.slides[roundIndex][i].readTime; j >= 0; j--) {
                    if (j < 10) {
                        setTimer("Reading 0"+j);
                    }
                    else setTimer("Reading" +j);
                    setTimeout(() => {
                        //question reading time
                    }, 1000);
                    await sleep(1000);
                }
                console.log("question solving time");
                for (let j = quiz.slides[roundIndex][i].timeOverride || quiz.slides[roundIndex][0].timeOverride || quiz.timePerQuestion; j >= 0; j--) {
                    if (j < 10) {
                        setTimer("0"+j);
                    }
                    else setTimer(j);
                    setTimeout(() => {
                        //question solving time
                    }, 1000);
                    await sleep(1000);
                }
                setTimer(null);
                setIsPending(true);
                setCurrentSlideScript(emptySlide);
                setTimeout(() => {
                    //question transition time
                    console.log("question transition time");
                }, 1000 * quiz.slides[roundIndex][0].transition);
                await sleep(1000 * quiz.slides[roundIndex][0].transition);
            }
            setCurrentSlideScript(emptySlide);
            setIsPending(false);
            console.log("Round end time");
            for (let j = quiz.slides[roundIndex][0].endTime; j >= 0; j--) {
                if (j < 10) {
                    setTimer("0"+j);
                }
                else setTimer(j);
                setTimeout(() => {
                    //Round end time
                }, 1000);
                await sleep(1000);
            }
            setTimer(null);
            setAnswerSheet(false);
            if (roundsRemaining === 1 && !quiz.showAns) {
                setCurrentSlideScript(emptySlide);
                setScriptButtonValue("Calculate Leaderboard")
                setScriptButtonStyle({
                    border: "var(--colour-green) 2px solid",
                    backgroundColor: "var(--colour-green)",
                })
                endOfQuiz = true;
                setGlobalEndOfQuiz(endOfQuiz);
                setScriptButtonDisabled(false);
                //quiz done
                console.log("Quiz done");
                return;
            }
            setIsPending(true);
            setCurrentSlideScript(emptySlide);
            setTimeout(() => {
                setCurrentSlideScript(quiz.slides[roundIndex][0]);
                if (roundsRemaining !== 1 && !quiz.showAns) {
                    roundIndex++;
                    setGlobalRoundIndex(roundIndex);
                    setRoundsRemaining(roundsRemaining-1);
                    setCurrentSlideScript(quiz.slides[roundIndex][0]);
                }
                setIsPending(false);
                setShowAns(true);
                setScriptButtonDisabled(false);
                setScriptButtonStyle({
                    backgroundColor: "var(--secondary-colour)",
                    border: "2px var(--secondary-colour)",
                });
                if (quiz.showAns) setScriptButtonValue("Reveal Answers")
                else setScriptButtonValue("Next Round")
                //Question phase done
                console.log("Question phase done");
            }, 5000); 
            await sleep(5000);   
        }
        else if (quiz.showAns) {
            setScriptButtonDisabled(true);
            setScriptButtonValue("Quiz in Progress...")
            setScriptButtonStyle({
                border: "var(--colour-grey) 2px solid",
                backgroundColor: "transparent",
                color: "var(--colour-grey)"
            })
            setIsPending(true);
            setCurrentSlideScript(emptySlide);
            setTimeout(() => {
                //pre-round time
            }, 5000);
            await sleep(5000);  
            for (let i = 1; i < quiz.slides[roundIndex].length; i++) {
                setShowAns(false);
                setCurrentSlideScript(quiz.slides[roundIndex][i]);
                setIsPending(false);
                setTimeout(() => {
                    //answer reveal suspense time
                    console.log("answer reveal suspense time");
                }, 1000 * quiz.slides[roundIndex][i].suspenseTime);
                await sleep(1000 * quiz.slides[roundIndex][i].suspenseTime); 
                setShowAns(true);
                setTimeout(() => {
                    //answer reveal time
                    console.log("answer reveal time");
                }, 1000 * quiz.slides[roundIndex][i].answerShowTime);
                await sleep(1000 * quiz.slides[roundIndex][i].answerShowTime); 
                setIsPending(true);
                setCurrentSlideScript(emptySlide);
                setTimeout(() => {
                    //question transition time
                    console.log("answer transition time");
                }, 3000);
                await sleep(3000);  
            }
            setShowAns(false);
            setIsPending(true);
            setCurrentSlideScript(emptySlide);
            if (roundsRemaining === 1) {
                setCurrentSlideScript(emptySlide);
                setScriptButtonValue("Calculate Leaderboard")
                setScriptButtonStyle({
                    border: "var(--colour-green) 2px solid",
                    backgroundColor: "var(--colour-green)",
                })
                setIsPending(false);
                endOfQuiz = true;
                setGlobalEndOfQuiz(endOfQuiz);
                setScriptButtonDisabled(false);
                console.log("Quiz end");
                return;
            }
            else {
                roundIndex++;
                setGlobalRoundIndex(roundIndex);
                setRoundsRemaining(roundsRemaining-1);
            }
            setTimeout(() => {
                setCurrentSlideScript(quiz.slides[roundIndex][0]);
                setIsPending(false);
                setScriptButtonDisabled(false);
                setScriptButtonValue("Next Round")
                console.log("Answer phase end");
            }, 5000);
            await sleep(5000);  
        }        
    }

    const [ hostStreamSize, setHostStreamSize ] = useState(resizeStream());

    useEffect(() => {
        setHostStreamSize(resizeStream());
    },[])

    useEffect(() => {
        function handleResize() {
            setHostStreamSize(resizeStream());
        }

        window.addEventListener('resize', handleResize);

        return _ => {
        window.removeEventListener('resize', handleResize)
        }
    })

    function resizeStream() {
        let sectionWidth= $("#main-host-slideview").width();
        let sectionHeight= $("#main-host-slideview").height();

        let newWidth=0;
        let newHeight=0;

        if ((sectionHeight) > (0.5625*sectionWidth)) {
            newWidth = sectionWidth;
            newHeight = newWidth * 0.5625;
        }
         else{
            newHeight = sectionHeight;
            newWidth = newHeight * 1.7778;
         }

        return {maxHeight: newHeight+"px", maxWidth: newWidth+ "px" };
    }

    return ( 
        <>
            <div className="slide-toolbar">
                <div className="quiz-start-button">
                    { isPending && <>
                        <button className="in-progress-button" disabled>Quiz in Progress...</button>
                    </> }
                    { !isPending && <>
                        <button disabled = {scriptButtonDisabled} onClick={changeCurrentSlideScript} style={scriptButtonStyle}>{ scriptButtonValue }</button>
                    </> }
                </div>
            </div>
            <div id="main-host-slideview" className="main-host-slideview" >
                <div id ="host-slideview-wrapper" className="host-slideview-wrapper" style ={hostStreamSize}>
                <SlideView slideData={slideData} isPending={ isPending } slide={ currentSlideScript } onSlideChange={onSlideChange} onSlideChangeVar={onSlideChangeVar} showAns = { showAns } timer = { timer } slideWidthPass = "width--100per" quiz = { quiz } answerSheet = { answerSheet } /> 
                </div>
            </div>
        </>
     );
}
 
export default SlideScript;