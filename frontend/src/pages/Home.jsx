// ===== IMPORTS ==========================================================================================
import { useState, useMemo } from "react"
import IngredientCard from "../components/IngredientCard"
import WITH_List from '../components/WITH_List'
import WITHOUT_List from '../components/WITHOUT_List'
import "../css/Home.css"
import Search from "../../Components/Search/Search.jsx"
import RecipeById from "../../Components/Recipe/RecipeById.jsx";
import IngredientSearch from "../../Components/Ingredients/IngredientSearch.jsx";



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



    // ===== SEARCH RESULTS AND RECIPE DETAILS ==================================================================
    const [searchResults, setSearchResults] = useState("");   // store JSON string from Search.jsx
    const [selectedId, setSelectedId] = useState(null);

    // callback passed to <Search /> (teammate component)
    const handleDataFromSearch = (jsonString) => {
        setSearchResults(jsonString);
    };

    // parse the JSON string safely into a results array
    const results = useMemo(() => {
        try {
            const parsed = searchResults ? JSON.parse(searchResults) : null;
            return parsed?.results ?? [];
        } catch {
            return [];
        }
    }, [searchResults]);

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

        // >>TODO: Implement actual search logic with Spoonacular API  <<<<<<<<<<<<<<<<<<<<<<<<<<---------------
        alert(`Searching for: ${searchQuery}\nWith: ${withList.map(i => i.name).join(' ')}\nWithout: ${withoutList.map(i => i.name).join(', ')}`)

        const ingredientsFromList = withList.map(i => i.name).join(' ');
        console.log(ingredientsFromList)
        console.log(searchResults)
    }

    // ===== DRAG AND DROP HANDLERS =========================================================================================

    /**
     * Handles the start of a drag operation
     * {Event} e - The drag event
     * {Object} ingredient - The ingredient being dragged
     * {string} source - Where the ingredient is being dragged from
     */
    const handleDragStart = (e, ingredient, source) => {
        setDraggedIngredient({ ingredient, source })
        e.dataTransfer.effectAllowed = 'move'
    }

    /**
     * Handles drag over event (required to allow dropping)
     * {Event} e - The drag event
     */
    const handleDragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }

    /**
     * Handles dropping an ingredient into a list
     * {Event} e - The drop event
     * {string} targetList - Which list to drop into ('with' or 'without')
     */
    const handleDrop = (e, targetList) => {
        e.preventDefault()

        if (!draggedIngredient) return

        const { ingredient, source } = draggedIngredient

        // CHECK: Prevent adding if ingredient already exists in the opposite list
        if (targetList === 'with') {

            // Don't allow adding to WITH if already in WITHOUT
            if (withoutList.find(item => item.id === ingredient.id)) {
                alert(`"${ingredient.name}" is already in the WITHOUT list. Remove it first to add to WITH list.`)
                setDraggedIngredient(null)
                return
            }
        } else if (targetList === 'without') {

            // Don't allow adding to WITHOUT if already in WITH
            if (withList.find(item => item.id === ingredient.id)) {
                alert(`"${ingredient.name}" is already in the WITH list. Remove it first to add to WITHOUT list.`)
                setDraggedIngredient(null)
                return
            }
        }

        // Remove from source list if coming from a list
        if (source === 'with') {
          setWithList(prev => prev.filter(item => item.id !== ingredient.id))
        } else if (source === 'without') {
          setWithoutList(prev => prev.filter(item => item.id !== ingredient.id))
        }

        // Add to target list (prevent duplicates)
        if (targetList === 'with') {
          setWithList(prev => {
                        if (prev.some(item => item.id === ingredient.id)) return prev;
                        return [...prev, ingredient]});
        } else if (targetList === 'without') {
          setWithoutList(prev => {
                            if (prev.some(item => item.id === ingredient.id)) return prev;
                            return [...prev, ingredient]});
        }

        setDraggedIngredient(null)
    }

    // ===== RENDER =========================================================================================
    return (
        <div className="home">
            <h1>Recipe Lookup by Ingredients</h1>

            <div className="main-content">
                <WITH_List
                    ingredients={withList}
                    onRemove={removeFromWithList}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                />

                <div className="center-section">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Type for Ingredients"
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="search-button">Search for Recipe</button>
                    </form>

                    <div className="ingredients-grid">
                        <IngredientSearch
                            query={searchQuery}
                            number={24}
                            onCardDragStart={(e, ing) => {
                                const ingredient = { id: ing.id, name: ing.name, url: ing.image };
                                handleDragStart(e, ingredient, "cards");
                            }}
                            onCardLeftClick={(ing) => {
                                const ingredient = { id: ing.id, name: ing.name, url: ing.image };
                                if (
                                    withList.some(i => i.id === ingredient.id) ||
                                    withoutList.some(i => i.id === ingredient.id)
                                ) return;
                                setWithList(prev => [...prev, ingredient]);
                            }}
                            onCardRightClick={(ing) => {
                                const ingredient = { id: ing.id, name: ing.name, url: ing.image };
                                if (
                                    withoutList.some(i => i.id === ingredient.id) ||
                                    withList.some(i => i.id === ingredient.id)
                                ) return;
                                setWithoutList(prev => [...prev, ingredient]);
                            }}
                        />
                    </div>
                </div>

                <WITHOUT_List
                    ingredients={withoutList}
                    onRemove={removeFromWithoutList}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                />
            </div>

            <Search
                include={withList.map((i) => i.name).join(" ")}
                exclude={withoutList.map((i) => i.name).join(",")}
                handleDataFromSearch={handleDataFromSearch}
            />

            {results.length > 0 && (
                <section style={{ marginTop: 16 }}>
                    <h2>Results ({results.length})</h2>
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            display: "grid",
                            gap: 8,
                        }}
                    >
                        {results.map((r) => (
                            <li
                                key={r.id}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 8,
                                    border: "1px solid #333",
                                    borderRadius: 8,
                                    padding: 8,
                                    background: "#111827",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                    }}
                                >
                                    {r.image && (
                                        <img
                                            src={r.image}
                                            alt={r.title}
                                            width={56}
                                            height={56}
                                            style={{ objectFit: "cover", borderRadius: 6 }}
                                        />
                                    )}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600 }}>{r.title}</div>
                                        <div style={{ fontSize: 12, opacity: 0.7 }}>ID: {r.id}</div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setSelectedId(selectedId === r.id ? null : r.id)
                                        }
                                    >
                                        {selectedId === r.id ? "Hide" : "View"}
                                    </button>
                                </div>

                                {/* Inline recipe details go here */}
                                {selectedId === r.id && (
                                    <div style={{ marginTop: 12, marginLeft: 68 }}>
                                        <RecipeById id={r.id} />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}

export default Home