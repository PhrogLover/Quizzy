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
                <div key={ index }>
                    <button type="button" onClick={ () => {changeCurrentSlide(slide.round, slide.quest)} }>
                        <p>{ slide.title }</p>
                        <p>{ slide.question }</p>
                    </button>
                </div>
            ))}
        </div>
     );
}
 
export default SlideNav
;