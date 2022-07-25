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
    <div>
    <div className='home-container'>
    
    <img className='soc_logo' src={logo} alt="Socialite logo"/>
    </div>
    <img className='home_jpg' src={Social} alt="Friends Main" />
      
      <div className='text-style'>
     
        <span><p1>Easily</p1><p2 className="bold"> create, view & </p2></span><br/>
        <span><p2 className="bold"> share </p2> <p1> events with</p1></span><br/>
        <span><p1>your friends!</p1></span>
      </div>
      <div className='box'>
          <button className="home-page-button" type="button" onClick={navigateCreateEvent}>Create an Event</button>

          <Routes>
          <Route path="/CreateEvent" />
        </Routes>
        </div>
    </div>
  )
}

export default HomePage
