import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IngredientPage from "./pages/IngredientPage"; // Rename the current App component to IngredientPage
import LandingPage from "./pages/LandingPage"; // New landing page
import SignupPage from "./pages/SignupPage"; // New signup page
import LoginPage from "./pages/LoginPage";
import "./App.css"; // Assuming you have styles here

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Landing Page */}
        <Route path="/signup" element={<SignupPage />} /> {/* Signup Page */}
        <Route path="/login" element={<LoginPage />} /> {/* Login Page */}
        <Route path="/home" element={<HomePage />} /> {/* Home Page */}
        <Route path="/ingredients" element={<IngredientPage />} /> {/* Ingredients Page */}
      </Routes>
    </Router>
  );
}

export default App;
