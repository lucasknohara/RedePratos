import { useState } from 'react'

import {
  Bell,
  Plus,
  Search,
  SlidersHorizontal,
  Clock3,
  Pencil,
  Trash2,
  Package
} from 'lucide-react'

import DonorSidebar from '../../../components/layout/DonorSidebar/DonorSidebar.jsx'

import '../Dashboard/Dashborad.jsx'
import '../Pantry/Pantry.css'

const alimentos = [
  {
    id: 1,
    nome: 'Tomate',
    categoria: 'Hortifruti',
    quantidade: '4 unidades',
    validade: '05/11/2026',
    validadeTexto: 'Vence hoje',
    status: 'Na despensa',
    imagem: '/icons/tomate.svg',
    atencao: true
  },
  {
    id: 2,
    nome: 'Arroz',
    categoria: 'Grãos',
    quantidade: '2 kg',
    validade: '20/11/2026',
    validadeTexto: 'Em 15 dias',
    status: 'Na despensa',
    imagem: '/icons/arroz.svg',
    atencao: false
  },
  {
    id: 3,
    nome: 'Leite',
    categoria: 'Laticínios',
    quantidade: '1 caixa',
    validade: '08/11/2026',
    validadeTexto: 'Em 3 dias',
    status: 'Disponível para doação',
    imagem: '/icons/leite.svg',
    atencao: false
  }
]

function Pantry() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [status, setStatus] = useState('Todos')

  const alimentosFiltrados = alimentos.filter((alimento) => {
    const nomeCorresponde = alimento.nome
      .toLowerCase()
      .includes(busca.toLowerCase())

    const categoriaCorresponde =
      categoria === 'Todas' || alimento.categoria === categoria

    const statusCorresponde =
      status === 'Todos' || alimento.status === status

    return nomeCorresponde && categoriaCorresponde && statusCorresponde
  })

  return (
    <div className="donor-layout">

      <DonorSidebar />

      <main className="donor-main">

        {/* CABEÇALHO */}
        <header className="donor-topbar">

          <div className="topbar-caminho">
            <span>RedePratos</span>
            <span>/</span>
            <strong>Minha despensa</strong>
          </div>

          <button className="notificacao" aria-label="Notificações">
            <Bell size={20} />
            <span></span>
          </button>

        </header>

        <div className="pantry-page">

          {/* TÍTULO */}
          <section className="pantry-header">

            <div>
              <span className="pantry-label">
                ORGANIZE SEUS ALIMENTOS
              </span>

              <h1>Minha despensa</h1>

              <p>
                Acompanhe seus alimentos e evite desperdícios.
              </p>
            </div>

            <button
              type="button"
              className="pantry-add-button"
              disabled
              title="Cadastro será implementado na próxima etapa"
            >
              <Plus size={19} />
              Adicionar alimento
            </button>

          </section>

          {/* RESUMO */}
          <section className="pantry-summary">

            <article className="pantry-summary-card">

              <div className="summary-icon">
                <Package size={21} />
              </div>

              <div>
                <span>Total de alimentos</span>
                <strong>03</strong>
                <small>Cadastrados na despensa</small>
              </div>

            </article>

            <article className="pantry-summary-card">

              <div className="summary-icon summary-alert">
                <Clock3 size={21} />
              </div>

              <div>
                <span>Precisam de atenção</span>
                <strong>01</strong>
                <small>Próximos da validade</small>
              </div>

            </article>

            <article className="pantry-summary-card">

              <div className="summary-icon">
                <SlidersHorizontal size={21} />
              </div>

              <div>
                <span>Disponíveis para doação</span>
                <strong>01</strong>
                <small>Alimentos compartilhados</small>
              </div>

            </article>

          </section>

          {/* LISTAGEM */}
          <section className="pantry-list-panel">

            <div className="pantry-list-title">

              <div>
                <h2>Alimentos cadastrados</h2>
                <p>
                  Consulte e acompanhe os alimentos da sua despensa.
                </p>
              </div>

              <span className="pantry-total">
                {alimentosFiltrados.length} alimentos
              </span>

            </div>

            {/* BUSCA E FILTROS */}
            <div className="pantry-filters">

              <div className="pantry-search">
                <Search size={19} />

                <input
                  type="text"
                  placeholder="Buscar alimento..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>

              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="Todas">Todas as categorias</option>
                <option value="Hortifruti">Hortifruti</option>
                <option value="Grãos">Grãos</option>
                <option value="Laticínios">Laticínios</option>
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Todos">Todos os status</option>
                <option value="Na despensa">Na despensa</option>
                <option value="Disponível para doação">
                  Disponível para doação
                </option>
              </select>

            </div>

            {/* CABEÇALHO DA LISTA */}
            <div className="pantry-table-head">
              <span>ALIMENTO</span>
              <span>QUANTIDADE</span>
              <span>VALIDADE</span>
              <span>STATUS</span>
              <span>AÇÕES</span>
            </div>

            {/* ALIMENTOS */}
            <div className="pantry-food-list">

              {alimentosFiltrados.map((alimento) => (

                <div className="pantry-food-row" key={alimento.id}>

                  <div className="pantry-food-name">

                    <div className="pantry-food-image">
                      <img
                        src={alimento.imagem}
                        alt={alimento.nome}
                      />
                    </div>

                    <div>
                      <strong>{alimento.nome}</strong>
                      <small>{alimento.categoria}</small>
                    </div>

                  </div>

                  <span className="pantry-quantity">
                    {alimento.quantidade}
                  </span>

                  <div className={`pantry-expiration ${alimento.atencao ? 'expiration-alert' : ''}`}>
                    <Clock3 size={15} />
                    <div>
                      <strong>{alimento.validadeTexto}</strong>
                      <small>{alimento.validade}</small>
                    </div>
                  </div>

                  <span className={`pantry-status ${alimento.status === 'Na despensa' ? 'status-storage' : 'status-donation'}`}>
                    {alimento.status}
                  </span>

                  <div className="pantry-actions">

                    <button
                      type="button"
                      disabled
                      title="Edição será implementada na etapa de CRUD"
                      aria-label={`Editar ${alimento.nome}`}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      disabled
                      title="Exclusão será implementada na etapa de CRUD"
                      aria-label={`Excluir ${alimento.nome}`}
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>

              ))}

              {alimentosFiltrados.length === 0 && (

                <div className="pantry-empty">
                  <Package size={32} />

                  <strong>Nenhum alimento encontrado</strong>

                  <p>
                    Tente alterar sua pesquisa ou os filtros.
                  </p>
                </div>

              )}

            </div>

            <div className="pantry-footer">
              Os alimentos exibidos são dados ilustrativos.
            </div>

          </section>

        </div>

      </main>

    </div>
  )
}

export default Pantry