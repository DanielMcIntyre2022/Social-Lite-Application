import React from 'react'
import logo from '../images/Logo.jpg'
import Social from '../images/Socialite-Landing-Main.jpg'
import "../StyleComponents/HomePage.css"
import { Routes, Route, useNavigate } from 'react-router-dom';

function HomePage() {

  
  const navigate = useNavigate();
  const navigateCreateEvent = () => {
    navigate('/CreateEvent');
  };
  return (
    <div className='full-body'>
      <div className='home-container'>
        <img className='soc_logo' src={logo} alt="Socialite logo"/>
      </div>
      <img className='home_jpg' src={Social} alt="Friends Main" />
      
      <div className='text-style'>
        <span><p2 className="normal">Easily</p2><p2 className="bold"> create, view & </p2></span><br/>
        <span><p2 className="bold"> share </p2> <p2 className="normal"> events with</p2></span><br/>
        <span><p2 className="normal">your friends!</p2></span>
      </div>
      <div className='box'>
        <button className="event-create-button" type="button" onClick={navigateCreateEvent}>Create an Event</button>
        
        <Routes>
          <Route path="/CreateEvent" />
        </Routes>
      </div>
    </div>
  )
}

export default HomePage
