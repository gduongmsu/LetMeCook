import Home from '../features/ingredients/pages/Home.jsx';
import RecipePage from '../features/recipe/pages/RecipePage.jsx';
import NavigationBar from '../shared/components/NavigationBar.jsx';
import { Routes, Route } from 'react-router-dom';
import '../shared/styles/App.css';
import Search from '../features/search/components/Search.jsx';

function App() {
    return (
        <div>
            <NavigationBar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipes/:id" element={<RecipePage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;



