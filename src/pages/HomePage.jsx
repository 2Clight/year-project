import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { jwtDecode } from "jwt-decode";

const HomePage = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(true); // Initial loading state
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    
    // If no token, redirect to login page
    if (!token) {
      setLoading(false); // Stop loading after redirecting
      navigate('/login');
      return;
    }

    try {
      const decodedUser = jwtDecode(token);
      setUserData(decodedUser);
      setAuthChecked(true); // Set authChecked after decoding token
    } catch (error) {
      console.log('Invalid token', error);
      setLoading(false); // Stop loading after redirecting
      navigate('/login');
      return;
    }

    setLoading(false); // Stop loading once the token is validated
  }, [navigate]);

  // If loading, show the spinner
  if (loading) {
    return <Spinner />;
  }

  // Once authentication is checked, render the page
  if (!authChecked) {
    return null; // Do not render anything if auth is not checked
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Recipe App</h1>
      <p className="text-lg text-gray-600 mb-8">
        Welcome to the Recipe App! Discover recipes by selecting ingredients.
      </p>
      <button
        onClick={() => navigate("/ingredients")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go to Ingredients List
      </button>
    </div>
  );
};

export default HomePage;
