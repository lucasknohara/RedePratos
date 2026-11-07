import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
import InstitutionDashboard from './pages/institution/Dashboard/Dashboard.jsx'
import Donations from './pages/institution/Donations/Donations.jsx'
import RequestsInstitution from './pages/institution/Request/Request.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* CAMINHO BASE */}
        <Route path="/" element={<Home />} />        
        
        <Route path="/login" element={<Login />} />

        <Route path="/cadastro" element={<Cadastro />} />

        {/* CAMINHO DOADOR */}
        <Route path="/doador" element={<Dashboard />} />

        <Route path="/doador/alimentos" element={<Pantry />} />

        <Route path="/doador/alimentos/novo" element={<NewFood />} />

        <Route path="/doador/minhas-doacoes" element={<MyDonations />} />

        <Route path="/doador/solicitacoes" element={<Requests />} />

        <Route path="/doador/meu-impacto" element={<Impact />} />

        <Route path="/doador/perfil" element={<Profile />} />

        {/* CAMINHO INSTITUIÇÃO */}
        <Route path="/instituicao" element={<InstitutionDashboard />} />

        <Route path="/instituicao/doacoes" element={<Donations />} />

        <Route path="/instituicao/solicitacoes" element={<RequestsInstitution />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App