import { Link } from 'react-router-dom'
import { Bell, ArrowLeft } from 'lucide-react'

import DonorSidebar from '../../../components/layout/DonorSidebar/DonorSidebar.jsx'
import FoodForm from '../../../components/foods/FoodForm'

import '../Dashboard/Dashborad.jsx'
import './NewFood.css'

function NewFood() {
  return (
    <div className="donor-layout">

      <DonorSidebar />

      <main className="donor-main">

        <header className="donor-topbar">

          <div className="topbar-caminho">
            <span>RedePratos</span>
            <span>/</span>
            <Link to="/inicio/alimentos">Minha despensa</Link>
            <span>/</span>
            <strong>Cadastrar alimento</strong>
          </div>

          <button className="notificacao" aria-label="Notificações">
            <Bell size={20} />
          </button>

        </header>

        <div className="new-food-page">

          <Link to="/inicio/alimentos" className="new-food-back">
            <ArrowLeft size={17} />
            Voltar para minha despensa
          </Link>

          <section className="new-food-header">

            <div>
              <span>ORGANIZE SUA DESPENSA</span>
              <h1>Cadastrar alimento</h1>
              <p>
                Adicione um alimento para acompanhar sua quantidade
                e validade.
              </p>
            </div>

          </section>

          <FoodForm />

        </div>

      </main>

    </div>
  )
}

export default NewFood