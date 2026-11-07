
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

import { Link } from 'react-router-dom'

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
    <div className="tw:flex tw:min-h-screen tw:bg-[#f7f6ef] tw:max-[760px]:flex-col">

      {/* MENU LATERAL */}
      <DonorSidebar />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="tw:min-w-0 tw:flex-1 tw:px-[45px] tw:pb-[35px] tw:max-[1100px]:px-[25px] tw:max-[1100px]:pb-[30px] tw:max-[760px]:px-[18px] tw:max-[760px]:pb-[25px]">

        {/* CABEÇALHO */}
        <header className="tw:flex tw:h-[75px] tw:items-center tw:justify-between tw:border-b tw:border-[#e8eae2]">

          <div className="tw:flex tw:items-center tw:gap-[10px] tw:text-[12px] tw:text-[#87938a] tw:max-[450px]:text-[10px]">
            <span>RedePratos</span>
            <span>/</span>
            <strong className="tw:text-[#315c43]">
              Minha despensa
            </strong>
          </div>

          <button
            className="tw:relative tw:grid tw:size-10 tw:cursor-pointer tw:place-items-center tw:rounded-full tw:border tw:border-[#e8eae2] tw:bg-white tw:text-[#315c43]"
            aria-label="Notificações"
          >
            <Bell size={20} />
            <span className="tw:absolute tw:top-2 tw:right-[9px] tw:size-[7px] tw:rounded-full tw:bg-[#d78b42]"></span>
          </button>

        </header>

        <div className="tw:pt-[35px] tw:pb-[35px]">

          {/* TÍTULO */}
          <section className="tw:mb-[30px] tw:flex tw:items-center tw:justify-between tw:gap-5 tw:max-[760px]:items-start tw:max-[760px]:flex-col">

            <div>
              <span className="tw:text-[10px] tw:font-bold tw:tracking-[1px] tw:text-[#689171]">
                ORGANIZE SEUS ALIMENTOS
              </span>

              <h1 className="tw:my-[9px] tw:text-[29px] tw:font-bold tw:tracking-[-0.7px] tw:text-[#124638]">
                Minha despensa
              </h1>

              <p className="tw:text-[13px] tw:text-[#78847b]">
                Acompanhe seus alimentos e evite desperdícios.
              </p>
            </div>

            <Link
              to="/doador/alimentos/novo"
              className="tw:flex tw:items-center tw:gap-[9px] tw:rounded-lg tw:bg-[#124638] tw:px-[17px] tw:py-[13px] tw:text-[12px] tw:font-bold tw:text-white tw:transition-colors tw:hover:bg-[#1d624d] tw:max-[760px]:w-full tw:max-[760px]:justify-center"
            >
              <Plus size={19} />
              Adicionar alimento
            </Link>

          </section>

          {/* RESUMO */}
          <section className="tw:mb-[25px] tw:grid tw:grid-cols-3 tw:gap-4 tw:max-[760px]:grid-cols-1">

            <article className="tw:flex tw:items-center tw:gap-[14px] tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-[19px]">

              <div className="tw:grid tw:size-[43px] tw:shrink-0 tw:place-items-center tw:rounded-[10px] tw:bg-[#eaf2e8] tw:text-[#467b56]">
                <Package size={21} />
              </div>

              <div>
                <span className="tw:block tw:text-[11px] tw:text-[#78847b]">
                  Total de alimentos
                </span>

                <strong className="tw:my-[7px] tw:block tw:text-[24px] tw:text-[#244d39]">
                  03
                </strong>

                <small className="tw:block tw:text-[10px] tw:text-[#9aa29b]">
                  Cadastrados na despensa
                </small>
              </div>

            </article>

            <article className="tw:flex tw:items-center tw:gap-[14px] tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-[19px]">

              <div className="tw:grid tw:size-[43px] tw:shrink-0 tw:place-items-center tw:rounded-[10px] tw:bg-[#fff1d8] tw:text-[#c28a37]">
                <Clock3 size={21} />
              </div>

              <div>
                <span className="tw:block tw:text-[11px] tw:text-[#78847b]">
                  Precisam de atenção
                </span>

                <strong className="tw:my-[7px] tw:block tw:text-[24px] tw:text-[#244d39]">
                  01
                </strong>

                <small className="tw:block tw:text-[10px] tw:text-[#9aa29b]">
                  Próximos da validade
                </small>
              </div>

            </article>

            <article className="tw:flex tw:items-center tw:gap-[14px] tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-[19px]">

              <div className="tw:grid tw:size-[43px] tw:shrink-0 tw:place-items-center tw:rounded-[10px] tw:bg-[#eaf2e8] tw:text-[#467b56]">
                <SlidersHorizontal size={21} />
              </div>

              <div>
                <span className="tw:block tw:text-[11px] tw:text-[#78847b]">
                  Disponíveis para doação
                </span>

                <strong className="tw:my-[7px] tw:block tw:text-[24px] tw:text-[#244d39]">
                  01
                </strong>

                <small className="tw:block tw:text-[10px] tw:text-[#9aa29b]">
                  Alimentos compartilhados
                </small>
              </div>

            </article>

          </section>

          {/* PAINEL DA LISTA */}
          <section className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-[25px] tw:max-[1100px]:p-[18px] tw:max-[400px]:p-[14px]">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-[15px] tw:max-[400px]:items-start tw:max-[400px]:flex-col">

              <div>
                <h2 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
                  Alimentos cadastrados
                </h2>

                <p className="tw:mt-[6px] tw:text-[11px] tw:text-[#929b93]">
                  Consulte e acompanhe os alimentos da sua despensa.
                </p>
              </div>

              <span className="tw:whitespace-nowrap tw:rounded-full tw:bg-[#eaf2e8] tw:px-3 tw:py-[7px] tw:text-[10px] tw:text-[#477b57]">
                {alimentosFiltrados.length} alimentos
              </span>

            </div>

            {/* BUSCA E FILTROS */}
            <div className="tw:my-6 tw:grid tw:grid-cols-[1.5fr_1fr_1fr] tw:gap-3 tw:max-[760px]:grid-cols-1">

              <div className="tw:flex tw:min-w-0 tw:items-center tw:gap-[10px] tw:rounded-lg tw:border tw:border-[#e5e9e2] tw:px-3 tw:text-[#87958a]">

                <Search size={19} className="tw:shrink-0" />

                <input
                  type="text"
                  placeholder="Buscar alimento..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="tw:h-[42px] tw:w-full tw:min-w-0 tw:border-0 tw:bg-transparent tw:text-[12px] tw:text-[#344a3c] tw:outline-none tw:placeholder:text-[#a0aaa2]"
                />

              </div>

              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="tw:h-[42px] tw:min-w-0 tw:rounded-lg tw:border tw:border-[#e5e9e2] tw:bg-white tw:px-[10px] tw:text-[11px] tw:text-[#5e7064] tw:outline-none"
              >
                <option value="Todas">Todas as categorias</option>
                <option value="Hortifruti">Hortifruti</option>
                <option value="Grãos">Grãos</option>
                <option value="Laticínios">Laticínios</option>
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="tw:h-[42px] tw:min-w-0 tw:rounded-lg tw:border tw:border-[#e5e9e2] tw:bg-white tw:px-[10px] tw:text-[11px] tw:text-[#5e7064] tw:outline-none"
              >
                <option value="Todos">Todos os status</option>
                <option value="Na despensa">Na despensa</option>
                <option value="Disponível para doação">
                  Disponível para doação
                </option>
              </select>

            </div>

            {/* CABEÇALHO DA LISTA */}
            <div className="tw:grid tw:grid-cols-[1.5fr_0.9fr_1.2fr_1.2fr_75px] tw:items-center tw:gap-3 tw:border-t tw:border-b tw:border-[#edf0e9] tw:bg-[#f7f8f4] tw:px-[10px] tw:py-[14px] tw:text-[9px] tw:font-bold tw:tracking-[0.5px] tw:text-[#929c93] tw:max-[1100px]:grid-cols-[1.3fr_0.8fr_1.2fr_1fr_65px] tw:max-[1100px]:gap-2 tw:max-[760px]:hidden">

              <span>ALIMENTO</span>
              <span>QUANTIDADE</span>
              <span>VALIDADE</span>
              <span>STATUS</span>
              <span>AÇÕES</span>

            </div>

            {/* ALIMENTOS */}
            <div>

              {alimentosFiltrados.map((alimento) => {

                const expirationClass = alimento.atencao
                  ? 'tw:text-[#c28a37]'
                  : 'tw:text-[#518264]'

                const statusClass = alimento.status === 'Na despensa'
                  ? 'tw:bg-[#eaf2e8] tw:text-[#517d5c]'
                  : 'tw:bg-[#e8f1f3] tw:text-[#477c8c]'

                return (
                  <div
                    className="tw:grid tw:grid-cols-[1.5fr_0.9fr_1.2fr_1.2fr_75px] tw:items-center tw:gap-3 tw:border-b tw:border-[#edf0e9] tw:px-[10px] tw:py-[15px] tw:max-[1100px]:grid-cols-[1.3fr_0.8fr_1.2fr_1fr_65px] tw:max-[1100px]:gap-2 tw:max-[760px]:grid-cols-2 tw:max-[760px]:gap-[13px] tw:max-[760px]:px-[5px] tw:max-[760px]:py-[17px]"
                    key={alimento.id}
                  >

                    <div className="tw:flex tw:min-w-0 tw:items-center tw:gap-[11px] tw:max-[760px]:col-span-full">

                      <div className="tw:grid tw:size-[42px] tw:shrink-0 tw:place-items-center tw:rounded-[10px] tw:bg-[#edf2e9]">
                        <img
                          src={alimento.imagem}
                          alt={alimento.nome}
                          className="tw:size-[30px] tw:object-contain"
                        />
                      </div>

                      <div className="tw:min-w-0">
                        <strong className="tw:block tw:text-[12px] tw:text-[#344a3c]">
                          {alimento.nome}
                        </strong>

                        <small className="tw:mt-1 tw:block tw:text-[10px] tw:text-[#929b93]">
                          {alimento.categoria}
                        </small>
                      </div>

                    </div>

                    <span className="tw:text-[11px] tw:text-[#607064]">
                      {alimento.quantidade}
                    </span>

                    <div className={`tw:flex tw:items-center tw:gap-2 ${expirationClass}`}>

                      <Clock3 size={15} className="tw:shrink-0" />

                      <div>
                        <strong className="tw:block tw:text-[10px]">
                          {alimento.validadeTexto}
                        </strong>

                        <small className="tw:mt-1 tw:block tw:text-[9px] tw:text-[#929b93]">
                          {alimento.validade}
                        </small>
                      </div>

                    </div>

                    <span className={`tw:w-fit tw:whitespace-nowrap tw:rounded-full tw:px-[10px] tw:py-[7px] tw:text-[9px] ${statusClass} tw:max-[760px]:justify-self-start`}>
                      {alimento.status}
                    </span>

                    <div className="tw:flex tw:items-center tw:gap-[5px] tw:max-[760px]:justify-self-end">

                      <button
                        type="button"
                        disabled
                        title="Edição será implementada na etapa de CRUD"
                        aria-label={`Editar ${alimento.nome}`}
                        className="tw:grid tw:size-[29px] tw:cursor-not-allowed tw:place-items-center tw:rounded-md tw:bg-[#f4f6f1] tw:text-[#7e8c81] disabled:tw:opacity-100"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        disabled
                        title="Exclusão será implementada na etapa de CRUD"
                        aria-label={`Excluir ${alimento.nome}`}
                        className="tw:grid tw:size-[29px] tw:cursor-not-allowed tw:place-items-center tw:rounded-md tw:bg-[#f4f6f1] tw:text-[#7e8c81] disabled:tw:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </div>
                )
              })}

              {/* LISTA VAZIA */}
              {alimentosFiltrados.length === 0 && (

                <div className="tw:flex tw:flex-col tw:items-center tw:gap-[10px] tw:px-[15px] tw:py-[45px] tw:text-center tw:text-[#829186]">

                  <Package size={32} />

                  <strong className="tw:text-[14px] tw:text-[#345742]">
                    Nenhum alimento encontrado
                  </strong>

                  <p className="tw:text-[12px]">
                    Tente alterar sua pesquisa ou os filtros.
                  </p>

                </div>

              )}

            </div>

          </section>

        </div>

      </main>

    </div>
  )
}

export default Pantry
