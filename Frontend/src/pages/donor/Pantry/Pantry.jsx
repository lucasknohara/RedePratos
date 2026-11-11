import { useState, useEffect } from 'react'

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
import { listarAlimentos, deletarAlimento, atualizarAlimento } from '../../../services/alimentosService.js'

import { Link } from 'react-router-dom'

const categorias = {
  hortifruti: 'Hortifruti',
  frutas: 'Frutas',
  graos: 'Grãos',
  laticinios: 'Laticínios',
  proteinas: 'Proteínas',
  enlatados: 'Enlatados',
  massas: 'Massas',
  outros: 'Outros'
}

const imagens = {
  tomate: '/icons/tomate.svg',
  arroz: '/icons/arroz.svg',
  leite: '/icons/leite.svg'
}

function adaptarAlimento(alimento) {
  let validadeISO

  if (alimento.validade instanceof Date && !Number.isNaN(alimento.validade.getTime())) {
    const ano = alimento.validade.getFullYear()
    const mes = String(alimento.validade.getMonth() + 1).padStart(2, '0')
    const dia = String(alimento.validade.getDate()).padStart(2, '0')

    validadeISO = `${ano}-${mes}-${dia}`
  } else {
    validadeISO = String(alimento.validade ?? '').slice(0, 10)
  }

  const [ano, mes, dia] = validadeISO.split('-').map(Number)

  const dataValidade = new Date(ano, mes - 1, dia)

  const dataValida =
    Number.isInteger(ano) &&
    Number.isInteger(mes) &&
    Number.isInteger(dia) &&
    dataValidade.getFullYear() === ano &&
    dataValidade.getMonth() === mes - 1 &&
    dataValidade.getDate() === dia

  let validadeFormatada = 'Data inválida'
  let validadeTexto = 'Data inválida'
  let diasRestantes = null

  if (dataValida) {
    const hoje = new Date()

    const hojeUTC = Date.UTC(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate()
    )

    const validadeUTC = Date.UTC(ano, mes - 1, dia)

    diasRestantes = Math.round(
      (validadeUTC - hojeUTC) / (1000 * 60 * 60 * 24)
    )

    validadeFormatada = `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${ano}`

    if (diasRestantes < 0) {
      validadeTexto = `Vencido há ${Math.abs(diasRestantes)} dias`
    } else if (diasRestantes === 0) {
      validadeTexto = 'Vence hoje'
    } else if (diasRestantes === 1) {
      validadeTexto = 'Vence amanhã'
    } else {
      validadeTexto = `Em ${diasRestantes} dias`
    }
  }

  const nome = String(alimento.nome ?? '')
  const categoriaOriginal = String(alimento.categoria ?? '')

  return {
    ...alimento,
    categoria: categorias[categoriaOriginal.toLowerCase()] || categoriaOriginal,
    quantidade: `${alimento.quantidade} ${alimento.unidade}`,
    validade: validadeFormatada,
    validadeTexto,
    categoriaOriginal: alimento.categoria,
    quantidadeOriginal: alimento.quantidade,
    validadeISO,
    status: 'Na despensa',
    imagem: imagens[nome.trim().toLowerCase()] || null,
    atencao: diasRestantes !== null && diasRestantes <= 7
  }
}

