import "./editor.css";

const Editor = ( { slide, changeSlideHandler } ) => {

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
        </div>
     );
}
 
export default Editor;