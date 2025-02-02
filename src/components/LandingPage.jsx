import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import the CSS file

const LandingPage = () => {
  return (
    <div id="landing-container">
      <header id="landing-hero">
        <h1>Welcome to the Recipe App</h1>
        <p>Find and save your favorite recipes by meal type and ingredients.</p>
        <Link id="landing-button" to="/recipes">Get Started</Link>
      </header>
      <section id="landing-features">
        <div className="feature">
          <h2>Search by Ingredients</h2>
          <p>Find recipes based on the ingredients you have at home.</p>
        </div>
        <div className="feature">
          <h2>Save Favorites</h2>
          <p>Easily save and access your favorite recipes.</p>
        </div>
        <div className="feature">
          <h2>Filter by Meal Type</h2>
          <p>Filter recipes by breakfast, lunch, dinner, and more.</p>
        </div>
      </section>
      <footer id="landing-footer">
        <p>&copy; 2025 Recipe App. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
