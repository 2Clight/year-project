import { useState } from "react";
import IngredientSection from "./components/IngredientSection";

function App() {
  const ingredientsData = [
    { name: "Milk", category: "Dairy" },
    { name: "Cheese", category: "Dairy" },
    { name: "Butter", category: "Dairy" },
    { name: "Yogurt", category: "Dairy" },
    { name: "Cream", category: "Dairy" },
    { name: "Cottage Cheese", category: "Dairy" },
    { name: "Mozzarella", category: "Dairy" },
    { name: "Parmesan", category: "Dairy" },
    { name: "Ricotta", category: "Dairy" },
    { name: "Sour Cream", category: "Dairy" },

    { name: "Chicken", category: "Poultry" },
    { name: "Egg", category: "Poultry" },
    { name: "Turkey", category: "Poultry" },
    { name: "Duck", category: "Poultry" },
    { name: "Goose", category: "Poultry" },
    { name: "Chicken Breast", category: "Poultry" },
    { name: "Chicken Thighs", category: "Poultry" },
    { name: "Chicken Wings", category: "Poultry" },
    { name: "Turkey Breast", category: "Poultry" },
    { name: "Turkey Legs", category: "Poultry" },

    { name: "Carrot", category: "Vegetables" },
    { name: "Spinach", category: "Vegetables" },
    { name: "Lettuce", category: "Vegetables" },
    { name: "Broccoli", category: "Vegetables" },
    { name: "Cauliflower", category: "Vegetables" },
    { name: "Cucumber", category: "Vegetables" },
    { name: "Tomato", category: "Vegetables" },
    { name: "Zucchini", category: "Vegetables" },
    { name: "Bell Pepper", category: "Vegetables" },
    { name: "Onion", category: "Vegetables" },

    { name: "Apple", category: "Fruits" },
    { name: "Banana", category: "Fruits" },
    { name: "Orange", category: "Fruits" },
    { name: "Strawberry", category: "Fruits" },
    { name: "Blueberry", category: "Fruits" },
    { name: "Pineapple", category: "Fruits" },
    { name: "Grapes", category: "Fruits" },
    { name: "Peach", category: "Fruits" },
    { name: "Pear", category: "Fruits" },
    { name: "Mango", category: "Fruits" },

    { name: "Rice", category: "Grains" },
    { name: "Quinoa", category: "Grains" },
    { name: "Oats", category: "Grains" },
    { name: "Barley", category: "Grains" },
    { name: "Wheat", category: "Grains" },
    { name: "Couscous", category: "Grains" },
    { name: "Polenta", category: "Grains" },
    { name: "Bulgur", category: "Grains" },
    { name: "Buckwheat", category: "Grains" },
    { name: "Cornmeal", category: "Grains" },

    { name: "Cinnamon", category: "Spices" },
    { name: "Nutmeg", category: "Spices" },
    { name: "Cumin", category: "Spices" },
    { name: "Paprika", category: "Spices" },
    { name: "Turmeric", category: "Spices" },
    { name: "Ginger", category: "Spices" },
    { name: "Garlic Powder", category: "Spices" },
    { name: "Onion Powder", category: "Spices" },
    { name: "Chili Powder", category: "Spices" },
    { name: "Cardamom", category: "Spices" },

    { name: "Almonds", category: "Nuts" },
    { name: "Cashews", category: "Nuts" },
    { name: "Walnuts", category: "Nuts" },
    { name: "Pecans", category: "Nuts" },
    { name: "Pistachios", category: "Nuts" },
    { name: "Hazelnuts", category: "Nuts" },
    { name: "Macadamia Nuts", category: "Nuts" },
    { name: "Brazil Nuts", category: "Nuts" },
    { name: "Pine Nuts", category: "Nuts" },
    { name: "Chestnuts", category: "Nuts" },

    { name: "Salmon", category: "Seafood" },
    { name: "Shrimp", category: "Seafood" },
    { name: "Tuna", category: "Seafood" },
    { name: "Cod", category: "Seafood" },
    { name: "Mackerel", category: "Seafood" },
    { name: "Sardines", category: "Seafood" },
    { name: "Halibut", category: "Seafood" },
    { name: "Clams", category: "Seafood" },
    { name: "Lobster", category: "Seafood" },
    { name: "Crab", category: "Seafood" },
  ];
  const categories = [...new Set(ingredientsData.map((item) => item.category))];
  const groupedIngredients = categories.map((category) => ({
    category,
    ingredients: ingredientsData.filter(
      (ingredient) => ingredient.category === category
    ),
  }));

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const recipesPerPage = 5; // Limit of 5 recipes per page

  const handleSelect = (ingredient) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredient.name)
        ? prevSelected.filter((name) => name !== ingredient.name)
        : [...prevSelected, ingredient.name]
    );
  };

  const fetchRecipes = async () => {
    if (selectedIngredients.length === 0) {
      alert("Please select at least one ingredient.");
      return;
    }

    try {
      const apiKey = "dec989b0fd284b688c8e0c0cc7958e9b"; // Replace with your API key
      const ingredientsString = selectedIngredients.join(","); // Join ingredients with commas
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&number=20&apiKey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();

      // Sort recipes by the number of missed ingredients (least first), then by the number of used ingredients (most first)
      const sortedRecipes = data.sort((a, b) => {
        if (a.missedIngredientCount === b.missedIngredientCount) {
          return b.usedIngredientCount - a.usedIngredientCount;
        }
        return a.missedIngredientCount - b.missedIngredientCount;
      });

      setRecipes(sortedRecipes);

    } catch (error) {
      console.error("Error fetching recipes:", error);
      alert("Error fetching recipes. Please try again later.");
    }
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Paginate recipes
  const paginateRecipes = () => {
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    return recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full bg-white rounded-lg shadow-lg p-6 max-w-7xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Ingredients List
        </h1>
        <div className="space-y-4">
          {groupedIngredients.map((group, index) => (
            <IngredientSection
              key={index}
              category={group.category}
              ingredients={group.ingredients}
              onSelect={handleSelect}
              selectedIngredients={selectedIngredients}
            />
          ))}
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Selected Ingredients:</h2>
          <ul>
            {selectedIngredients.map((ingredient, index) => (
              <li key={index} className="text-gray-600">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={fetchRecipes}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Find Recipes
          </button>
        </div>
        {recipes.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Recipes:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {paginateRecipes().map((recipe, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="text-xl font-semibold">{recipe.title}</h3>
                  {/* Display recipe details */}
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-64 object-cover rounded-lg mt-4"
                  />
                </div>
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-lg">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
