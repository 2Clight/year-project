import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IngredientSection from "../components/IngredientSection";
import Pagination from "../components/pagination";
import RecipeCard from "../components/RecipeCard";
import ingredientsData from "../../data/ingredients";
import { jwtDecode } from "jwt-decode";

function IngredientPage() {
 
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
  const recipesPerPage = 6; // Limit of 5 recipes per page

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

 
  // Paginate recipes
  const paginateRecipes = () => {
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    return recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  };

   // Handle page change
   const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  // Calculate total number of pages
  const totalPages = Math.ceil(recipes.length / recipesPerPage);


  //Autentication check

  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const decodedUser = jwtDecode(token);
      setUserData(decodedUser);
    } catch (error) {
      console.log('Invalid token', error);
      navigate('/login');
      return;
    }
    setAuthChecked(true);
    setLoading(false);
    
  }, []);

  if (!authChecked || loading) {
    return <Spinner />;
  }


  
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full bg-white rounded-lg shadow-lg p-5 md:p-20">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 title">
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
            <h2 className="mb-10 text-2xl font-bold">Recipes:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6 ml-14 mr-14">
            {paginateRecipes().map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
            {/* Pagination Controls */}
            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          </div>
        )}

      </div>
    </div>
  );
}

export default IngredientPage;
