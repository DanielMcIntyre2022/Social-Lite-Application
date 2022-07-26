import "../StyleComponents/Header.css";
import { useNavigate } from 'react-router-dom';
import headerImage from '../assets/Socialite-Logo.jpg';

function Header() {

    const Navigate = useNavigate(); 

    const returnHome = () => {
        Navigate('/')
    }

    return (
        <div className="header-container">
        <header>
                <img src={headerImage} alt="social-lite logo" onClick={returnHome}></img>
            </header>
        </div>
)}

export default Header;