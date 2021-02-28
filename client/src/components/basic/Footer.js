import "./footer.css";

const Footer = () => {
    return ( 
        <div className="footer">
            <section id="description">
                The <span>QuizWebApp</span> is a website dedicated to people wanting to engage in intellectual competitions,
                where teams gather, cooperate and battle other teams to see who truly are the quiz masters. Here we provide an intuitive,
                convenient and customizable environment for quizzes to flourish and for contestants to have fun. Furthermore, for quiz hosts,
                we offer the best quality-of-life features like live communication features, fast judging enhancements and more.
                We hope that this website will be used fairly by individuals simply wanting to compete and have fun chatting with friends or other brilliant people.
            </section>
            <section id="quotes">
                <span>Famous quotes throughout history:</span><br/>
                {/* quotes go here */}
            </section>
            <hr/>
            <section id="creators">
                <a href="https://www.linkedin.com/in/arijus-lengvenis-389b401b9/">
                    AriG7
                </a>
                <a href="https://www.linkedin.com/in/dan-champion-8b1325192/">
                    Dayrungun
                </a>
                <a href="#cunha">
                    Cunha
                </a>
            </section>
            <section id="copyright">
                {/* Copyright info */}
            </section>
        </div>
     );
}
 
export default Footer;