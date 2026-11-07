import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/public/Home/Home.jsx'
import Dashboard from './pages/donor/Dashboard/Dashborad.jsx'
import Pantry from './pages/donor/Pantry/Pantry.jsx'
import NewFood from './pages/donor/NewFood/NewFood.jsx'
import MyDonations from './pages/donor/MyDonations/MyDonations.jsx'
import Requests from './pages/donor/Request/Request.jsx'
import Login from './pages/public/Login/Login.jsx'
import Cadastro from './pages/public/Cadastro/Cadastro.jsx'
import Impact from './pages/donor/Impact/Impact.jsx'
import Profile from './pages/donor/Profile/Profile.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/doador" element={<Dashboard />} />

        <Route path="/doador/alimentos" element={<Pantry />} />

        <Route path="/doador/alimentos/novo" element={<NewFood />} />

        <Route path="/doador/minhas-doacoes" element={<MyDonations />} />

        <Route path="/doador/solicitacoes" element={<Requests />} />

        <Route path="/login" element={<Login />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/doador/meu-impacto" element={<Impact />} />

        <Route path="/doador/perfil" element={<Profile />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App