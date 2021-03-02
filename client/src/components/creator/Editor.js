import { useState } from "react";
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
                </div>
                <p id="question-number">Q{ slide.number }</p>
                <textarea required name="question" id="question" cols="80" rows="10" value={ slide.question } onChange={ text => (changeSlideHandler("question", text.target.value)) }></textarea>
                <input type="text" name="answers" size="20" value={ answers } onChange={ text => (changeSlideHandler("answers", text.target.value)) }/>
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