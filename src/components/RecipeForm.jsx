import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function RecipeForm() {
  const [recipes, setRecipes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/recipes');
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const recipeSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    instructions: Yup.string().required('Instructions are required'),
    meal_type: Yup.string().required('Meal type is required')
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const method = editMode ? 'PUT' : 'POST';
      const endpoint = editMode ? `http://127.0.0.1:5000/recipes/${currentRecipeId}` : 'http://127.0.0.1:5000/recipes';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editMode ? 'update' : 'create'} recipe`);
      }

      resetForm();
      setEditMode(false);
      setCurrentRecipeId(null);
      loadRecipes();
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'creating'} recipe:`, error);
    }
  };

  const handleEdit = (recipe) => {
    setEditMode(true);
    setCurrentRecipeId(recipe.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/recipes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }
      loadRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div>
      <h2>Recipe Form</h2>
      <Formik
        initialValues={{ title: '', description: '', instructions: '', meal_type: '' }}
        validationSchema={recipeSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form>
            <div>
              <label htmlFor="title">Title</label>
              <Field name="title" />
              <ErrorMessage name="title" component="div" />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Field name="description" as="textarea" />
              <ErrorMessage name="description" component="div" />
            </div>
            <div>
              <label htmlFor="instructions">Instructions</label>
              <Field name="instructions" as="textarea" />
              <ErrorMessage name="instructions" component="div" />
            </div>
            <div>
              <label htmlFor="meal_type">Meal Type</label>
              <Field name="meal_type" />
              <ErrorMessage name="meal_type" component="div" />
            </div>
            <button type="submit">{editMode ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => resetForm()}>Clear Form</button>
          </Form>
        )}
      </Formik>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.title} ({recipe.meal_type}){' '}
            <button onClick={() => handleEdit(recipe)}>Edit</button>{' '}
            <button onClick={() => handleDelete(recipe.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeForm;
