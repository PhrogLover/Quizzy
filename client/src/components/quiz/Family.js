import useFitText from "use-fit-text";

const Family = ({ family, iteration }) => {
    
    const { fontSize: familyFontSize, ref: familyRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 3,
    });

    return ( 
        <div className="title-family" ref={familyRef} style={{ fontSize: familyFontSize }}>
            { family } <br/> Iteration: { iteration }
        </div>
     );
}
 
export default Family;