function Pantry() {
  const [alimentos, setAlimentos] = useState([])
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [status, setStatus] = useState('Todos')
  const [excluindoId, setExcluindoId] = useState(null)
  const [erroAcao, setErroAcao] = useState('')
  const [sucessoAcao, setSucessoAcao] = useState('')
  const [alimentoEditando, setAlimentoEditando] = useState(null)
  const [salvandoEdicao, setSalvandoEdicao] = useState(false)
  const [erroEdicao, setErroEdicao] = useState('')

  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    let ativo = true

    async function carregarAlimentos() {
      try {
        setCarregando(true)
        setErro('')

        const usuarioSalvo = localStorage.getItem('usuario')

        if (!usuarioSalvo) {
          throw new Error('Faça login novamente.')
        }

        const usuario = JSON.parse(usuarioSalvo)

        if (!usuario || typeof usuario !== 'object') {
          throw new Error('Dados do usuário inválidos. Faça login novamente.')
        }

        const idUsuario = Number(usuario.id)

        if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
          throw new Error('Identificação do usuário inválida.')
        }

        if (usuario.tipo_usuario !== 'doador') {
          throw new Error('Acesso permitido somente para doadores.')
        }

        const resultado = await listarAlimentos(idUsuario)

        if (!Array.isArray(resultado)) {
          throw new Error('Não foi possível carregar a lista de alimentos.')
        }

        if (ativo) {
          setAlimentos(resultado.map(adaptarAlimento))
        }

      } catch (error) {
        if (ativo) {
          setErro(error.message || 'Não foi possível carregar os alimentos.')
        }

      } finally {
        if (ativo) {
          setCarregando(false)
        }
      }
    }

    carregarAlimentos()

    return () => {
      ativo = false
    }
  }, [])

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

  const totalAlimentos = alimentos.length

  const alimentosAtencao = alimentos.filter(
    (alimento) => alimento.atencao
  ).length

  const alimentosDisponiveis = alimentos.filter(
    (alimento) => alimento.status === 'Disponível para doação'
  ).length

  async function handleExcluir(alimento) {
    const confirmar = window.confirm(
      `Deseja realmente excluir ${alimento.nome}?`
    )

    if (!confirmar) return

    try {
      setExcluindoId(alimento.id)
      setErroAcao('')
      setSucessoAcao('')

      const usuarioSalvo = localStorage.getItem('usuario')

      if (!usuarioSalvo) {
        throw new Error('Faça login novamente.')
      }

      const usuario = JSON.parse(usuarioSalvo)
      const idUsuario = Number(usuario?.id)

      if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        throw new Error('Identificação do usuário inválida.')
      }

      await deletarAlimento(alimento.id, idUsuario)

      setAlimentos((anteriores) =>
        anteriores.filter((item) => item.id !== alimento.id)
      )

      setSucessoAcao(`${alimento.nome} foi excluído com sucesso.`)

    } catch (error) {
      setErroAcao(error.message || 'Não foi possível excluir o alimento.')

    } finally {
      setExcluindoId(null)
    }
  }

  async function handleAtualizar(event) {
    event.preventDefault()
    setErroEdicao('')

    const formData = new FormData(event.currentTarget)

    try {
      const usuarioSalvo = localStorage.getItem('usuario')

      if (!usuarioSalvo) {
        throw new Error('Faça login novamente.')
      }

      const usuario = JSON.parse(usuarioSalvo)

      if (usuario?.tipo_usuario !== 'doador') {
        throw new Error('Somente doadores podem editar alimentos.')
      }

      const idUsuario = Number(usuario.id)

      if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        throw new Error('Identificação do usuário inválida.')
      }

      const dados = {
        nome: String(formData.get('nome') ?? '').trim(),
        categoria: formData.get('categoria'),
        quantidade: Number(formData.get('quantidade')),
        unidade: formData.get('unidade'),
        validade: formData.get('validade'),
        origem: formData.get('origem'),
        observacao: String(formData.get('observacao') ?? '').trim() || null,
        id_usuario: idUsuario
      }

      setSalvandoEdicao(true)

      const resultado = await atualizarAlimento(
        alimentoEditando.id,
        dados
      )

      setAlimentos((anteriores) =>
        anteriores.map((item) =>
          item.id === alimentoEditando.id
            ? adaptarAlimento(resultado)
            : item
        )
      )

      setAlimentoEditando(null)
      setErroAcao('')
      setSucessoAcao(`${dados.nome} foi atualizado com sucesso.`)

    } catch (error) {
      setErroEdicao(error.message || 'Não foi possível atualizar o alimento.')

    } finally {
      setSalvandoEdicao(false)
    }
  }

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
                  {carregando || erro ? '—' : totalAlimentos.toString().padStart(2, '0')}
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
                  {carregando || erro ? '—' : alimentosAtencao.toString().padStart(2, '0')}
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
                  {carregando || erro ? '—' : alimentosDisponiveis.toString().padStart(2, '0')}
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
                {carregando ? 'Carregando...' : `${alimentosFiltrados.length} alimentos`}
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
                <option value="Frutas">Frutas</option>
                <option value="Grãos">Grãos</option>
                <option value="Laticínios">Laticínios</option>
                <option value="Proteínas">Proteínas</option>
                <option value="Enlatados">Enlatados</option>
                <option value="Massas">Massas</option>
                <option value="Outros">Outros</option>
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

            {sucessoAcao && (
              <p className="tw:mb-4 tw:rounded-lg tw:bg-green-50 tw:p-3 tw:text-[12px] tw:text-green-700">
                {sucessoAcao}
              </p>
            )}

            {erroAcao && (
              <p className="tw:mb-4 tw:rounded-lg tw:bg-red-50 tw:p-3 tw:text-[12px] tw:text-red-600">
                {erroAcao}
              </p>
            )}

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

              {carregando ? (

                <p className="tw:py-10 tw:text-center tw:text-sm tw:text-[#78847b]">
                  Carregando seus alimentos...
                </p>

              ) : erro ? (

                <p className="tw:rounded-lg tw:bg-red-50 tw:p-4 tw:text-center tw:text-sm tw:text-red-600">
                  {erro}
                </p>

              ) : alimentosFiltrados.length === 0 ? (

                <div className="tw:flex tw:flex-col tw:items-center tw:gap-[10px] tw:px-[15px] tw:py-[45px] tw:text-center tw:text-[#829186]">

                  <Package size={32} />

                  <strong className="tw:text-[14px] tw:text-[#345742]">
                    {alimentos.length === 0
                      ? 'Sua despensa está vazia'
                      : 'Nenhum alimento encontrado'}
                  </strong>

                  <p className="tw:text-[12px]">
                    {alimentos.length === 0
                      ? 'Cadastre seu primeiro alimento para começar.'
                      : 'Tente alterar sua pesquisa ou os filtros.'}
                  </p>

                </div>

              ) : (

                alimentosFiltrados.map((alimento) => {

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

                          {alimento.imagem ? (
                            <img
                              src={alimento.imagem}
                              alt={alimento.nome}
                              className="tw:size-[30px] tw:object-contain"
                            />
                          ) : (
                            <Package
                              size={22}
                              className="tw:text-[#78917d]"
                            />
                          )}

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
                        onClick={() => {
                          setAlimentoEditando(alimento)
                          setErroEdicao('')
                        }}
                        title="Editar alimento"
                        aria-label={`Editar ${alimento.nome}`}
                        className="tw:grid tw:size-[29px] tw:cursor-pointer tw:place-items-center tw:rounded-md tw:bg-[#f4f6f1] tw:text-[#7e8c81] tw:hover:bg-[#eaf2e8] tw:hover:text-[#315c43]"
                      >
                        <Pencil size={16} />
                      </button>

                        <button
                          type="button"
                          onClick={() => handleExcluir(alimento)}
                          disabled={excluindoId === alimento.id}
                          title="Excluir alimento"
                          aria-label={`Excluir ${alimento.nome}`}
                          className="tw:grid tw:size-[29px] tw:cursor-pointer tw:place-items-center tw:rounded-md tw:bg-[#f4f6f1] tw:text-[#7e8c81] tw:hover:bg-red-50 tw:hover:text-red-600 disabled:tw:cursor-not-allowed disabled:tw:opacity-50"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </div>
                  )
                })

              )}

            </div>

          </section>

        </div>

      </main>

      {alimentoEditando && (
        <div className="tw:fixed tw:inset-0 tw:z-50 tw:flex tw:items-center tw:justify-center tw:bg-black/40 tw:p-4">

          <div className="tw:max-h-[90vh] tw:w-full tw:max-w-[550px] tw:overflow-y-auto tw:rounded-xl tw:bg-white tw:p-7 tw:shadow-xl tw:max-[500px]:p-[18px]">

            <div className="tw:mb-6">
              <h2 className="tw:text-[19px] tw:font-bold tw:text-[#244d39]">
                Editar alimento
              </h2>

              <p className="tw:mt-1 tw:text-[12px] tw:text-[#929b93]">
                Atualize as informações do alimento.
              </p>
            </div>

            <form onSubmit={handleAtualizar}>

              <div className="tw:mb-4 tw:flex tw:flex-col tw:gap-2">
                <label className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]">
                  Nome do alimento
                </label>

                <input
                  type="text"
                  name="nome"
                  defaultValue={alimentoEditando.nome}
                  required
                  className="tw:h-11 tw:rounded-lg tw:border tw:border-[#e3e8e0] tw:px-3 tw:text-[12px] tw:text-[#344a3c] tw:outline-none focus:tw:border-[#4aaa70]"
                />
              </div>

              <div className="tw:mb-4 tw:flex tw:flex-col tw:gap-2">
                <label className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]">
                  Categoria
                </label>

                <select
                  name="categoria"
                  defaultValue={alimentoEditando.categoriaOriginal}
                  required
                  className="tw:h-11 tw:rounded-lg tw:border tw:border-[#e3e8e0] tw:bg-white tw:px-3 tw:text-[12px] tw:text-[#344a3c]"
                >
                  <option value="hortifruti">Hortifruti</option>
                  <option value="frutas">Frutas</option>
                  <option value="graos">Grãos</option>
                  <option value="laticinios">Laticínios</option>
                  <option value="proteinas">Proteínas</option>
                  <option value="enlatados">Enlatados</option>
                  <option value="massas">Massas</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div className="tw:mb-4 tw:grid tw:grid-cols-2 tw:gap-3 tw:max-[450px]:grid-cols-1">

                <div className="tw:flex tw:flex-col tw:gap-2">
                  <label className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]">
                    Quantidade
                  </label>

                  <input
                    type="number"
                    name="quantidade"
                    min="0.01"
                    step="0.01"
                    defaultValue={alimentoEditando.quantidadeOriginal}
                    required
                    className="tw:h-11 tw:rounded-lg tw:border tw:border-[#e3e8e0] tw:px-3 tw:text-[12px] tw:text-[#344a3c]"
                  />
                </div>

                <div className="tw:flex tw:flex-col tw:gap-2">
                  <label className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]">
                    Unidade
                  </label>

                  <select
                    name="unidade"
                    defaultValue={alimentoEditando.unidade}
                    required
                    className="tw:h-11 tw:rounded-lg tw:border tw:border-[#e3e8e0] tw:bg-white tw:px-3 tw:text-[12px] tw:text-[#344a3c]"
                  >
                    <option value="kg">Quilograma (kg)</option>
                    <option value="g">Grama (g)</option>
                    <option value="unidade">Unidade</option>
                    <option value="litro">Litro (L)</option>
                    <option value="ml">Mililitro (ml)</option>
                    <option value="pacote">Pacote</option>
                    <option value="caixa">Caixa</option>
                  </select>
                </div>

              </div>

              <div className="tw:mb-4 tw:flex tw:flex-col tw:gap-2">
                <label className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]">
                  Data de validade
                </label>

                <input
                  type="date"
                  name="validade"
                  defaultValue={alimentoEditando.validadeISO}
                  required
                  className="tw:h-11 tw:rounded-lg tw:border tw:border-[#e3e8e0] tw:bg-white tw:px-3 tw:text-[12px] tw:text-[#344a3c]"
                />
              </div>

              <div className="tw:mb-4 tw:flex tw:flex-col tw:gap-2">
                <label className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]">
                  Origem
                </label>

                <select
                  name="origem"
                  defaultValue={alimentoEditando.origem}
                  required
                  className="tw:h-11 tw:rounded-lg tw:border tw:border-[#e3e8e0] tw:bg-white tw:px-3 tw:text-[12px] tw:text-[#344a3c]"
                >
                  <option value="Residência">Residência</option>
                  <option value="Comércio">Comércio</option>
                </select>
              </div>

              <div className="tw:mb-5 tw:flex tw:flex-col tw:gap-2">
                <label className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]">
                  Observações
                </label>

                <textarea
                  name="observacao"
                  rows="3"
                  maxLength={250}
                  defaultValue={alimentoEditando.observacao || ''}
                  className="tw:resize-y tw:rounded-lg tw:border tw:border-[#e3e8e0] tw:p-3 tw:text-[12px] tw:text-[#344a3c]"
                />
              </div>

              {erroEdicao && (
                <p className="tw:mb-4 tw:rounded-lg tw:bg-red-50 tw:p-3 tw:text-[12px] tw:text-red-600">
                  {erroEdicao}
                </p>
              )}

              <div className="tw:flex tw:justify-end tw:gap-3 tw:border-t tw:border-[#edf0e9] tw:pt-4 tw:max-[450px]:flex-col-reverse">
            
                <button
                  type="button"
                  disabled={salvandoEdicao}
                  onClick={() => {
                    setAlimentoEditando(null)
                    setErroEdicao('')
                  }}
                  className="tw:rounded-lg tw:bg-[#edf0ea] tw:px-5 tw:py-3 tw:text-[12px] tw:font-bold tw:text-[#597064] tw:hover:bg-[#e1e8df] disabled:tw:opacity-50"
                >
                  Cancelar
                </button>
                
                <button
                  type="submit"
                  disabled={salvandoEdicao}
                  className="tw:rounded-lg tw:bg-[#124638] tw:px-5 tw:py-3 tw:text-[12px] tw:font-bold tw:text-white tw:hover:bg-[#1c5a48] disabled:tw:cursor-not-allowed disabled:tw:opacity-60"
                >
                  {salvandoEdicao ? 'Salvando...' : 'Salvar alterações'}
                </button>
                
              </div>
                
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default Pantry
