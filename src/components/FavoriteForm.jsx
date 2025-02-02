import React, { useState, useEffect } from 'react';
import './FavoriteForm.css'; // Import the CSS file

function FavoriteForm() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/favorites');
      if (!response.ok) {
        throw new Error('Failed to fetch favorite recipes');
      }
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorite recipes:', error);
    }
  };

  return (
    <div>
      <h2>Favorite Recipes</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            Recipe ID: {favorite.recipe_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteForm;
