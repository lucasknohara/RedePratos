import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/public/Home.jsx'
import Dashboard from './pages/donor/Dashboard/Dashborad.jsx'
import Pantry from './pages/donor/Pantry/Pantry.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/inicio" element={<Dashboard />} />

        <Route path="/inicio/alimentos" element={<Pantry />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App