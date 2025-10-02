// ===== IMPORTS =====
import { useState } from "react"
import IngredientCard from "../components/IngredientCard"
import WITH_List from '../components/WITH_List'
import WITHOUT_List from '../components/WITHOUT_List'
import "../css/Home.css"


function Home() {
  // ===== INGREDIENT DATA ==========================================================================================
  // Combined ingredient data with all properties for both features
  const ingredients = [
    { id: 1, name: "Tomato", url: 'https://spoonacular.com/cdn/ingredients_100x100/tomato.jpg' },
    { id: 2, name: "Chicken", url: 'https://spoonacular.com/cdn/ingredients_100x100/chicken-breasts.jpg' },
    { id: 3, name: "Rice", url: 'https://spoonacular.com/cdn/ingredients_100x100/rice-white-long-grain-or-basil.jpg' },
    { id: 4, name: "Onion", url: 'https://spoonacular.com/cdn/ingredients_100x100/brown-onion.jpg' },
    { id: 5, name: "Garlic", url: 'https://spoonacular.com/cdn/ingredients_100x100/garlic.jpg' },
    { id: 6, name: "Cheese", url: 'https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.jpg' },
    { id: 7, name: "Pasta", url: 'https://spoonacular.com/cdn/ingredients_100x100/fusilli.jpg' },
    { id: 8, name: "Beef", url: 'https://spoonacular.com/cdn/ingredients_100x100/beef-cubes-raw.jpg' },
  ]

  // ===== STATE MANAGEMENT =========================================================================================
  // Original search state - using state for data that needs to persist
  const [searchQuery, setSearchQuery] = useState("")
  
  // New drag-and-drop states
  const [withList, setWithList] = useState([])           // Ingredients to INCLUDE
  const [withoutList, setWithoutList] = useState([])     // Ingredients to EXCLUDE
  const [draggedIngredient, setDraggedIngredient] = useState(null) // Currently dragging

  // ===== SEARCH HANDLERS =========================================================================================
  
  /**
   * Original search handler - processes the search query
   * @param {Event} e - Form submit event
   */
  const handleSearch = (e) => {
    e.preventDefault() // Won't clear search bar
    
    // Log the search along with selected lists
    console.log('Search query:', searchQuery)
    console.log('Searching with:', withList.map(ing => ing.name))
    console.log('Excluding:', withoutList.map(ing => ing.name))
    
    // TODO: Implement actual search logic with Spoonacular API
    alert(`Searching for: ${searchQuery}\nWith: ${withList.map(i => i.name).join(', ')}\nWithout: ${withoutList.map(i => i.name).join(', ')}`)
  }

  // ===== DRAG AND DROP HANDLERS =========================================================================================
  
  /**
   * Handles the start of a drag operation
   * @param {Event} e - The drag event
   * @param {Object} ingredient - The ingredient being dragged
   * @param {string} source - Where the ingredient is being dragged from
   */
  const handleDragStart = (e, ingredient, source) => {
    setDraggedIngredient({ ingredient, source })
    e.dataTransfer.effectAllowed = 'move'
  }

  /**
   * Handles drag over event (required to allow dropping)
   * @param {Event} e - The drag event
   */
  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  /**
   * Handles dropping an ingredient into a list
   * @param {Event} e - The drop event
   * @param {string} targetList - Which list to drop into ('with' or 'without')
   */
  const handleDrop = (e, targetList) => {
    e.preventDefault()
    
    if (!draggedIngredient) return

    const { ingredient, source } = draggedIngredient

    // Remove from source list if coming from a list
    if (source === 'with') {
      setWithList(withList.filter(item => item.id !== ingredient.id))
    } else if (source === 'without') {
      setWithoutList(withoutList.filter(item => item.id !== ingredient.id))
    }

    // Add to target list (prevent duplicates)
    if (targetList === 'with' && !withList.find(item => item.id === ingredient.id)) {
      setWithList([...withList, ingredient])
    } else if (targetList === 'without' && !withoutList.find(item => item.id === ingredient.id)) {
      setWithoutList([...withoutList, ingredient])
    }

    setDraggedIngredient(null)
  }

  /**
   * Removes an ingredient from the WITH list
   * @param {number} indexToRemove - Index of ingredient to remove
   */
  const removeFromWithList = (indexToRemove) => {
    setWithList(withList.filter((_, index) => index !== indexToRemove))
  }

  /**
   * Removes an ingredient from the WITHOUT list
   * @param {number} indexToRemove - Index of ingredient to remove
   */
  const removeFromWithoutList = (indexToRemove) => {
    setWithoutList(withoutList.filter((_, index) => index !== indexToRemove))
  }

  // ===== RENDER =========================================================================================
  return (
    <div className="home">
      {/* Page Title */}
      <h1>Recipe Lookup by Ingredient</h1>

      {/* Main Layout with Lists */}
      <div className="main-content">
        
        {/* LEFT: WITH (Include) List */}
        <WITH_List
          ingredients={withList}
          onRemove={removeFromWithList}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />

        {/* CENTER: Search and Ingredient Cards */}
        <div className="center-section">
          
          {/* Original Search Form */}
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Type for Ingredients"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Each time text is detected, state change occurs
            />
            <button type="submit" className="search-button">
              Search for Recipe
            </button>
          </form>

          {/* Ingredient Cards Grid - with drag functionality */}
          <div className="ingredients-grid">
            {ingredients.map((ingredient) =>
              // Filter: only show ingredients that start with search query
              ingredient.name.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
                <div
                  key={ingredient.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, ingredient, 'cards')}
                  className="draggable-card"
                >
                  <IngredientCard ingredient={ingredient} />
                </div>
              )
            )}
          </div>
        </div>

        {/* RIGHT: WITHOUT (Exclude) List */}
        <WITHOUT_List
          ingredients={withoutList}
          onRemove={removeFromWithoutList}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />
      </div>
    </div>
  )
}

export default Home