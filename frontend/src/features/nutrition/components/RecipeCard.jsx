import "./RecipeCard.css"
import { getRecipeById } from "../../../api/SearchByNutrients"

function RecipeCard({ recipe, activeFields, onView }) { //recipe represents each object within the array returned frm spoonacular

    const handleViewRecipe = async () => {

        const data = await getRecipeById(recipe.id);

        const filteredNutrients = data.nutrition?.nutrients.filter((nutrient) =>
            activeFields.some((field) => field.nutrientName === nutrient.name)
        ) || [];

        onView({ ...data, filteredNutrients })
    }

    return (
        <div className="recipe-card">
            {recipe.image && (
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="recipe-card-image"
                />
            )}
            <h3 className="recipe-card-title">{recipe.title}</h3>
            <button className="view-button" onClick={handleViewRecipe}>
                View Recipe
            </button>
        </div>
    )
}

// return from spoonacular
// "nutrition": {
//     "nutrients": [
//         { "name": "Calories", "amount": 500, "unit": "kcal" },
//         { "name": "Carbohydrates", "amount": 32, "unit": "g" },
//         { "name": "Protein", "amount": 12, "unit": "g" }
//     ]
// }

export default RecipeCard