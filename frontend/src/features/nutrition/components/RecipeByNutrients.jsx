import './RecipeByNutrients.css'
import { useState } from 'react';
import NutritionSideBar from './NutritionSideBar';
import NutritionField from './NutritionField';
import { searchRecipeByNutrients } from '../../../api/SearchByNutrients';
import RecipeCard from './RecipeCard';

function RecipeByNutrients() {

  const nutritionOptions = {
    minCarbs: {
      label: "Minimum Carbs",
      unit: "g",
      nutrientName: "Carbohydrates", // spoonacular key name
    },
    maxCarbs: {
      label: "Maximum Carbs",
      unit: "g",
      nutrientName: "Carbohydrates",
    },
    minProtein: {
      label: "Minimum Protein",
      unit: "g",
      nutrientName: "Protein",
    },
    maxProtein: {
      label: "Maximum Protein",
      unit: "g",
      nutrientName: "Protein",
    },
    minCalories: {
      label: "Minimum Calories",
      unit: "Kcal",
      nutrientName: "Calories",
    },
    maxCalories: {
      label: "Maximum Calories",
      unit: "Kcal",
      nutrientName: "Calories",
    },
    minFat: {
      label: "Minimum Fat",
      unit: "g",
      nutrientName: "Fat",
    },
    maxFat: {
      label: "Maximum Fat",
      unit: "g",
      nutrientName: "Fat",
    },
    minCalcium: {
      label: "Minimum Calcium",
      unit: "mg",
      nutrientName: "Calcium",
    },
    maxCalcium: {
      label: "Maximum Calcium",
      unit: "mg",
      nutrientName: "Calcium",
    },
    minCholesterol: {
      label: "Minimum Cholesterol",
      unit: "mg",
      nutrientName: "Cholesterol",
    },
    maxCholesterol: {
      label: "Maximum Cholesterol",
      unit: "mg",
      nutrientName: "Cholesterol",
    },
    minSaturatedFat: {
      label: "Minimum Saturated Fat",
      unit: "g",
      nutrientName: "Saturated Fat",
    },
    maxSaturatedFat: {
      label: "Maximum Saturated Fat",
      unit: "g",
      nutrientName: "Saturated Fat",
    },
    minFiber: {
      label: "Minimum Fiber",
      unit: "g",
      nutrientName: "Fiber",
    },
    maxFiber: {
      label: "Maximum Fiber",
      unit: "g",
      nutrientName: "Fiber",
    },
    minSodium: {
      label: "Minimum Sodium",
      unit: "mg",
      nutrientName: "Sodium",
    },
    maxSodium: {
      label: "Maximum Sodium",
      unit: "mg",
      nutrientName: "Sodium",
    },
    minSugar: {
      label: "Minimum Sugar",
      unit: "g",
      nutrientName: "Sugar",
    },
    maxSugar: {
      label: "Maximum Sugar",
      unit: "g",
      nutrientName: "Sugar",
    }

    /*
    //possible other:
    //minCaffeine
    //maxCaffeine
    //min/maxIron
    //min/maxPotassium
    //min/maxMagnesium
  */

  };

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [recipes, setRecipes] = useState([]); //return recipes, set state as an array (json returned is [])
  const [fieldValues, setFieldValues] = useState({}); // handles field values which will need to be a dictionary
  const [selectedRecipe, setSelectedRecipe] = useState(null); //recipe to view, initially set to null
  const [activeFields, setActiveFields] = useState([]);


  const handleSelect = (options) => {
    setSelectedOptions(options);
    setActiveFields(options.map(option => nutritionOptions[option]))
  }

  const handleValueChange = (option, value) => {
    setFieldValues((prev) => ({
      ...prev,
      [option]: value
    }))
  }


  const handleSubmit = async () => {
    try {
      const results = await searchRecipeByNutrients(fieldValues);
      setRecipes(results);

      console.log("Fetched recipes", results);
    } catch (err) {
      console.error("Error with fetching recipes:", err);
    }

  }


  return (
    <div className="layout">
      <div className="nutrition-sidebar">
        <NutritionSideBar
          options={nutritionOptions} //pass whole object
          onSelect={handleSelect} //
        />
      </div>

      <div className="field-layout">
        {selectedOptions.map((option) => (
          <NutritionField
            key={option}
            optionKey={option}
            option={nutritionOptions[option]} //pass full object to grab other data like label
            onValueChange={handleValueChange}
          />
        ))}

        <button
          onClick={handleSubmit}
          className="submit-button"
        >
          Search for Recipes
        </button>
      </div>

      <div className="recipe-results">
        {recipes.length > 0 ? (
          recipes.map((recipe) => ( //iterates over array returned from GET request
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              activeFields={activeFields}
              onView={setSelectedRecipe}
            />
          ))
        ) : (
          <p>No recipes found with current filter.</p>
        )}
      </div>


      {/* look at Home.jsx and try to use similar styling */}
      {selectedRecipe && (
        <div className="recipe-preview">
          <h2>{selectedRecipe.title}</h2>
          {selectedRecipe.image && <img src={selectedRecipe.image} alt={selectedRecipe.title} />}

          <h3>Nutrition</h3>
          <ul>
            {selectedRecipe.filteredNutrients.map(nutrient => (
              <li key={nutrient.name}>
                {nutrient.name}: {nutrient.amount} {nutrient.unit}
              </li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <p>{selectedRecipe.instructions || "No instructions available."}</p>

        </div>
      )}




    </div>


  )
}

export default RecipeByNutrients
