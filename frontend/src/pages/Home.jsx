import IngredientCard from "../components/IngredientCard"
import { useState } from "react"
import "../css/Home.css"

function Home() {
    // using state for data that needs to persist, otherwise the variable gets cleared
    const [searchQuery, setSearchQuery] = useState("")

    const ingredients = [
        { id: 1, name: "Wheat Buns" },
        { id: 2, name: "Beef Patty" },
        { id: 3, name: "Sliced Tomatoes" },
        { id: 4, name: "Mayonaise" },
        { id: 5, name: "Mustard" },
        { id: 6, name: "Ketchup" },
        { id: 7, name: "Cheddar Cheese" },
    ]

    const handleSearch = (e) => {
        e.preventDefault() // wont clear search bar 
        alert(searchQuery)
    }

    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                placeholder="Type for Ingredients"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} //each time text is detected in search bar, (state change occures) it reruns the component 
            />
            <button type="submit" className="search-button">Search for Recipe</button>
        </form>
        <div className="ingredients-grid">
            {ingredients.map(
                (ingredient) =>
                    ingredient.name.toLowerCase().startsWith(searchQuery) && (
                        <IngredientCard ingredient={ingredient} key={ingredient.id} />
                    )

            )}
        </div>
    </div>
}

export default Home