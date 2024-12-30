import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div className="main-page">
      <header className="hero bg-gray-100 text-center py-20">
        <h1 className="text-4xl font-bold">Welcome to Recipe Finder</h1>
        <p className="text-lg mt-4">Discover recipes based on the ingredients you have at home!</p>
        <Link
          to="/recipes"
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Get Started
        </Link>
      </header>
      <section className="features py-12">
        <h2 className="text-2xl font-bold text-center mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="feature-card text-center border p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Ingredient Selection</h3>
            <p className="mt-2">Select what you have, and we’ll do the rest.</p>
          </div>
          <div className="feature-card text-center border p-4 rounded-lg">
            <h3 className="text-xl font-semibold">AI-Powered Suggestions</h3>
            <p className="mt-2">Get the best recipes tailored to your pantry.</p>
          </div>
          <div className="feature-card text-center border p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Easy Navigation</h3>
            <p className="mt-2">Search, filter, and save your favorite recipes!</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainPage;
