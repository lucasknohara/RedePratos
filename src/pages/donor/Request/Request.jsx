import { useState } from 'react'

import {
  Bell,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  MapPin,
  Package,
  X,
  XCircle
} from 'lucide-react'

import DonorSidebar from '../../../components/layout/DonorSidebar/DonorSidebar.jsx'

import '../Dashboard/Dashborad.jsx'
import './Request.css'

const solicitacoesIniciais = [
  {
    id: 1,
    instituicao: 'Instituição Esperança',
    alimento: 'Arroz',
    imagem: '/icons/arroz.svg',
    quantidade: '5 kg',
    data: '06/11/2026',
    regiao: 'Vila Mariana',
    status: 'pendente'
  },
  {
    id: 2,
    instituicao: 'Associação Mãos que Ajudam',
    alimento: 'Tomate',
    imagem: '/icons/tomate.svg',
    quantidade: '4 unidades',
    data: '05/11/2026',
    regiao: 'Saúde',
    status: 'pendente'
  },
  {
    id: 3,
    instituicao: 'Centro Comunitário Vida',
    alimento: 'Leite',
    imagem: '/icons/leite.svg',
    quantidade: '6 caixas',
    data: '04/11/2026',
    regiao: 'Ipiranga',
    status: 'reservada'
  }
]

const filtros = [
  { valor: 'todas', nome: 'Todas' },
  { valor: 'pendente', nome: 'Pendentes' },
  { valor: 'reservada', nome: 'Reservadas' },
  { valor: 'recusada', nome: 'Recusadas' }
]

