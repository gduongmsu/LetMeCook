// frontend/src/app/App.jsx
import Home from '../features/ingredients/pages/Home.jsx';
import NavigationBar from '../shared/components/NavigationBar.jsx';
import { Routes, Route } from 'react-router-dom';
import '../shared/styles/App.css';

export default function App() {
    return (
        <div>
            <NavigationBar />
            <main className="main-content">
                <Routes>
                    <Route path="/search-by-recipe-name" element={<RecipeByName />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/search-by-nutrients" element={<RecipeByNutrition />} />
                </Routes>
            </main>
        </div>
    );
}

// keep imports for these:
import RecipeByNutrition from '../features/nutrition/components/RecipeByNutrients.jsx';
import RecipeByName from '../features/recipe/pages/RecipeByName.jsx';
