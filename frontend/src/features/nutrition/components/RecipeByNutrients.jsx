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
      unit: "g"
    },
    maxCarbs: {
      label: "Maximum Carbs",
      unit: "g"
    },
    minProtein: {
      label: "Minimum Protein",
      unit: "g"
    },
    maxProtein: {
      label: "Maximum Protein",
      unit: "g"
    },
    minCalories: {
      label: "Minimum Calories",
      unit: "Kcal"
    },
    maxCalories: {
      label: "Maximum Calories",
      unit: "Kcal"
    },
    minFat: {
      label: "Minimum Fat",
      unit: "g"
    },
    maxFat: {
      label: "Maximum Fat",
      unit: "g"
    },
    minCalcium: {
      label: "Minimum Calcium",
      unit: "mg"
    },
    maxCalcium: {
      label: "Maximum Calcium",
      unit: "mg"
    },
    minCholesterol: {
      label: "Minimum Cholesterol",
      unit: "mg"
    },
    maxCholesterol: {
      label: "Maximum Cholesterol",
      unit: "mg"
    },
    minSaturatedFat: {
      label: "Minimum Saturated Fats",
      unit: "g"
    },
    maxSaturatedFat: {
      label: "Maximum Saturated Fats",
      unit: ""
    },
    minFiber: {
      label: "Minimum Fiber",
      unit: "g"
    },
    maxFiber: {
      label: "Maximum Fiber",
      unit: "g"
    },
    minSodium: {
      label: "Minimum Sodium",
      unit: "mg"
    },
    maxSodium: {
      label: "Maximum Sodium",
      unit: "mg"
    },
    minSugar: {
      label: "Minimum Sugar",
      unit: "g"
    },
    maxSugar: {
      label: "Maximum Sugar",
      unit: "g"
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
  const [recipes, setRecipes] = useState([]) //return recipes, set state as an array (json returned is [])
  const [fieldValues, setFieldValues] = useState({}) // handles field values which will need to be a dictionary


  const handleSelect = (options) => {
    setSelectedOptions(options);
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
            option={option}
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
            />
          ))
        ) : (
          <p>No recipes found with current filter.</p>
        )}
      </div>
    </div>


  )
}

export default RecipeByNutrients