function Requests() {
  const [solicitacoes, setSolicitacoes] = useState(solicitacoesIniciais)
  const [filtro, setFiltro] = useState('todas')

  function atualizarStatus(id, novoStatus) {
    setSolicitacoes((listaAtual) =>
      listaAtual.map((solicitacao) => {
        if (solicitacao.id === id) {
          return {
            ...solicitacao,
            status: novoStatus
          }
        }

        return solicitacao
      })
    )
  }

  const solicitacoesFiltradas = solicitacoes.filter((solicitacao) => {
    return filtro === 'todas' || solicitacao.status === filtro
  })

  const pendentes = solicitacoes.filter(
    (solicitacao) => solicitacao.status === 'pendente'
  ).length

  const reservadas = solicitacoes.filter(
    (solicitacao) => solicitacao.status === 'reservada'
  ).length

  const recusadas = solicitacoes.filter(
    (solicitacao) => solicitacao.status === 'recusada'
  ).length

  function obterStatus(status) {
    const nomes = {
      pendente: 'Aguardando resposta',
      reservada: 'Reserva confirmada',
      recusada: 'Recusada'
    }

    return nomes[status]
  }

  return (
    <div className="donor-layout">

      <DonorSidebar />

      <main className="donor-main">

        {/* CABEÇALHO */}
        <header className="donor-topbar">

          <div className="topbar-caminho">
            <span>RedePratos</span>
            <span>/</span>
            <strong>Solicitações recebidas</strong>
          </div>

          <button className="notificacao" aria-label="Notificações">
            <Bell size={20} />
            <span></span>
          </button>

        </header>

        <div className="requests-page">

          {/* TÍTULO */}
          <section className="requests-header">

            <div>
              <span>SUA PARTICIPAÇÃO FAZ A DIFERENÇA</span>

              <h1>Solicitações recebidas</h1>

              <p>
                Acompanhe os pedidos das instituições interessadas
                nos seus alimentos.
              </p>
            </div>

          </section>

          {/* RESUMO */}
          <section className="requests-summary">

            <article className="request-summary-card">

              <div className="request-summary-icon">
                <HeartHandshake size={21} />
              </div>

              <div>
                <span>Total de solicitações</span>
                <strong>{solicitacoes.length}</strong>
                <small>Pedidos recebidos</small>
              </div>

            </article>

            <article className="request-summary-card">

              <div className="request-summary-icon pending-icon">
                <Clock3 size={21} />
              </div>

              <div>
                <span>Pendentes</span>
                <strong>{pendentes}</strong>
                <small>Aguardando sua resposta</small>
              </div>

            </article>

            <article className="request-summary-card">

              <div className="request-summary-icon reserved-icon">
                <CheckCircle2 size={21} />
              </div>

              <div>
                <span>Reservadas</span>
                <strong>{reservadas}</strong>
                <small>Com reserva confirmada</small>
              </div>

            </article>

          </section>

          {/* LISTA */}
          <section className="requests-panel">

            <div className="requests-panel-header">

              <div>
                <h2>Pedidos das instituições</h2>
                <p>
                  Analise as solicitações antes de confirmar uma reserva.
                </p>
              </div>

              <span className="requests-count">
                {solicitacoesFiltradas.length} registros
              </span>

            </div>

            {/* FILTROS */}
            <div className="requests-filters">

              {filtros.map((item) => (

                <button
                  key={item.valor}
                  type="button"
                  className={filtro === item.valor ? 'request-filter-active' : ''}
                  onClick={() => setFiltro(item.valor)}
                >
                  {item.nome}
                </button>

              ))}

            </div>

            {/* SOLICITAÇÕES */}
            <div className="requests-list">

              {solicitacoesFiltradas.map((solicitacao) => (

                <article className="request-card" key={solicitacao.id}>

                  <div className="request-card-top">

                    <div className="request-institution">

                      <div className="request-institution-icon">
                        <Building2 size={21} />
                      </div>

                      <div>
                        <strong>{solicitacao.instituicao}</strong>
                        <small>
                          Solicitação enviada em {solicitacao.data}
                        </small>
                      </div>

                    </div>

                    <span className={`request-status status-${solicitacao.status}`}>
                      {obterStatus(solicitacao.status)}
                    </span>

                  </div>

                  <div className="request-card-details">

                    <div className="request-food">

                      <div className="request-food-image">
                        <img
                          src={solicitacao.imagem}
                          alt={solicitacao.alimento}
                        />
                      </div>

                      <div>
                        <small>ALIMENTO SOLICITADO</small>
                        <strong>{solicitacao.alimento}</strong>
                        <span>{solicitacao.quantidade}</span>
                      </div>

                    </div>

                    <div className="request-location">

                      <div>
                        <CalendarDays size={16} />
                        <span>{solicitacao.data}</span>
                      </div>

                      <div>
                        <MapPin size={16} />
                        <span>{solicitacao.regiao}</span>
                      </div>

                    </div>

                  </div>

                  <div className="request-card-bottom">

                    {solicitacao.status === 'pendente' ? (

                      <>
                        <p>
                          Esta instituição está interessada no seu alimento.
                        </p>

                        <div className="request-actions">

                          <button
                            type="button"
                            className="request-reject"
                            onClick={() =>
                              atualizarStatus(solicitacao.id, 'recusada')
                            }
                          >
                            <X size={16} />
                            Recusar
                          </button>

                          <button
                            type="button"
                            className="request-accept"
                            onClick={() =>
                              atualizarStatus(solicitacao.id, 'reservada')
                            }
                          >
                            <Check size={16} />
                            Aceitar solicitação
                          </button>

                        </div>
                      </>

                    ) : solicitacao.status === 'reservada' ? (

                      <div className="request-message reserved-message">
                        <CheckCircle2 size={17} />
                        Reserva confirmada. Aguardando a organização da entrega.
                      </div>

                    ) : (

                      <div className="request-message rejected-message">
                        <XCircle size={17} />
                        Esta solicitação foi recusada.
                      </div>

                    )}

                  </div>

                </article>

              ))}

              {solicitacoesFiltradas.length === 0 && (

                <div className="requests-empty">
                  <Package size={34} />

                  <strong>Nenhuma solicitação encontrada</strong>

                  <p>
                    Não há pedidos com esse status no momento.
                  </p>
                </div>

              )}

            </div>

            <div className="requests-footer">
              Dados ilustrativos para demonstração do RedePratos.
            </div>

          </section>

          {/* INFORMAÇÃO */}
          <section className="requests-tip">

            <HeartHandshake size={24} />

            <div>
              <strong>Você decide antes de confirmar uma doação.</strong>

              <p>
                Ao aceitar uma solicitação, o alimento ficará reservado.
                A doação só será considerada concluída após a confirmação
                da entrega.
              </p>
            </div>

          </section>

          <p className="requests-demo">
            As alterações desta demonstração não são salvas após atualizar a página.
          </p>

        </div>

      </main>

    </div>
  )
}

export default Requests