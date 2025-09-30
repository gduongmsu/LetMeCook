import Home from './pages/Home.jsx'
import NavigationBar from './components/NavigationBar'
import { Routes, Route } from 'react-router-dom'
import './css/App.css'

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
