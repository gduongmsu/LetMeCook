import "./IngredientCard.css"

function IngredientCard({ ingredient }) {
    return (
        <div className="ingredient-card">
            <div className="container-1">
                <img
                    src={ingredient.url}
                    alt={`${ingredient.name}.png`}
                />

            </div>
            <div className="ingredient-info">
                <h3>{ingredient.name}</h3>
                <p>{ingredient.id}</p>
            </div>
        </div>
    )

}

export default IngredientCard
