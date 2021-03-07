import { useState, useEffect } from "react";
import SlideView from "./SlideView";

const SlideScript = ({ quiz, error }) => {
    const [ isPending, setIsPending ] = useState(false);
    const [ showAns, setShowAns ] = useState(false);
    const [ currentSlideScript, setCurrentSlideScript ] = useState(quiz.slides[0]);
    const [ timer, setTimer ] = useState(null);
    const [ roundsRemaining, setRoundsRemaining ] = useState(quiz.numberOfRounds);
    const [ scriptButtonValue, setScriptButtonValue ] = useState("Start Quiz");
    const [ scriptButtonDisabled, setScriptButtonDisabled ] = useState(false);
    const [ globalRoundIndex, setGlobalRoundIndex ] = useState(null);
    const [ globalQuizIntro, setGlobalQuizIntro ] = useState(true);
    const [ globalEndOfQuiz, setGlobalEndOfQuiz ] = useState(false);

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
        console.log(currentSlideScript);
    }, [currentSlideScript, isPending])

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
            setScriptButtonDisabled(true);
            console.log(quiz)
            setTimeout(() => {
                roundIndex++;
                setGlobalRoundIndex(roundIndex);
                setCurrentSlideScript(quiz.slides[roundIndex][0]);
                setIsPending(false);
                setScriptButtonValue("Start Next round");
                quizIntro = false;
                setGlobalQuizIntro(quizIntro);
                setScriptButtonDisabled(false);
            }, 5000);
            await sleep(5000);
        }
        else if (!showAns) {
            setScriptButtonDisabled(true);
            setScriptButtonValue("Quiz in Progress...");
            setIsPending(true);
            setTimeout(() => {
                //pre-round time
                console.log("pre-round time");
            }, 5000);
            await sleep(5000);
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
                for (let j = quiz.slides[roundIndex][i].timeOverride; j >= 0; j--) {
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
            if (roundsRemaining === 1 && !quiz.showAns) {
                setCurrentSlideScript(emptySlide);
                setScriptButtonValue("Calculate Leaderboard")
                endOfQuiz = true;
                setGlobalEndOfQuiz(endOfQuiz);
                setScriptButtonDisabled(false);
                //quiz done
                console.log("Quiz done");
                return;
            }
            setIsPending(true);
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
            setIsPending(true);
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
                setTimeout(() => {
                    //question transition time
                    console.log("answer transition time");
                }, 3000);
                await sleep(3000);  
            }
            setShowAns(false);
            setIsPending(true);
            if (roundsRemaining === 1) {
                setCurrentSlideScript(emptySlide);
                setScriptButtonValue("Calculate Leaderboard")
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

    return ( 
        <>
            { isPending && <>
                <SlideView slide={ emptySlide } slideWidthPass = "width--50per"/>
                <button disabled>Quiz in Progress...</button>
            </> }
            { !isPending && <>
                <SlideView slide={ currentSlideScript } showAns = { showAns } timer = { timer } slideWidthPass = "width--50per"/> 
                <button disabled = {scriptButtonDisabled} onClick={changeCurrentSlideScript}>{ scriptButtonValue }</button>
            </> }
        </>
     );
}
 
export default SlideScript;