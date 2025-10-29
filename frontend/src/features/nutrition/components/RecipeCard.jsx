import "./RecipeCard.css"

function RecipeCard({ recipe, activeFields, onView }) { //recipe represents each object within the array returned frm spoonacular


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
            <button className="view-button" onClick={onView}>
                View Recipe
            </button>
        </div>
    )
}
// for each activefields passes, the recipe should grab all 
// its activefields and display the nutritin in the preview data


export default RecipeCard