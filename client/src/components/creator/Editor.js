// import { useState } from "react";
import Attribute from "./Attribute";
import "./editor.css";

const Editor = ( { slide, changeSlideHandler } ) => {
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

    function removeImageFromSlide() {
        changeSlideHandler("img", "");
    }
    
    if(slide.type === "question") {
        let answers = "";
        for (let i = 0; i < slide.answers.length; i++) {
            answers += slide.answers[i];
            if (i !== slide.answers.length-1) {
                answers += ", ";
            }
        }

        return ( 
            <div className="editor">
                <div className="toolbar">
                    <Attribute onChangeHandler = {changeSlideHandler} title="Set individual question time" name="timeOverride" start = {10} finish = {90} steps = {5} reset = {true}/>
                    {slide.timeOverride && <p>{ slide.timeOverride }</p>}
                    <Attribute onChangeHandler = {changeSlideHandler} title="Set Question Read Time" name="readTime" start = {2} finish = {30} steps = {4} reset = {true}/>
                    {slide.readTime && <p>{ slide.readTime } *adds to the Individual Time</p>}
                </div>
                <p id="question-number">R{ slide.round }, Q{ slide.number }</p>
                <textarea required name="question" id="question" cols="80" rows="10" value={ slide.question } onChange={ text => (changeSlideHandler("question", text.target.value)) }></textarea>
                <label htmlFor="answers">Write answer: (You can write multiple answers, just seperate them by commas)</label>
                <input type="text" name="answers" size="20" value={ answers } onChange={ text => (changeSlideHandler("answers", text.target.value)) }/>
                <label htmlFor="case-sensitive">Make Answers Case Sensitive</label>
                <input type="checkbox" onChange={value => (changeSlideHandler("caseSensitive", value.target.checked))}/>
                <div id="image-preview">
                    <img src={ slide.img } alt="Preview" className="image-preview__image"/>
                </div>
                <input type="file" id="add-image" onChange={(e) => (onSlideImageChange(e))}/>
                <button type="button" id="removeFile" onClick={removeImageFromSlide}>Remove File</button>
            </div>
         );
    }
    else if(slide.type === "round") {
        return ( 
            <div className="editor">
                <div className="toolbar">
                    <Attribute onChangeHandler = {changeSlideHandler} title="Set Time for Questions This Round" name="timeOverride" start = {10} finish = {90} steps = {5} reset = {true}/>
                    {slide.timeOverride && <p>{ slide.timeOverride }</p>}
                    <Attribute onChangeHandler = {changeSlideHandler} title="Transition Time after Each Question" name="transition" start = {3} finish = {10} reset = {true}/>
                    {slide.transition && <p>{ slide.transition }</p>}
                    <Attribute onChangeHandler = {changeSlideHandler} title="Extra Time after Round Ends" name="endTime" start = {5} finish = {90} steps = {5} reset = {true}/>
                    {slide.endTime && <p>{ slide.endTime }</p>}
                </div>
                <p id="question-number">R{ slide.number }</p>
                <textarea required name="title" id="title" cols="60" rows="2" value={ slide.title } onChange={ text => (changeSlideHandler("title", text.target.value)) }></textarea>
                <div id="image-preview">
                    <img src={ slide.img } alt="Preview" className="image-preview__image"/>
                </div>
                <input type="file" id="add-image" onChange={(e) => (onSlideImageChange(e))}/>
                <button type="button" id="removeFile" onClick={removeImageFromSlide}>Remove File</button>
            </div>
         );
    }
    else if(slide.type === "intro") {
        return ( 
            <div className="editor">
                <div className="toolbar"></div>
                <textarea required name="title" id="title" cols="60" rows="2" value={ slide.title } onChange={ text => (changeSlideHandler("title", text.target.value)) }></textarea>
                <div id="image-preview">
                    <img src={ slide.img } alt="Preview" className="image-preview__image"/>
                </div>
                <input type="file" id="add-image" onChange={(e) => (onSlideImageChange(e))}/>
                <button type="button" id="removeFile" onClick={removeImageFromSlide}>Remove File</button>
            </div>
         );
    }
}
 
export default Editor;