import "./RecipeCard.css"

function RecipeCard({ recipe, activeFields }) { //recipe represents each object within the array returned frm spoonacular


    return (
        <div className="recipe-card">
            <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-image"
            />
            <div className="recipe-content">
                <h3 className="recipe-title">
                    {recipe.title}
                </h3>

                <div className="recipe-info">

                </div>

            </div>

        </div>
    )
}


export default RecipeCard