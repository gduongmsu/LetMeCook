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
    setSelectedOptions(options); //grab array
  }

  const handleValueChange = (option, value) => {
    setFieldValues((prev) => ({
      ...prev,
      [option]: value
    }))
  }


  const handleSubmit = () => {
    alert("Selected filters: " + selectedOptions) //use array
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
          Submit
        </button>
      </div>
    </div>
  )
}

export default RecipeByNutrition
