import "./slidenav.css";

const SlideNav = ({ slides }) => {

    function changeCurrentSlide(id) {
        return 0;
    }

    return ( 
        <div className="slidenav">
            {slides.map((slide) => (
                <div key={ slide.id }>
                    <button onClick={ () => {changeCurrentSlide(slide.id)} }>
                        <p>{ slide.question }</p>
                    </button>
                </div>
            ))}
        </div>
     );
}
 
export default SlideNav
;