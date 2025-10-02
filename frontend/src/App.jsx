import Home from './pages/Home.jsx'
import { Routes, Route } from 'react-router-dom'
import './css/App.css'

function App() {
  return (
    <div>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}

export default App