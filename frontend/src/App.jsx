import { useState } from 'react'
import './App.css'

function App() {

  // "react hook" that lets you add state to functional components. 
  const [currentIngredient, setCurrentIngredient] = useState('')
  // currentIngredient; current value of search input 
  // setCurrentIngredient a function to update the search input value

  const [ingredientsList, setIngredientsList] = useState([])
  // ingredients: current array of ingredient data
  // setRecipe: function to update the recipe array

  // adds new ingredient to lis with error handling
  const handleAddIngredient = () => {
    if (currentIngredient.trim() !== '') // checks to see if input is empty or just spaces
      setIngredientsList([...ingredientsList, currentIngredient.trim()]) // adds new ingredient to list
    setCurrentIngredient('') // clear input field
  }

  // removes ingredient
  const removeIngredient = (indexToRemove) => {
    setIngredientsList(ingredientsList.filter((_, index) => index !== indexToRemove))
  }


  return (
    <>
      <div className="recipe-app">
        <h1>Recipe Lookup by Ingredient</h1>

        {/* input field for adding ingredients to a list */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for recipes"
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddIngredient()
              }
            }}
          />
          <button onClick={handleAddIngredient}>Add Ingredient</button>
        </div>

        {/* display section for added ingredients and allow for user to delete an ingredient */}
        <div className="ingredients-list">
          {ingredientsList.map((ingredient, index) => (
            <div key={index} className="ingredient-tag">
              {ingredient}
              <button
                className="remove-ingredient"
                onClick={() => removeIngredient(index)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
