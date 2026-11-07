import { useState } from 'react'

import {
  Bell,
  Package,
  HeartHandshake,
  Clock3,
  CheckCircle,
  CalendarDays,
  MapPin
} from 'lucide-react'

import { Link } from 'react-router-dom'

import DonorSidebar from '../../../components/layout/DonorSidebar/DonorSidebar.jsx'

import '../Dashboard/Dashborad.jsx'
import './MyDonations.css'

// Dados de exemplo para a tela
const doacoes = [
  {
    id: 1,
    nome: 'Arroz',
    imagem: '/icons/arroz.svg',
    quantidade: '5 kg',
    validade: '20/11/2026',
    data: '05/11/2026',
    regiao: 'Vila Mariana',
    instituicao: 'Nenhuma instituição ainda',
    status: 'disponivel'
  },
  {
    id: 2,
    nome: 'Tomate',
    imagem: '/icons/tomate.svg',
    quantidade: '4 unidades',
    validade: '08/11/2026',
    data: '04/11/2026',
    regiao: 'Saúde',
    instituicao: 'Instituição Esperança',
    status: 'pendente'
  },
  {
    id: 3,
    nome: 'Leite',
    imagem: '/icons/leite.svg',
    quantidade: '6 caixas',
    validade: '15/11/2026',
    data: '03/11/2026',
    regiao: 'Ipiranga',
    instituicao: 'Casa Solidária',
    status: 'reservada'
  },
  {
    id: 4,
    nome: 'Banana',
    imagem: '/icons/banana.svg',
    quantidade: '3 kg',
    validade: '04/11/2026',
    data: '01/11/2026',
    regiao: 'Moema',
    instituicao: 'ONG Mãos Abertas',
    status: 'concluida'
  }
]

const filtros = [
  { valor: 'todas', nome: 'Todas' },
  { valor: 'disponivel', nome: 'Disponíveis' },
  { valor: 'pendente', nome: 'Aguardando resposta' },
  { valor: 'reservada', nome: 'Reservadas' },
  { valor: 'concluida', nome: 'Concluídas' }
]

function MyDonations() {
  const [filtro, setFiltro] = useState('todas')

  const doacoesFiltradas = doacoes.filter((doacao) => {
    return filtro === 'todas' || doacao.status === filtro
  })

  function obterStatus(status) {
    const nomes = {
      disponivel: 'Disponível',
      pendente: 'Solicitação recebida',
      reservada: 'Reservada',
      concluida: 'Concluída'
    }

    return nomes[status]
  }

  return (
    <div className="donor-layout">

      <DonorSidebar />

      <main className="donor-main">

        {/* CABEÇALHO */}
        <header className="donor-topbar">

          <div className="topbar-breadcrumb">
            <span>RedePratos</span>
            <span>/</span>
            <strong>Minhas doações</strong>
          </div>

          <button className="notification-button" aria-label="Notificações">
            <Bell size={20} />
            <span></span>
          </button>

        </header>

        <div className="donations-page">

          {/* TÍTULO */}
          <section className="donations-header">

            <div>
              <span>COMPARTILHE E TRANSFORME</span>

              <h1>Minhas doações</h1>

              <p>
                Acompanhe os alimentos que você disponibilizou
                para ajudar outras pessoas.
              </p>
            </div>

            <Link to="/inicio/alimentos" className="donations-button">
              <Package size={18} />
              Ver minha despensa
            </Link>

          </section>

          {/* RESUMO */}
          <section className="donations-summary">

            <article className="donation-summary-card">
              <div className="donation-summary-icon">
                <HeartHandshake size={21} />
              </div>

              <div>
                <span>Total de doações</span>
                <strong>{doacoes.length}</strong>
                <small>Ofertas cadastradas</small>
              </div>
            </article>

            <article className="donation-summary-card">
              <div className="donation-summary-icon">
                <Package size={21} />
              </div>

              <div>
                <span>Disponíveis</span>
                <strong>
                  {doacoes.filter(d => d.status === 'disponivel').length}
                </strong>
                <small>Aguardando instituições</small>
              </div>
            </article>

            <article className="donation-summary-card">
              <div className="donation-summary-icon summary-pending">
                <Clock3 size={21} />
              </div>

              <div>
                <span>Solicitações pendentes</span>
                <strong>
                  {doacoes.filter(d => d.status === 'pendente').length}
                </strong>
                <small>Precisam da sua resposta</small>
              </div>
            </article>

            <article className="donation-summary-card">
              <div className="donation-summary-icon">
                <CheckCircle size={21} />
              </div>

              <div>
                <span>Concluídas</span>
                <strong>
                  {doacoes.filter(d => d.status === 'concluida').length}
                </strong>
                <small>Entregas finalizadas</small>
              </div>
            </article>

          </section>

          {/* LISTA DE DOAÇÕES */}
          <section className="donations-panel">

            <div className="donations-panel-header">

              <div>
                <h2>Alimentos disponibilizados</h2>
                <p>
                  Acompanhe o andamento das suas ofertas.
                </p>
              </div>

              <span className="donations-count">
                {doacoesFiltradas.length} registros
              </span>

            </div>

            {/* FILTROS */}
            <div className="donations-filters">

              {filtros.map((item) => (

                <button
                  key={item.valor}
                  type="button"
                  className={filtro === item.valor ? 'filtro-ativo' : ''}
                  onClick={() => setFiltro(item.valor)}
                >
                  {item.nome}
                </button>

              ))}

            </div>

            {/* CABEÇALHO DA LISTA */}
            <div className="donations-table-header">
              <span>ALIMENTO</span>
              <span>VALIDADE</span>
              <span>INSTITUIÇÃO</span>
              <span>STATUS</span>
            </div>

            {/* REGISTROS */}
            <div className="donations-list">

              {doacoesFiltradas.map((doacao) => (

                <article className="donation-row" key={doacao.id}>

                  <div className="donation-food">

                    <div className="donation-food-image">
                      <img src={doacao.imagem} alt={doacao.nome} />
                    </div>

                    <div>
                      <strong>{doacao.nome}</strong>
                      <small>{doacao.quantidade}</small>
                      <small>Disponibilizada em {doacao.data}</small>
                    </div>

                  </div>

                  <div className="donation-expiration">
                    <CalendarDays size={16} />
                    {doacao.validade}
                  </div>

                  <div className="donation-institution">
                    <HeartHandshake size={17} />
                    <div>
                      <strong>{doacao.instituicao}</strong>
                      <small>
                        <MapPin size={12} />
                        {doacao.regiao}
                      </small>
                    </div>
                  </div>

                  <div>
                    <span className={`donation-status status-${doacao.status}`}>
                      {obterStatus(doacao.status)}
                    </span>
                  </div>

                </article>

              ))}

              {doacoesFiltradas.length === 0 && (

                <div className="donations-empty">
                  <Package size={32} />
                  <strong>Nenhuma doação encontrada</strong>
                  <p>Não há registros com esse status.</p>
                </div>

              )}

            </div>
          </section>

          {/* AVISO */}
          <section className="donations-tip">

            <HeartHandshake size={24} />

            <div>
              <strong>Cada doação faz a diferença!</strong>
              <p>
                Quando uma instituição solicitar um alimento,
                você poderá analisar o pedido antes de confirmar a reserva.
              </p>
            </div>

          </section>

        </div>

      </main>

    </div>
  )
}

export default MyDonations