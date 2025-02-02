import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function IngredientForm() {
  const [ingredients, setIngredients] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentIngredientId, setCurrentIngredientId] = useState(null);

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/ingredients');
      if (!response.ok) {
        throw new Error('Failed to fetch ingredients');
      }
      const data = await response.json();
      setIngredients(data);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const ingredientSchema = Yup.object().shape({
    name: Yup.string().required('Name is required')
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const method = editMode ? 'PUT' : 'POST';
      const endpoint = editMode ? `http://127.0.0.1:5000/ingredients/${currentIngredientId}` : 'http://127.0.0.1:5000/ingredients';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editMode ? 'update' : 'create'} ingredient`);
      }

      resetForm();
      setEditMode(false);
      setCurrentIngredientId(null);
      loadIngredients();
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'creating'} ingredient:`, error);
    }
  };

  const handleEdit = (ingredient) => {
    setEditMode(true);
    setCurrentIngredientId(ingredient.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/ingredients/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete ingredient');
      }
      loadIngredients();
    } catch (error) {
      console.error('Error deleting ingredient:', error);
    }
  };

  return (
    <div>
      <h2>Ingredient Form</h2>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={ingredientSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <button type="submit">{editMode ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => resetForm()}>Clear Form</button>
          </Form>
        )}
      </Formik>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name}{' '}
            <button onClick={() => handleEdit(ingredient)}>Edit</button>{' '}
            <button onClick={() => handleDelete(ingredient.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientForm;
