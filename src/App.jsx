import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import StudyPlan from './pages/StudyPlan.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/study-plan" element={<StudyPlan />} />
    </Routes>
  )
}

export default App
