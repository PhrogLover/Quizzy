import "./footer.css";
import { Link }  from "react-router-dom";

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
                <strong>Famous Quote of the Day:</strong>
                <p className="quote">"bruh"-dan (always)</p>
            </section>



            <div className='footer-link-container'>
                <div class='footer-link-items'>
                    <p>Explore</p>
                    <a href='/#'>Home</a>
                    <Link to='/creator'>Create a Quiz</Link>
                    <a href="/#joinquiz">Join a Quiz</a>
                    <a href="/#donate">Donate</a>
                </div>
                <div class='footer-link-items'>
                    <p>Contact</p>
                    <a href="https://www.linkedin.com/in/arijus-lengvenis-389b401b9/">AriG7</a>
                    <a href="https://www.linkedin.com/in/dan-champion-8b1325192/">Dayrungun</a>
                    <a href="#cunha">Cunha</a>
                </div>
                <div class='footer-link-items'>
                    <p>Social Media</p>
                    <Link to='/'>Instagram</Link>
                    <Link to='/'>Facebook</Link>
                    <Link to='/'>Twitter</Link>
                </div>
            </div>
            <section id="copyright">
            <div id="foot-logo" className="foot-logo">
                <img src="/images/Temp_Icon.png"/>
            </div>
                <div className="copyright-info">
                    {/* Copyright info */} bruh
                </div>
                    
            </section>
        </div>
     );
}
 
export default Footer;