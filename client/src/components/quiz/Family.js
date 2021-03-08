import useFitText from "use-fit-text";

const Family = ({ family, iteration }) => {
    
    const { fontSize: familyFontSize, ref: familyRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 3,
    });

    const { fontSize: iterationFontSize, ref: iterationRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 3,
    });

    return (
        <>
            <div className="title-family" ref={familyRef} style={{ fontSize: familyFontSize }}>
                { family }
            </div>
            <div className="title-family" ref={iterationRef} style={{ fontSize: iterationFontSize }}>
                Season Iteration: { iteration }
            </div>
        </>
     );
}
 
export default Family;