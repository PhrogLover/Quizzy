import { useState } from "react";
import "./editor.css";

const Editor = ( { slide, changeSlideHandler } ) => {

    const [ slideImage, setSlideImage ] = useState("");

    function onSlideImageChange(e){
        const file = e.target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.addEventListener("load", () => {
                setSlideImage(reader.result);
            })
    
            reader.readAsDataURL(file);
        }        
    }

    function removeImageFromSlide() {
        setSlideImage("");
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
                <div className="toolbar"></div>
                <textarea required name="question" id="question" cols="80" rows="10" value={ slide.question } onChange={ text => (changeSlideHandler("question", text.target.value)) }></textarea>
                <input type="text" name="answers" size="20" value={ answers } onChange={ text => (changeSlideHandler("answers", text.target.value)) }/>
                <div id="image-preview">
                    <img src={ slideImage } alt="Preview" className="image-preview__image"/>
                    <span className="image-preview__default-text">Image preview</span>
                </div>
                <input type="file" id="add-image" onChange={(e) => (onSlideImageChange(e))}/>
                <button type="button" id="removeFile" onClick={removeImageFromSlide}>Remove File</button>
            </div>
         );
    }
    else if(slide.type === "round") {
        return ( 
            <div className="editor">
                <div className="toolbar"></div>
                <textarea required name="title" id="title" cols="60" rows="2" value={ slide.title } onChange={ text => (changeSlideHandler("title", text.target.value)) }></textarea>
                <div id="image-preview">
                    <img src={ slideImage } alt="Preview" className="image-preview__image"/>
                    <span className="image-preview__default-text">Image preview</span>
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
                    <img src={ slideImage } alt="Preview" className="image-preview__image"/>
                    <span className="image-preview__default-text">Image preview</span>
                </div>
                <input type="file" id="add-image" onChange={(e) => (onSlideImageChange(e))}/>
                <button type="button" id="removeFile" onClick={removeImageFromSlide}>Remove File</button>
            </div>
         );
    }
}
 
export default Editor;