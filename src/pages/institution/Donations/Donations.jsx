import { useState } from 'react'

import {
  Bell,
  Search,
  MapPin,
  CalendarDays,
  Package,
  HandHeart,
  CheckCircle2,
  Clock3,
  Leaf,
  SlidersHorizontal,
  X
} from 'lucide-react'

import InstitutionSidebar from '../../../components/layout/InstitutionSidebar/InstitutionSidebar.jsx'
import SearchInput from '../../../components/layout/SearchInput/SearchInput.jsx'

const doacoesDisponiveis = [
  {
    id: 1,
    nome: 'Tomates',
    categoria: 'Hortifruti',
    quantidade: '5 kg',
    validade: '10/11/2026',
    origem: 'Comércio',
    regiao: 'Região central',
    imagem: '/icons/tomate.svg',
    descricao: 'Tomates frescos, próprios para consumo.'
  },
  {
    id: 2,
    nome: 'Arroz',
    categoria: 'Grãos',
    quantidade: '10 kg',
    validade: '15/11/2026',
    origem: 'Residência',
    regiao: 'Região norte',
    imagem: '/icons/arroz.svg',
    descricao: 'Arroz armazenado adequadamente.'
  },
  {
    id: 3,
    nome: 'Leite',
    categoria: 'Laticínios',
    quantidade: '12 caixas',
    validade: '12/11/2026',
    origem: 'Comércio',
    regiao: 'Região sul',
    imagem: '/icons/leite.svg',
    descricao: 'Caixas de leite fechadas e dentro da validade.'
  },
  {
    id: 4,
    nome: 'Bananas',
    categoria: 'Hortifruti',
    quantidade: '8 kg',
    validade: '09/11/2026',
    origem: 'Comércio',
    regiao: 'Região leste',
    imagem: '/icons/banana.svg',
    descricao: 'Bananas em boas condições para consumo.'
  },
  {
    id: 5,
    nome: 'Arroz',
    categoria: 'Grãos',
    quantidade: '5 kg',
    validade: '18/11/2026',
    origem: 'Comércio',
    regiao: 'Região oeste',
    imagem: '/icons/arroz.svg',
    descricao: 'Pacotes de arroz disponíveis para doação.'
  },
  {
    id: 6,
    nome: 'Tomates',
    categoria: 'Hortifruti',
    quantidade: '3 kg',
    validade: '11/11/2026',
    origem: 'Residência',
    regiao: 'Região central',
    imagem: '/icons/tomate.svg',
    descricao: 'Tomates separados para doação.'
  }
]

const categorias = [
  'Todas',
  'Hortifruti',
  'Grãos',
  'Laticínios'
]

