import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

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
