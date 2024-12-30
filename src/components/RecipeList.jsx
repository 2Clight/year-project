import React from "react";

function RecipeList({ recipes }) {
  return (
    <div className="recipe-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card border rounded-lg p-4">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="text-lg font-bold mt-2">{recipe.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
