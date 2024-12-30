import React from "react";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="border rounded-lg p-6 flex flex-col items-stretch">
      <h3 className="text-2xl font-semibold title">{recipe.title}</h3>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mt-4"
      />
      {/* Add more details about the recipe here if needed */}
    </div>
  );
};

export default RecipeCard;
