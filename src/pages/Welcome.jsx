// src/pages/Welcome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();

  // This function will be called when the button is clicked
  const handleGetStarted = () => {
    // We'll send the user to the signup page to create an account
    navigate('/signup');
  };

  return (
    <div className="welcome-container">
      <div className="logo-placeholder">
        {/* You can put an <img /> tag here later */}
        🚀
      </div>
      <h1 className="welcome-title">Welcome to StudyOrbit</h1>
      <p className="welcome-subtitle">Your AI-powered academic co-pilot.</p>
      <button className="get-started-btn" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}

export default Welcome;