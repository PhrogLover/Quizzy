import { useState, useEffect } from "react";
import SlideView from "./SlideView";
import "./slideview.css";
import $ from "jquery";
import Leaderboard from "../basic/Leaderboard";


const SlideScript = ({ quiz, onSlideChange, slideData, onSlideChangeVar, socket, mainId, teamList, user }) => {
    const [ isPending, setIsPending ] = useState(false);
    const [ showAns, setShowAns ] = useState(false);
    const [ currentSlideScript, setCurrentSlideScript ] = useState(quiz.slides[0]);
    const [ timer, setTimer ] = useState(null);
    const [ answerSheet, setAnswerSheet ] = useState(false);
    const [ roundsRemaining, setRoundsRemaining ] = useState(quiz.numberOfRounds);
    const [ scriptButtonValue, setScriptButtonValue ] = useState("Start Quiz");
    const [ scriptButtonDisabled, setScriptButtonDisabled ] = useState(false);
    const [ scriptButtonStyle, setScriptButtonStyle ] = useState({
        backgroundColor: "var(--colour-green)",
        border: "2px var(--colour-green)",
    });
    const [ globalRoundIndex, setGlobalRoundIndex ] = useState(0);
    const [ globalQuizIntro, setGlobalQuizIntro ] = useState(true);
    const [ endOfQuiz, setEndOfQuiz ] = useState(false);
    const [ leaderboard, setLeaderboard ] = useState(false);
    const [ showLeaderboard, setShowLeaderboard ] = useState(false);

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

    useEffect(() => {
        console.log(answerSheet);
    }, [answerSheet])

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async function changeCurrentSlideScript() {
        console.log('Round index: '+roundIndex);
        console.log('Quiz intro: '+quizIntro);
        console.log('Show answer(state): '+showAns);
        console.log('Rounds remaining: '+roundsRemaining);

        if (quizIntro) {
            setShowLeaderboard(false);
            setIsPending(true);
            setCurrentSlideScript(emptySlide);
            setScriptButtonDisabled(true);
            setTimeout(() => {
                roundIndex++;
                setRoundsRemaining(roundsRemaining-1);
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
        else if (!showAns && !leaderboard) {
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
            setIsPending(true);
            setCurrentSlideScript(emptySlide);
            setTimeout(() => {
                setCurrentSlideScript(quiz.slides[roundIndex][0]);
                setIsPending(false);
                if (quiz.showAns) {
                    setShowAns(true);
                    setScriptButtonValue("Reveal Answers");
                    setScriptButtonStyle({
                        border: "var(--colour-red) 2px solid",
                        backgroundColor: "var(--colour-red)",
                    })
                }
                else {
                    setLeaderboard(true);
                    setScriptButtonValue("Calculate Leaderboard");
                    setScriptButtonStyle({
                        border: "var(--colour-green) 2px solid",
                        backgroundColor: "var(--colour-green)",
                    })
                }
                setScriptButtonDisabled(false);
                setScriptButtonStyle({
                    backgroundColor: "var(--secondary-colour)",
                    border: "2px var(--secondary-colour)",
                });
                //Question phase done
                console.log("Question phase done");
            }, 5000); 
            await sleep(5000);   
        }
        else if (quiz.showAns && !leaderboard) {
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
            setTimeout(() => {
                setLeaderboard(true);
                setCurrentSlideScript(quiz.slides[roundIndex][0]);
                setIsPending(false);
                setScriptButtonDisabled(false);
                setScriptButtonValue("Calculate Leaderboard");
                setScriptButtonStyle({
                    border: "var(--colour-green) 2px solid",
                    backgroundColor: "var(--colour-green)",
                    color: "var(--colour-black2)"
                })

                console.log("Answer phase end");
            }, 5000);
            await sleep(5000);  
        }
        else if (leaderboard) {
            setScriptButtonDisabled(true);
            setScriptButtonValue("Calculating leaderboard...")
            setScriptButtonStyle({
                border: "var(--colour-grey) 2px solid",
                backgroundColor: "transparent",
                color: "var(--colour-grey)"
            })
            setCurrentSlideScript(emptySlide);
            setTimeout(() => {
                //leaderboard suspense time
                console.log("Leaderboard");
                setShowLeaderboard(true);
                setLeaderboard(false);
                setGlobalQuizIntro(true);
                quizIntro = true;
                if (roundsRemaining === 0) {
                    setScriptButtonValue("End of Quiz!")
                    setScriptButtonStyle({
                        border: "var(--primary-colour) 2px solid",
                        backgroundColor: "var(--primary-colour)",
                        color: "var(--colour-black2)"
                    })
                    setEndOfQuiz(true);
                    //quiz done
                    console.log("End of Quiz");
                    return;
                }
                setScriptButtonStyle({
                    border: "var(--colour-green) 2px solid",
                    backgroundColor: "var(--colour-green)",
                })
                setScriptButtonValue("Prepare For Next Round");
                setScriptButtonDisabled(false);
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
                    <SlideView endOfQuiz = { endOfQuiz } showLeaderboard = { showLeaderboard } slideData={slideData} isPending={ isPending } slide={ currentSlideScript } onSlideChange={onSlideChange} onSlideChangeVar={onSlideChangeVar} showAns = { showAns } timer = { timer } slideWidthPass = "width--100per" quiz = { quiz } answerSheet = { answerSheet } />
                    {/* { showLeaderboard && <Leaderboard user = { user } teamList = { teamList } /> }  OVERLAY */}
                </div>
            </div>
        </>
     );
}
 
export default SlideScript;