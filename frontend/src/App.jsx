import Home from './pages/Home.jsx'
import NavigationBar from './components/NavigationBar.jsx'
import { Routes, Route } from 'react-router-dom'
import './css/App.css'
import RecipeCard from '../Components/RecipeCard/RecipeCard'
import Search from '../Components/Search/Search.jsx'

function App() {
  return (
    <div>
      <NavigationBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}

export default App