function Donations() {
  const [busca, setBusca] = useState('')
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas')
  const [solicitacoesEnviadas, setSolicitacoesEnviadas] = useState([])
  const [mensagem, setMensagem] = useState('')

  // Filtra as doações conforme a busca e a categoria.
  const doacoesFiltradas = doacoesDisponiveis.filter((doacao) => {
    const termoBusca = busca.toLowerCase().trim()

    const correspondeBusca =
      doacao.nome.toLowerCase().includes(termoBusca) ||
      doacao.origem.toLowerCase().includes(termoBusca) ||
      doacao.regiao.toLowerCase().includes(termoBusca)

    const correspondeCategoria =
      categoriaSelecionada === 'Todas' ||
      doacao.categoria === categoriaSelecionada

    return correspondeBusca && correspondeCategoria
  })

  // Simula o envio de uma solicitação de reserva.
  function solicitarReserva(doacao) {
    if (solicitacoesEnviadas.includes(doacao.id)) {
      return
    }

    setSolicitacoesEnviadas((anteriores) => [
      ...anteriores,
      doacao.id
    ])

    setMensagem(
      `Solicitação de ${doacao.nome} enviada! Aguarde a resposta do doador.`
    )
  }

  function limparFiltros() {
    setBusca('')
    setCategoriaSelecionada('Todas')
    setMensagem('')
  }

  return (
    <div className="tw:flex tw:min-h-screen tw:bg-[#f7f6ef] tw:max-[760px]:flex-col">

      {/* MENU LATERAL */}
      <InstitutionSidebar />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="tw:min-w-0 tw:flex-1 tw:px-[45px] tw:pb-[35px] tw:max-[1100px]:px-[25px] tw:max-[1100px]:pb-[30px] tw:max-[760px]:px-[18px] tw:max-[760px]:pb-[25px]">

        {/* CABEÇALHO */}
        <header className="tw:flex tw:h-[75px] tw:items-center tw:justify-between tw:border-b tw:border-[#e8eae2]">

          <div className="tw:flex tw:items-center tw:gap-[10px] tw:text-[12px] tw:text-[#87938a] tw:max-[450px]:text-[10px]">
            <span>RedePratos</span>
            <span>/</span>
            <strong className="tw:text-[#315c43]">
              Explorar doações
            </strong>
          </div>

          <button
            type="button"
            className="tw:relative tw:grid tw:size-10 tw:cursor-pointer tw:place-items-center tw:rounded-full tw:border tw:border-[#e8eae2] tw:bg-white tw:text-[#315c43]"
            aria-label="Notificações"
          >
            <Bell size={20} />
            <span className="tw:absolute tw:top-2 tw:right-[9px] tw:size-[7px] tw:rounded-full tw:bg-[#d78b42]" />
          </button>

        </header>

        {/* APRESENTAÇÃO */}
        <section className="tw:py-[35px]">

          <span className="tw:text-[10px] tw:font-bold tw:tracking-[1px] tw:text-[#689171]">
            ENCONTRE ALIMENTOS
          </span>

          <h1 className="tw:my-[9px] tw:text-[30px] tw:font-bold tw:tracking-[-0.7px] tw:text-[#124638]">
            Explorar doações
          </h1>

          <p className="tw:text-[13px] tw:text-[#78847b]">
            Encontre alimentos disponíveis e solicite reservas para sua instituição.
          </p>

        </section>

        {/* INDICADORES */}
        <section className="tw:mb-[25px] tw:grid tw:grid-cols-3 tw:gap-[17px] tw:max-[760px]:grid-cols-1">

          <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
              <span>Doações encontradas</span>
              <Package size={21} className="tw:text-[#528463]" />
            </div>

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
              {doacoesFiltradas.length.toString().padStart(2, '0')}
            </strong>

            <small className="tw:text-[10px] tw:text-[#8c978e]">
              Conforme seus filtros
            </small>

          </article>

          <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
              <span>Solicitações enviadas</span>
              <Clock3 size={21} className="tw:text-[#d39746]" />
            </div>

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
              {solicitacoesEnviadas.length.toString().padStart(2, '0')}
            </strong>

            <small className="tw:text-[10px] tw:text-[#8c978e]">
              Aguardando resposta dos doadores
            </small>

          </article>

          <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
              <span>Categorias disponíveis</span>
              <Leaf size={21} className="tw:text-[#528463]" />
            </div>

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
              {categorias.length - 1}
            </strong>

            <small className="tw:text-[10px] tw:text-[#8c978e]">
              Tipos de alimentos
            </small>

          </article>

        </section>

        {/* BUSCA E FILTROS */}
        <section className="tw:mb-[22px] tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5">

          <div className="tw:mb-4 tw:flex tw:items-center tw:gap-2">
            <SlidersHorizontal size={18} className="tw:text-[#528463]" />

            <h2 className="tw:text-[13px] tw:font-bold tw:text-[#244d39]">
              Encontre o alimento ideal
            </h2>
          </div>

          <div className="tw:grid tw:grid-cols-[1.5fr_1fr] tw:gap-3 tw:max-[600px]:grid-cols-1">

            {/* CAMPO DE BUSCA */}
            <SearchInput
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Buscar alimento ou região..."
              ariaLabel="Buscar alimento ou região"
              onClear={() => setBusca('')}
            />

            {/* FILTRO POR CATEGORIA */}
            <select
              value={categoriaSelecionada}
              onChange={(event) => setCategoriaSelecionada(event.target.value)}
              className="tw:w-full tw:rounded-xl tw:border tw:border-[#DDE3D9] tw:bg-white tw:px-4 tw:py-3 tw:text-sm tw:text-[#35483A] tw:outline-none focus:tw:border-[#52745B]"
              aria-label="Filtrar por categoria"
            >
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria === 'Todas'
                    ? 'Todas as categorias'
                    : categoria}
                </option>
              ))}
            </select>

          </div>

          {(busca || categoriaSelecionada !== 'Todas') && (
            <button
              type="button"
              onClick={limparFiltros}
              className="tw:mt-3 tw:inline-flex tw:cursor-pointer tw:appearance-none tw:items-center tw:gap-1.5 tw:rounded-full tw:border-0 tw:bg-[#eaf2e8] tw:px-3 tw:py-1.5 tw:text-[11px] tw:font-semibold tw:text-[#477b57] tw:shadow-none tw:transition-colors hover:tw:bg-[#dcebd9] hover:tw:text-[#315c43]"
            >
              Limpar filtros
            </button>
          )}

        </section>

        {/* MENSAGEM DE SOLICITAÇÃO */}
        {mensagem && (
          <div className="tw:mb-5 tw:flex tw:items-start tw:gap-3 tw:rounded-xl tw:border tw:border-[#dcebdd] tw:bg-[#edf6ed] tw:p-4">

            <CheckCircle2
              size={20}
              className="tw:mt-0.5 tw:shrink-0 tw:text-[#477b57]"
            />

            <div className="tw:min-w-0 tw:flex-1">
              <strong className="tw:block tw:text-[12px] tw:text-[#315c43]">
                Solicitação registrada
              </strong>

              <p className="tw:mt-1 tw:text-[11px] tw:leading-[1.5] tw:text-[#64806b]">
                {mensagem}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMensagem('')}
              aria-label="Fechar mensagem"
              className="tw:flex tw:shrink-0 tw:items-center tw:justify-center tw:appearance-none tw:border-0 tw:bg-transparent tw:p-1 tw:shadow-none tw:outline-none tw:rounded-full tw:text-[#829083] tw:transition-colors tw:hover:bg-[#f0f4ef] tw:hover:text-[#315c43]"
            >
              <X size={17} />
            </button>

          </div>
        )}

        {/* RESULTADO DA BUSCA */}
        <section>

          <div className="tw:mb-4 tw:flex tw:items-center tw:justify-between tw:gap-3">
            <div>
              <h2 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
                Doações disponíveis
              </h2>

              <p className="tw:mt-1 tw:text-[11px] tw:text-[#929b93]">
                {doacoesFiltradas.length} resultado(s) encontrado(s)
              </p>
            </div>
          </div>

          {doacoesFiltradas.length > 0 ? (

            <div className="tw:grid tw:grid-cols-2 tw:gap-[17px] tw:max-[900px]:grid-cols-1">

              {doacoesFiltradas.map((doacao) => {
                const solicitada = solicitacoesEnviadas.includes(doacao.id)

                return (
                  <article
                    key={doacao.id}
                    className="tw:overflow-hidden tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:transition-shadow tw:hover:shadow-md"
                  >

                    {/* CABEÇALHO DO CARTÃO */}
                    <div className="tw:flex tw:items-start tw:gap-4 tw:p-5">

                      <div className="tw:grid tw:size-[76px] tw:shrink-0 tw:place-items-center tw:rounded-xl tw:bg-[#edf2e9]">
                        <img
                          src={doacao.imagem}
                          alt={doacao.nome}
                          className="tw:size-[53px] tw:object-contain"
                        />
                      </div>

                      <div className="tw:min-w-0 tw:flex-1">

                        <div className="tw:mb-2 tw:flex tw:flex-wrap tw:items-center tw:gap-2">

                          <h3 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
                            {doacao.nome}
                          </h3>

                          <span className="tw:rounded-full tw:bg-[#eaf2e8] tw:px-2 tw:py-1 tw:text-[9px] tw:font-semibold tw:text-[#477b57]">
                            {doacao.categoria}
                          </span>

                        </div>

                        <p className="tw:text-[12px] tw:font-semibold tw:text-[#52745B]">
                          {doacao.quantidade} disponíveis
                        </p>

                        <p className="tw:mt-1 tw:text-[10px] tw:text-[#929b93]">
                          {doacao.descricao}
                        </p>

                      </div>

                    </div>

                    {/* INFORMAÇÕES */}
                    <div className="tw:grid tw:grid-cols-2 tw:gap-3 tw:border-t tw:border-[#f0f1ec] tw:px-5 tw:py-4">

                      <div className="tw:flex tw:items-center tw:gap-2">
                        <CalendarDays
                          size={15}
                          className="tw:shrink-0 tw:text-[#d39746]"
                        />

                        <div>
                          <small className="tw:block tw:text-[9px] tw:text-[#929b93]">
                            Validade
                          </small>

                          <span className="tw:text-[10px] tw:font-semibold tw:text-[#65746a]">
                            {doacao.validade}
                          </span>
                        </div>
                      </div>

                      <div className="tw:flex tw:items-center tw:gap-2">
                        <MapPin
                          size={15}
                          className="tw:shrink-0 tw:text-[#528463]"
                        />

                        <div>
                          <small className="tw:block tw:text-[9px] tw:text-[#929b93]">
                            Localização
                          </small>

                          <span className="tw:text-[10px] tw:font-semibold tw:text-[#65746a]">
                            {doacao.regiao}
                          </span>
                        </div>
                      </div>

                      <div className="tw:flex tw:items-center tw:gap-2">
                        <Package
                          size={15}
                          className="tw:shrink-0 tw:text-[#528463]"
                        />

                        <div>
                          <small className="tw:block tw:text-[9px] tw:text-[#929b93]">
                            Origem
                          </small>

                          <span className="tw:text-[10px] tw:font-semibold tw:text-[#65746a]">
                            {doacao.origem}
                          </span>
                        </div>
                      </div>

                      <div className="tw:flex tw:items-center tw:gap-2">
                        <Leaf
                          size={15}
                          className="tw:shrink-0 tw:text-[#528463]"
                        />

                        <div>
                          <small className="tw:block tw:text-[9px] tw:text-[#929b93]">
                            Disponibilidade
                          </small>

                          <span className="tw:text-[10px] tw:font-semibold tw:text-[#477b57]">
                            {solicitada ? 'Solicitada' : 'Disponível'}
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* AÇÃO */}
                    <div className="tw:border-t tw:border-[#f0f1ec] tw:p-5">

                      {solicitada ? (

                        <div className="tw:flex tw:items-center tw:justify-center tw:gap-2 tw:rounded-lg tw:bg-[#fff4df] tw:px-4 tw:py-3 tw:text-[11px] tw:font-semibold tw:text-[#a97930]">
                          <Clock3 size={16} />
                          Solicitação enviada • Aguardando doador
                        </div>

                      ) : (

                        <button
                          type="button"
                          onClick={() => solicitarReserva(doacao)}
                          className="tw:flex tw:w-full tw:items-center tw:justify-center tw:gap-2 tw:rounded-lg tw:bg-[#52745B] tw:px-4 tw:py-3 tw:text-[11px] tw:font-semibold tw:text-white tw:transition-colors tw:hover:bg-[#3D6047]"
                        >
                          <HandHeart size={16} />
                          Solicitar reserva
                        </button>

                      )}

                    </div>

                  </article>
                )
              })}

            </div>

          ) : (

            /* ESTADO VAZIO */
            <div className="tw:flex tw:flex-col tw:items-center tw:rounded-xl tw:border tw:border-dashed tw:border-[#dce3d9] tw:bg-white tw:px-5 tw:py-12 tw:text-center">

              <div className="tw:mb-4 tw:grid tw:size-[58px] tw:place-items-center tw:rounded-full tw:bg-[#edf2e9] tw:text-[#528463]">
                <Search size={26} />
              </div>

              <h3 className="tw:text-[15px] tw:font-bold tw:text-[#315c43]">
                Nenhuma doação encontrada
              </h3>

              <p className="tw:mt-2 tw:max-w-[350px] tw:text-[11px] tw:leading-[1.6] tw:text-[#929b93]">
                Não encontramos alimentos com esses filtros. Tente buscar outro alimento ou selecionar uma categoria diferente.
              </p>

              <button
                type="button"
                onClick={limparFiltros}
                className="tw:mt-5 tw:rounded-lg tw:bg-[#eaf2e8] tw:px-4 tw:py-2.5 tw:text-[11px] tw:font-semibold tw:text-[#477b57] tw:hover:bg-[#dcebd9]"
              >
                Limpar filtros
              </button>

            </div>

          )}

        </section>

        {/* AVISO SOBRE RESERVAS */}
        <section className="tw:mt-5 tw:flex tw:items-start tw:gap-3 tw:rounded-xl tw:border tw:border-[#f1e7d2] tw:bg-[#fff6e8] tw:p-5">

          <Clock3 size={21} className="tw:mt-0.5 tw:shrink-0 tw:text-[#c28a37]" />

          <div>
            <h2 className="tw:text-[12px] tw:font-bold tw:text-[#775c31]">
              Como funciona a reserva?
            </h2>

            <p className="tw:mt-1 tw:text-[10px] tw:leading-[1.6] tw:text-[#927a53]">
              Ao solicitar um alimento, o doador receberá seu pedido.
              A reserva só será confirmada depois que ele aceitar a solicitação.
              Acompanhe o andamento na área Minhas Solicitações.
            </p>

          </div>

        </section>

      </main>
    </div>
  )
}

export default Donations
