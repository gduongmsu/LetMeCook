import { useState } from 'react'
import './css/App.css'
import WITH_List from './components/WITH_List'
import WITHOUT_List from './components/WITHOUT_List'
import IngredientCard from './components/IngredientCard'

function App() {
  // Dummy ingredient data for testing
  const allIngredients = [
    { id: 1, name: 'Tomato', url: 'https://spoonacular.com/cdn/ingredients_100x100/tomato.jpg' },
    { id: 2, name: 'Chicken', url: 'https://spoonacular.com/cdn/ingredients_100x100/chicken-breasts.jpg' },
    { id: 3, name: 'Rice', url: 'https://spoonacular.com/cdn/ingredients_100x100/rice-white-long-grain-or-basil.jpg' },
    { id: 4, name: 'Onion', url: 'https://spoonacular.com/cdn/ingredients_100x100/brown-onion.jpg' },
    { id: 5, name: 'Garlic', url: 'https://spoonacular.com/cdn/ingredients_100x100/garlic.jpg' },
    { id: 6, name: 'Cheese', url: 'https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.jpg' },
    { id: 7, name: 'Pasta', url: 'https://spoonacular.com/cdn/ingredients_100x100/fusilli.jpg' },
    { id: 8, name: 'Beef', url: 'https://spoonacular.com/cdn/ingredients_100x100/beef-cubes-raw.jpg' },
  ]

  const [searchTerm, setSearchTerm] = useState('')
  const [withList, setWithList] = useState([])
  const [withoutList, setWithoutList] = useState([])
  const [draggedIngredient, setDraggedIngredient] = useState(null)

  // Filter ingredients based on search term
  const filteredIngredients = allIngredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // handles drag start
  const handleDragStart = (e, ingredient, source) => {
    setDraggedIngredient({ ingredient, source })
    e.dataTransfer.effectAllowed = 'move'
  }

  // handles drag over
  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  // handles drop into lists
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

  // removes ingredient from WITH list
  const removeFromWithList = (indexToRemove) => {
    setWithList(withList.filter((_, index) => index !== indexToRemove))
  }

  // removes ingredient from WITHOUT list
  const removeFromWithoutList = (indexToRemove) => {
    setWithoutList(withoutList.filter((_, index) => index !== indexToRemove))
  }

  // handles search with both lists
  const handleSearch = () => {
    console.log('Searching with:', withList.map(ing => ing.name))
    console.log('Excluding:', withoutList.map(ing => ing.name))
    // TODO: Implement actual search logic with Spoonacular API
  }

  return (
    <>
      <div className="recipe-app">
        <h1>Recipe Lookup by Ingredient</h1>

        <div className="main-content">
          {/* WITH List */}
          <WITH_List
            ingredients={withList}
            onRemove={removeFromWithList}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          />

          {/* Center Section */}
          <div className="center-section">
            {/* Search bar for filtering ingredients */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Display ingredient cards */}
            <div className="ingredients-display">
              {filteredIngredients.length > 0 ? (
                filteredIngredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, ingredient, 'cards')}
                  >
                    <IngredientCard ingredient={ingredient} />
                  </div>
                ))
              ) : (
                <p className="no-results">No ingredients found</p>
              )}
            </div>

            {/* Search Button */}
            <button className="search-button" onClick={handleSearch}>
              Search Recipes
            </button>
          </div>

          {/* WITHOUT List */}
          <WITHOUT_List
            ingredients={withoutList}
            onRemove={removeFromWithoutList}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          />
        </div>
      </div>
    </>
  )
}

export default App