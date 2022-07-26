import React from 'react';
import Social from '../assets/Socialite-Landing-Main.jpg';
import "../StyleComponents/HomePage.css";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../Components/Header'

function HomePage() {

  const navigate = useNavigate();
  const navigateCreateEvent = () => {
    navigate('/CreateEvent');
  };

  return (
    <>
      < Header />
      <div className='home-page-container'>
        <div className="home-image-container">
          <img className='home_jpg' src={Social} alt="Friends Main" />
        </div>
        <div className='home-box-container'>
          <div className="home-text-container">
            <p>Easily <b>create, view and share</b> events with your friends!</p>
          </div>
          <div className="home-button-container">   
            <button className="home-page-button" type="button" onClick={navigateCreateEvent}>Create Event</button>
        </div>     
          <Routes>
          <Route path="/CreateEvent" />
        </Routes>
        </div>
      </div>
    </>
  )
}

export default HomePage
