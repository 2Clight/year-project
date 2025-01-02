import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IngredientPage from "./pages/ingredientPage"; // Rename the current App component to IngredientPage
import "./App.css"; // Assuming you have styles here

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients" element={<IngredientPage />} />
      </Routes>
    </Router>
  );
}

export default App;
