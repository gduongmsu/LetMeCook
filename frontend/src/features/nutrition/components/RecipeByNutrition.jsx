import './RecipeByNutrition.css'
// import { useState } from 'react';
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

  const handleSelect = (option) => {
    alert(option)
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
      </div>
    </div>
  )
}

export default RecipeByNutrition
