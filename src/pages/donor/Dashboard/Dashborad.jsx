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

import '../Dashboard/Dashboard.css'

const alimentos = [
  {
    id: 1,
    nome: 'Tomates',
    quantidade: '4 unidades',
    validade: 'Vence hoje',
    imagem: '/icons/tomate.svg',
    status: 'atencao'
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

          <div className="topbar-caminho">
            <span>RedePratos</span>
            <span>/</span>
            <strong>Visão geral</strong>
          </div>

          <button className="notificacao" aria-label="Notificações">
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

          <a href="#alimentos" className="cadastrar-alimento">
            <Plus size={19} />
            Cadastrar alimento
          </a>

        </section>

        {/* INDICADORES */}
        <section className="donor-indicadores">

          <article className="indicador-card">

            <div className="indicador-topo">
              <span>Alimentos cadastrados</span>
              <Package size={21} />
            </div>

            <strong>08</strong>

            <small>Na sua despensa</small>

          </article>

          <article className="indicador-card alerta-card">

            <div className="indicador-topo">
              <span>Próximos da validade</span>
              <Clock3 size={21} />
            </div>

            <strong>02</strong>

            <small>Precisam da sua atenção</small>

          </article>

          <article className="indicador-card">

            <div className="indicador-topo">
              <span>Doações ativas</span>
              <HeartHandshake size={21} />
            </div>

            <strong>03</strong>

            <small>Alimentos disponibilizados</small>

          </article>

        </section>

        <div className="donor-conteudo">

          {/* DESPENSA */}
          <section className="donor-panel alimentos-panel" id="alimentos">

            <div className="panel-titulo">

              <div>
                <h2>Minha despensa</h2>
                <p>Seus alimentos cadastrados.</p>
              </div>

              <a href="#alimentos">
                Ver todos
                <ArrowUpRight size={16} />
              </a>

            </div>

            <div className="lista-alimentos">

              {alimentos.map((alimento) => (
                <div className="alimento-linha" key={alimento.id}>

                  <div className="alimento-imagem">
                    <img
                      src={alimento.imagem}
                      alt={alimento.nome}
                    />
                  </div>

                  <div className="alimento-info">
                    <strong>{alimento.nome}</strong>
                    <small>{alimento.quantidade}</small>
                  </div>

                  <div className={`alimento-validade ${alimento.status}`}>
                    {alimento.validade}
                  </div>

                </div>
              ))}

            </div>

            <a href="#alimentos" className="adicionar-link">
              <Plus size={17} />
              Adicionar alimento
            </a>

          </section>

          {/* COLUNA LATERAL */}
          <div className="donor-coluna">

            {/* ATENÇÃO */}
            <section className="donor-alerta">

              <div className="alerta-icone">
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
            <section className="donor-panel solicitacoes-panel" id="solicitacoes">

              <div className="panel-titulo">

                <div>
                  <h2>Solicitações recentes</h2>
                  <p>Pedidos das instituições.</p>
                </div>

                <a href="#solicitacoes">
                  <ArrowUpRight size={17} />
                </a>

              </div>

              <div className="solicitacao-item">

                <div className="instituicao-avatar">
                  <HeartHandshake size={20} />
                </div>

                <div className="solicitacao-info">
                  <strong>Instituição parceira</strong>
                  <small>Solicitou uma doação.</small>
                </div>

                <span className="status-pendente">
                  Pendente
                </span>

              </div>

              <a href="#solicitacoes" className="ver-solicitacoes">
                Ver solicitações
              </a>

            </section>

          </div>

        </div>

        {/* DOAÇÕES */}
        <section className="donor-panel doacoes-panel" id="doacoes">

          <div className="panel-titulo">

            <div>
              <h2>Minhas doações</h2>
              <p>Acompanhe os alimentos que você disponibilizou.</p>
            </div>

            <a href="#doacoes">
              Ver todas
              <ArrowUpRight size={16} />
            </a>

          </div>

          <div className="doacao-resumo">

            <div className="doacao-icone">
              <img src="/icons/arroz.svg" alt="Arroz" />
            </div>

            <div className="doacao-info">
              <strong>Arroz</strong>
              <small>2 kg disponibilizados</small>
            </div>

            <span className="status-disponivel">
              Disponível
            </span>

          </div>

        </section>

        {/* IMPACTO */}
        <section className="impacto-doador" id="impacto">

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

        <p className="dados-demo">
          Dados ilustrativos para demonstração do RedePratos.
        </p>

      </main>
    </div>
  )
}

export default Dashboard