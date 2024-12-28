import React, { useState } from "react";

const IngredientSection = ({ category, ingredients, onSelect, selectedIngredients }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer text-2xl font-semibold text-gray-800 hover:text-gray-600"
      >
        {category}
      </div>
      {isOpen && (
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <div className="flex flex-wrap gap-4">
            {ingredients.map((ingredient, index) => (
              <button
                key={index}
                onClick={() => onSelect(ingredient)}
                className={`p-2 border-2 rounded-lg w-max transition-all ${
                  selectedIngredients.includes(ingredient.name)
                    ? 'bg-green-100 border-green-300'
                    : 'hover:bg-gray-200'
                }`}
              >
                {ingredient.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientSection;
