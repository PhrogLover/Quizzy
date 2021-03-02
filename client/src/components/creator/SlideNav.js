import "./slidenav.css";

const SlideNav = ({ slides, changeCurrentSlide }) => {

    let expandedSlides = [];
    expandedSlides.push(slides[0]);
    for (let i = 1; i < slides.length; i++) {
        expandedSlides.push(slides[i][0]);
        for (let  j = 1; j < slides[i].length; j++) {
            expandedSlides.push(slides[i][j])
        }
    }

    return ( 
        <div className="slidenav">
            {expandedSlides.map((slide, index) => (
                <div key={ index } className="button-container">
                    <button type="button" onClick={ () => {changeCurrentSlide(slide.round, slide.quest)} }>
                        {slide.round !== 0 && !(slide.type === "round") && <p>R{ slide.round }, Q{ slide.quest }</p>}
                        {slide.round !== 0 && slide.type === "round" && <p>R{ slide.round }</p>}
                        {slide.title && <p>{ slide.title }</p>}
                        {slide.question && <p>{ slide.question }</p>}
                        {slide.img && <div id="image-preview"><img src={ slide.img } alt="Preview" className="image-preview__image"/></div>}
                    </button>
                </div>
            ))}
        </div>
     );
}
 
export default SlideNav
;