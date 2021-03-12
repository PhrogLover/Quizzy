import React from "react";
import { useState } from "react";
import HelpIcon from "../basic/HelpIcon";
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

    const answersRef = React.createRef();

    const [asOpen,setAsOpen] = useState(false);
    const closeAdvancedSettngs = () => setAsOpen(false);    

    function AdvancedSettings(){
        if (slide.type === "question"){
            return(
                <div className="advanced-settings">
                    <Attribute onChangeHandler = {changeSlideHandler} title="Time Before Answer is Shown for this Question" name="suspenseTime" start = {2} finish = {20} steps = {2} defaultVal={6} selected = { slide.suspenseTime }/>
                    <Attribute onChangeHandler = {changeSlideHandler} title="Answer Reveal Time" name="answerShowTime" start = {6} finish = {30} steps = {3} selected = { slide.answerShowTime } defaultVal={9}/>
                </div>
            )
        }
        else{
            return(
                <div className="advanced-settings">
                    <Attribute onChangeHandler = {changeSlideHandler} title="Transition Time after Each Question" name="transition" start = {3} finish = {10} defaultVal={5} selected = { slide.transition }/>
                    <Attribute onChangeHandler = {changeSlideHandler} title="Extra Time after Round Ends" name="endTime" start = {5} finish = {90} steps = {5} defaultVal={30} selected = { slide.endTime }/>
                </div>
            )
        }
    }

    return ( 
        <div className="editor">
            <div className="top-bar">
                { slide.type === "question" && 
                <>
                    <div className="top-bar-top">
                        <Attribute onChangeHandler = {changeSlideHandler} title="Individual Question Time" name="timeOverride" start = {10} finish = {90} steps = {5} defaultVal={ quiz.timePerQuestion } selected = { slide.timeOverride }/>
                        <Attribute onChangeHandler = {changeSlideHandler} title="Read Time" name="readTime" start = {2} finish = {30} steps = {4} selected = { slide.readTime } defaultVal={6}/>
                    
                        { quiz.showAns && <div className="top-bar-dropdown">
                            <button  type="button" onClick={() => setAsOpen(!asOpen)} className="advanced-settings-toggle"> Advanced Settings <i className="fas fa-angle-down"/></button>
                            { asOpen && <AdvancedSettings></AdvancedSettings>}             
                        </div> }
                    </div>
                </>
                }
                { slide.type === "round" && 
                <>
                    <div className="top-bar-top">
                        <Attribute onChangeHandler = {changeSlideHandler} title="Question Time for This Round" name="timeOverride" start = {10} finish = {90} steps = {5} defaultVal={ quiz.timePerQuestion } selected = { slide.timeOverride }/>
                        <div className="top-bar-dropdown">
                            <button  type="button" onClick={() => setAsOpen(!asOpen)} className="advanced-settings-toggle">Advanced Settings <i className="fas fa-angle-down"/></button>    
                            { asOpen && <AdvancedSettings></AdvancedSettings>}
                        </div>
                    </div>
                    
                </>
                }   
                { slide.type === "intro" && 
                <>
                    <div className="top-bar-top">
                        <div className="checkbox-answer-casesen">
                            <div className="checkbox-answer-casesen-label" htmlFor="case-sensitive"> Show Answers After The Quiz Is Done</div>
                            <div className="custom-checkbox">
                                <input type="checkbox" checked={quiz.showAns} onChange={value => (changeSlideHandler("showAns", value.target.checked))}/>
                            </div>
                        </div>             
                    </div>
                    
                </>
                } 
            </div>

                
            <div className="editor-main">
                { slide.type === "question" && 
                <>
                    <div className="qnumber-header" id="question-number">
                        Round { slide.round } -  Question { slide.quest }
                    </div>
                    <div className="editor-body">
                        <label htmlFor="question">Question:</label>
                        <textarea required name="question" id="question" value={ slide.question } onChange={ text => (changeSlideHandler("question", text.target.value)) }></textarea>
                        <label className="answers-label" htmlFor="answers"><HelpIcon ref ={answersRef}>You can write multiple answers by seperating them with commas</HelpIcon> Answer(s):</label>
                        <input className="medium-input" type="text" name="answers" size="20" value={ answers } onChange={ text => (changeSlideHandler("answers", text.target.value)) }/>
                        <div className="checkbox-answer-casesen">
                            <div className="checkbox-answer-casesen-label" htmlFor="case-sensitive">Make Answer(s) Case Sensitive</div>
                            <div className="custom-checkbox">
                                <input type="checkbox" onChange={value => (changeSlideHandler("caseSensitive", value.target.checked))}/>
                            </div>
                        </div>
                        { slide.img && <>                    
                            <label className="image-preview-label">Image Preview:</label>
                            <div className="image-preview">
                                <img src={ slide.img } alt="Preview" className="image-preview__image"/>
                            </div>
                        </>
                        }
                    </div>
                </>
                }
                { slide.type === "round" && <>
                    <div className="qnumber-header" id="question-number">
                        Round { slide.round }
                    </div>
                    <div className="editor-body">
                        <label htmlFor="question">Round Title:</label>
                        <input type="text" className="medium-input" required name="title" id="title"  value={ slide.title } onChange={ text => (changeSlideHandler("title", text.target.value)) }></input>
                        { slide.img && <>
                            <label className="image-preview-label">Image Preview:</label>
                            <div className="image-preview">
                                <img src={ slide.img } alt="Preview" className="image-preview__image"/>
                            </div>
                        </>
                        }
                    </div>
                </>
                }
                { slide.type === "intro" && 
                <>
                    <div className="qnumber-header" id="question-number">
                        Introduction Slide
                    </div>
                    <div className="editor-body">
                        <label htmlFor="question">Quiz Title:</label>
                        <input type="text" required className="medium-input" name="title" id="title"  value={ slide.title } onChange={ text => (changeSlideHandler("title", text.target.value)) }></input>
                        { quiz.type === "seasonal" && 
                        <>  
                            <br/>
                            <label htmlFor="question">Family Name:</label>
                            <input type="text" className="medium-input" required name="family" id="family" value={ slide.family } onChange={ text => (changeSlideHandler("family", text.target.value)) }></input> 
                        </>}
                        { slide.img && <>
                            <label className="image-preview-label">Image Preview:</label>
                            <div className="image-preview">
                                <img src={ slide.img } alt="Preview" className="image-preview__image"/>
                            </div>
                        </>
                        }
                    </div>
                </>
                }
            </div>
            
            <div className="image-toolbar">
                <div className="image-toolbar-label">Upload an Image:</div>
                { !slide.img && <input ref={(ref) => (setImgRef(ref))} value="" className="upload-file-input" type="file" accept="image/*" onChange={(e) => {onSlideImageChange(e)}}/> }
                { slide.img && <button className="remove-file-button" type="button" id="removeFile" onClick={removeImageFromSlide}>Remove File</button> }
                <div className="url-paste-container">
                    <input type="text" placeholder="Paste Image URL" className="url-paste-input" onChange={ text => {setImgUrlString(text.target.value)} } />
                    <button className="url-paste-button" type="button" onClick={() => (changeSlideHandler("img", imgUrlString)) } >Enter <i className="fas fa-share"></i></button>
                </div>
            </div>
        </div>
        );
}
 
export default Editor;