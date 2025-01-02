import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup"); // Redirect to the signup page
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Our Recipe Finder App</h1>
      <p>Discover delicious recipes based on the ingredients you have!</p>
      <button className="get-started-btn" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}

export default LandingPage;
