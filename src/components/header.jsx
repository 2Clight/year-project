import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Recipe Finder</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/recipes" className="hover:underline">
              Recipes
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </li>
          {isAuthenticated() ? (
            <li>
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
