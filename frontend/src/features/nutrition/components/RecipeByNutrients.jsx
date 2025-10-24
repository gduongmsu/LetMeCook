import './RecipeByNutrients.css'
import { useState } from 'react';
import NutritionSideBar from './NutritionSideBar';
import NutritionField from './NutritionField';
import { searchRecipeByNutrients } from '../../../api/SearchByNutrients';

function RecipeByNutrients() {

  const nutritionOptions = [
    "minCarbs",
    "maxCarbs",
    "minProtein",
    "maxProtein",
    "minCalories",
    "maxCalories",
    "minFat",
    "maxFat",
    "minAlcohol",
    "maxAlcohol",
    "minCaffeine",
    "maxCaffeine",
    "minCopper",
    "maxCopper",
    "minCholine",
    "maxCholine",
    "minCholesterol",
    "maxCholesterol",
    "minFluoride",
    "maxFluoride",
    "minSaturatedFat",
    "maxSaturatedFat",
    "minFiber",
    "maxFiber"

  ];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [recipes, setRecipes] = useState([]) //return recipes, set state as an array (json returned is [])
  const [fieldValues, setFieldValues] = useState({}) // handles field values which will need to be a dictionary


  const handleSelect = (options) => {
    setSelectedOptions(options); //grab array
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
          options={nutritionOptions}
          onSelect={handleSelect}
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
    </div>
  )
}

export default RecipeByNutrients
