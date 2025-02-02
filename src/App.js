import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RecipeForm from "./components/RecipeForm";
import IngredientForm from "./components/IngredientForm";
import FavoriteForm from "./components/FavoriteForm";
import './App.css'; // Import the CSS file

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/ingredients">Ingredients</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
          </ul>
        </nav>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/recipes" element={<RecipeForm />} />
            <Route path="/ingredients" element={<IngredientForm />} />
            <Route path="/favorites" element={<FavoriteForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
