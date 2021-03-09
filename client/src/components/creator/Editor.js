import { useState } from "react";
import Attribute from "./Attribute";
import "./editor.css";

const Editor = ( { slide, changeSlideHandler, quiz } ) => {
    function onSlideImageChange(e){
        const file = e.target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.addEventListener("load", () => {
                changeSlideHandler("img", reader.result);
            })
            reader.readAsDataURL(file);
        }        
    }

    async function pasteImgURL() {
        navigator.clipboard.readText().then((url) => {
            changeSlideHandler("img", url);
        })
        
    }

    function removeImageFromSlide() {
        changeSlideHandler("img", "");
    }
    
    const [ imgRef, setImgRef ] = useState();
    const [ imgUrlString, setImgUrlString ] = useState();
    
    let answers = "";
    if(slide.type === "question") {
        for (let i = 0; i < slide.answers.length; i++) {
            answers += slide.answers[i];
            if (i !== slide.answers.length-1) {
                answers += ", ";
            }
        }
    }

    return ( 
        <div className="editor">
            <div className="top-bar">
                { slide.type === "question" && <>
                    <Attribute onChangeHandler = {changeSlideHandler} title="Individual Question Time" name="timeOverride" start = {10} finish = {90} steps = {5} defaultVal={60} selected = {slide.timeOverride} reset = {true}/>
                    <Attribute onChangeHandler = {changeSlideHandler} title="Read Time" name="readTime" start = {2} finish = {30} steps = {4} selected = {slide.readTime} defaultVal={6} reset = {true}/>
                    <Attribute onChangeHandler = {changeSlideHandler} title="Time Before Answer is Shown for this Question" name="suspenseTime" start = {2} finish = {20} steps = {2} defaultVal={5} selected = {slide.timeOverride} reset = {true}/>
                    <Attribute onChangeHandler = {changeSlideHandler} title="Answer Reveal Time" name="answerShowTime" start = {6} finish = {30} steps = {3} selected = {slide.readTime} defaultVal={10} reset = {true}/>
                </>}
                { slide.type === "round" && <>
                    <Attribute onChangeHandler = {changeSlideHandler} title="Question Time for This Round" name="timeOverride" start = {10} finish = {90} steps = {5} defaultVal={60} selected = {slide.timeOverride} reset = {true}/>
                    <Attribute onChangeHandler = {changeSlideHandler} title="Transition Time after Each Question" name="transition" start = {3} finish = {10} defaultVal={5} selected = {slide.transition} reset = {true}/>
                    <Attribute onChangeHandler = {changeSlideHandler} title="Extra Time after Round Ends" name="endTime" start = {5} finish = {90} steps = {5} defaultVal={30} selected = {slide.endTime} reset = {true}/>
                </>}                
            </div>
            <div className="editor-main">
                { slide.type === "question" && <>
                    <h2 id="question-number">Round { slide.round } -  Question { slide.quest }</h2>
                    <textarea required name="question" id="question" cols="80" rows="10" value={ slide.question } onChange={ text => (changeSlideHandler("question", text.target.value)) }></textarea>
                    <label htmlFor="answers">Write answer: (You can write multiple answers, just seperate them by commas)</label>
                    <input type="text" name="answers" size="20" value={ answers } onChange={ text => (changeSlideHandler("answers", text.target.value)) }/>
                    <label htmlFor="case-sensitive">Make Answers Case Sensitive</label>
                    <input type="checkbox" onChange={value => (changeSlideHandler("caseSensitive", value.target.checked))}/>
                </>}
                { slide.type === "round" && <>
                    <h2 id="question-number">Round { slide.round }</h2>
                    <textarea required name="title" id="title" cols="60" rows="2" value={ slide.title } onChange={ text => (changeSlideHandler("title", text.target.value)) }></textarea>
                </>}
                { slide.type === "intro" && <>
                    <h2>Introduction Slide</h2>
                    <textarea required name="title" id="title" cols="60" rows="2" value={ slide.title } onChange={ text => (changeSlideHandler("title", text.target.value)) }></textarea>
                    { quiz.type === "seasonal" && <textarea required name="family" id="family" cols="60" rows="2" value={ slide.family } onChange={ text => (changeSlideHandler("family", text.target.value)) }></textarea> }
                </>}
            </div>
            {/* <div id="image-preview">
                <img src={ slide.img } alt="Preview" className="image-preview__image"/>
            </div> */}
            <div className="image-toolbar">
                <div className="image-toolbar-label">Upload an Image:</div>
                { !slide.img && <input ref={(ref) => (setImgRef(ref))} type="file" accept="image/*" onChange={(e) => (onSlideImageChange(e))}/> }
                { !slide.img && <input type="text" placeholder="URL" onChange={ text => (setImgUrlString(text.target.value)) } />}
                { !slide.img && <button type="button" onClick={() => (changeSlideHandler("img", imgUrlString)) } >Paste URL</button> }
                { slide.img && <button type="button" id="removeFile" onClick={removeImageFromSlide}>Remove File</button> }
            </div>
        </div>
        );
}
 
export default Editor;