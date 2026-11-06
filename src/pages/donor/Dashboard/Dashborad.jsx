import {
  Package,
  HeartHandshake,
  Bell,
  Plus,
  ArrowUpRight, 
  Clock3,
  Leaf
} from 'lucide-react'

import DonorSidebar from '../../../components/layout/DonorSidebar/DonorSidebar.jsx'

import { Link } from 'react-router-dom'

import '../Dashboard/Dashboard.css'

const alimentos = [
  {
    id: 1,
    nome: 'Tomates',
    quantidade: '4 unidades',
    validade: 'Vence hoje',
    imagem: '/icons/tomate.svg',
    status: 'attention'
  },
  {
    id: 2,
    nome: 'Arroz',
    quantidade: '2 kg',
    validade: 'Validade: 20/11/2026',
    imagem: '/icons/arroz.svg',
    status: 'normal'
  },
  {
    id: 3,
    nome: 'Leite',
    quantidade: '1 caixa',
    validade: 'Validade: 08/11/2026',
    imagem: '/icons/leite.svg',
    status: 'normal'
  }
]

function Dashboard() {
  return (
    <div className="donor-layout">

      {/* MENU LATERAL */}
      <DonorSidebar />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="donor-main">

        <header className="donor-topbar">

          <div className="topbar-breadcrumb">
            <span>RedePratos</span>
            <span>/</span>
            <strong>Visão geral</strong>
          </div>

          <button className="notification-button" aria-label="Notificações">
            <Bell size={20} />
            <span></span>
          </button>

        </header>

        {/* BOAS-VINDAS */}
        <section className="donor-welcome">

          <div>
            <span className="welcome-label">
              SEU ESPAÇO NO REDEPRATOS
            </span>

            <h1>Olá, bem-vindo!</h1>

            <p>
              Veja como estão seus alimentos e acompanhe suas doações.
            </p>
          </div>

        </section>

        {/* INDICADORES */}
        <section className="donor-stats">

          <article className="stat-card">

            <div className="stat-card-header">
              <span>Alimentos cadastrados</span>
              <Package size={21} />
            </div>

            <strong>08</strong>

            <small>Na sua despensa</small>

          </article>

          <article className="stat-card warning-card">

            <div className="stat-card-header">
              <span>Próximos da validade</span>
              <Clock3 size={21} />
            </div>

            <strong>02</strong>

            <small>Precisam da sua atenção</small>

          </article>

          <article className="stat-card">

            <div className="stat-card-header">
              <span>Doações ativas</span>
              <HeartHandshake size={21} />
            </div>

            <strong>03</strong>

            <small>Alimentos disponibilizados</small>

          </article>

        </section>

        <div className="donor-content">

          {/* DESPENSA */}
          <section className="donor-panel foods-panel" id="alimentos">

            <div className="panel-header">

              <div>
                <h2>Minha despensa</h2>
                <p>Seus alimentos cadastrados.</p>
              </div>

              <Link to="/inicio/alimentos">
                Ver todos
                <ArrowUpRight size={16} />
              </Link>

            </div>

            <div className="food-list">

              {alimentos.map((alimento) => (
                <div className="food-row" key={alimento.id}>

                  <div className="food-image">
                    <img
                      src={alimento.imagem}
                      alt={alimento.nome}
                    />
                  </div>

                  <div className="food-info">
                    <strong>{alimento.nome}</strong>
                    <small>{alimento.quantidade}</small>
                  </div>

                  <div className={`food-expiration ${alimento.status}`}>
                    {alimento.validade}
                  </div>

                </div>
              ))}

            </div>

            <Link
              to="/inicio/alimentos/novo"
              className="add-food-link"
            >
              <Plus size={17} />
              Adicionar alimento
            </Link>

          </section>

          {/* COLUNA LATERAL */}
          <div className="donor-side-column">

            {/* ATENÇÃO */}
            <section className="donor-warning">

              <div className="warning-icon">
                <Clock3 size={21} />
              </div>

              <div>
                <strong>Fique de olho na validade!</strong>

                <p>
                  Alguns alimentos estão próximos do vencimento.
                  Aproveite antes que estraguem.
                </p>
              </div>

            </section>

            {/* SOLICITAÇÕES */}
            <section className="donor-panel requests-panel" id="solicitacoes">

              <div className="panel-header">

                <div>
                  <h2>Solicitações recentes</h2>
                  <p>Pedidos das instituições.</p>
                </div>

                <a href="#solicitacoes">
                  <ArrowUpRight size={17} />
                </a>

              </div>

              <div className="request-item">

                <div className="institution-avatar">
                  <HeartHandshake size={20} />
                </div>

                <div className="request-info">
                  <strong>Instituição parceira</strong>
                  <small>Solicitou uma doação.</small>
                </div>

                <span className="status-pending">
                  Pendente
                </span>

              </div>

              <a href="#solicitacoes" className="view-requests-link">
                Ver solicitações
              </a>

            </section>

          </div>

        </div>

        {/* DOAÇÕES */}
        <section className="donor-panel donations-panel" id="doacoes">

          <div className="panel-header">

            <div>
              <h2>Minhas doações</h2>
              <p>Acompanhe os alimentos que você disponibilizou.</p>
            </div>

            <a href="#doacoes">
              Ver todas
              <ArrowUpRight size={16} />
            </a>

          </div>

          <div className="donation-summary">

            <div className="donation-icon">
              <img src="/icons/arroz.svg" alt="Arroz" />
            </div>

            <div className="donation-info">
              <strong>Arroz</strong>
              <small>2 kg disponibilizados</small>
            </div>

            <span className="status-available">
              Disponível
            </span>

          </div>

        </section>

        {/* IMPACTO */}
        <section className="donor-impact" id="impacto">

          <div>
            <Leaf size={25} />

            <div>
              <h2>Seu impacto começa com pequenas ações.</h2>
              <p>
                Continue aproveitando seus alimentos e contribuindo
                para reduzir o desperdício.
              </p>
            </div>
          </div>

          <ArrowUpRight size={21} />

        </section>

        <p className="demo-data-note">
          Dados ilustrativos para demonstração do RedePratos.
        </p>

      </main>
    </div>
  )
}

export default Dashboard
