import useFitText from "use-fit-text";

const Timer = ({ seconds }) => {

    const { fontSize: timerFontSize, ref: timerRef } = useFitText({
        maxFontSize: 300,
        minFontSize: 20,
        onFinish: () => {}
    });

    return (
        <div className="timer" ref={ timerRef } style={{ fontSize: timerFontSize }}>
            { seconds }s
        </div>
    )
}

export default Timer;