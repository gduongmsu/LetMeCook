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
    <div className="nutrient-page">

      {/* sidebar */}
      <div className="sidebar">
        <NutritionSideBar
          options={nutritionOptions}
          onSelect={handleSelect}
        />
      </div>

      {/* main content */}
      <main className="content">

        {/* field section */}
        <section className="fields-section">
          <div className="fields-container">
            {selectedOptions.map((option) => (
              <NutritionField
                key={option}
                optionKey={option}
                option={nutritionOptions[option]}
                onValueChange={handleValueChange}
              />
            ))}
          </div>

          {/* submit */}
          <div className="submit-button-wrapper">
            {selectedOptions.length > 0 && (
              <button className="submit-button" onClick={handleSubmit}>
                Search for Recipes
              </button>

            )}
          </div>
        </section>

        {/* recipe cards */}
        <section className="recipe-results">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-wrapper">
                <RecipeCard
                  recipe={recipe}
                  activeFields={activeFields}
                  onView={setSelectedRecipe}
                />

                {/* expand recipe card on "view" */}
                {selectedRecipe?.id === recipe.id && (
                  <div className="recipe-details">
                    <h2>{selectedRecipe.title}</h2>
                    {selectedRecipe.image && (
                      <img src={selectedRecipe.image} alt="" />
                    )}

                    <h3>Nutrition</h3>
                    <ul>
                      {selectedRecipe.filteredNutrients.map(n => (
                        <li key={n.name}>
                          {n.name}: {n.amount} {n.unit}
                        </li>
                      ))}
                    </ul>

                    <h3>Instructions</h3>
                    <p>{selectedRecipe.instructions || "No instructions available."}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No recipes found with current filters.</p>
          )}
        </section>

      </main>
    </div>
  );
}

export default RecipeByNutrients
