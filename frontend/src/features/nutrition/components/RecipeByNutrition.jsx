import './RecipeByNutrition.css'
import { useState } from 'react';
import NutritionSideBar from './NutritionSideBar';
import NutritionField from './NutritionField';

function RecipeByNutrition() {

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


  const handleSelect = (options) => {
    setSelectedOptions(options); //grab the array
  }
  const handleSubmit = () => {
    alert("Selected filters: " + selectedOptions)
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
        <NutritionField />
        <button
          onClick={handleSubmit}
          className="submit-button"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default RecipeByNutrition
