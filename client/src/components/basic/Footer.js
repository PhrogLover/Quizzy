import "./footer.css";
import { Link }  from "react-router-dom";

const Footer = () => {
    return ( 
        <div className="footer">
            <section id="quotes">
                <strong>Famous Quote of the Day:</strong>
                <p className="quote">"bruh"-dan (always)</p>
            </section>

            <div className='footer-link-container'>
                <div className='footer-link-items'>
                    <p>Explore</p>
                    <a href='/#'>Home</a>
                    <Link to='/creator'>Create a Quiz</Link>
                    <Link to="/#joinquiz">Join a Quiz</Link>
                    <a href="/#donate">Donate</a>
                    <Link to='/aboutus'>About Us</Link>
                </div>
                <div className='footer-link-items'>
                    <p>Creators</p>
                    <a href="https://www.linkedin.com/in/arijus-lengvenis-389b401b9/">AriG7</a>
                    <a href="https://www.linkedin.com/in/dan-champion-8b1325192/">Dayrungun</a>
                    <a href="#cunha">Cunha</a>
                </div>
                <div className='footer-link-items'>
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
                    {/* Copyright info */} copyright stuffs
                </div>
                    
            </section>
        </div>
     );
}
 
export default Footer;