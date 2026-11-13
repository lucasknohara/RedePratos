import { useEffect, useState } from 'react'

import {
  Bell,
  Search,
  ClipboardList,
  Package,
  MapPin,
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  HandHeart
} from 'lucide-react'

import { Link } from 'react-router-dom'

import InstitutionSidebar from '../../../components/layout/InstitutionSidebar/InstitutionSidebar.jsx'
import StatusBadge from '../../../components/layout/StatusBadge/StatusBadge.jsx'
import SearchInput from '../../../components/layout/SearchInput/SearchInput.jsx'
import EmptyState from '../../../components/layout/EmptyState/EmptyState.jsx'
import { apiRequest } from '../../../services/api.js'

const filtros = [
  { valor: 'todas', label: 'Todas' },
  { valor: 'pendente', label: 'Pendentes' },
  { valor: 'aceita', label: 'Confirmadas' },
  { valor: 'recusada', label: 'Recusadas' },
  { valor: 'encerrada', label: 'Encerradas' },
  { valor: 'concluida', label: 'Concluídas' }
]

const statusConfig = {
  pendente: {
    label: 'Pendente',
    descricao: 'Aguardando resposta do doador.',
    icone: Clock3
  },
  aceita: {
    label: 'Reserva confirmada',
    descricao: 'O doador aceitou sua solicitação. Combine a retirada e confirme o recebimento quando o alimento chegar.',
    icone: CheckCircle2
  },
  recusada: {
    label: 'Recusada',
    descricao: 'O doador não conseguiu atender ao pedido.',
    icone: XCircle
  },
  encerrada: {
    label: 'Encerrada',
    descricao: 'Outra instituição foi escolhida para receber esta doação.',
    icone: XCircle
  },
  concluida: {
    label: 'Concluída',
    descricao: 'A entrega foi confirmada pelo doador e pela instituição.',
    icone: CheckCircle2
  }
}

function obterUsuario() {
  try {
    return JSON.parse(localStorage.getItem('usuario') || 'null')
  } catch {
    return null
  }
}

function formatarData(data) {
  if (!data) return 'Não informada'

  const valor = String(data).slice(0, 10)
  const partes = valor.split('-')

  if (partes.length === 3 && partes[0].length === 4) {
    return `${partes[2]}/${partes[1]}/${partes[0]}`
  }

  return valor
}

function formatarQuantidade(quantidade, unidade) {
  const numero = Number(quantidade)
  const valor = Number.isFinite(numero)
    ? new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(numero)
    : quantidade

  return [valor, unidade].filter(Boolean).join(' ')
}

function adaptarSolicitacao(item) {
  return {
    id: Number(item.id_solicitacao),
    alimento: item.nome || 'Alimento não identificado',
    categoria: item.categoria || 'Outros',
    quantidade: formatarQuantidade(item.quantidade, item.unidade),
    origem: item.origem || 'Não informada',
    doador: item.nome_doador || 'Doador não identificado',
    validade: formatarData(item.validade),
    dataSolicitacao: formatarData(item.criado_em),
    status: item.status,
    confirmacaoDoador: Boolean(item.confirmacao_doador),
    confirmacaoInstituicao: Boolean(item.confirmacao_instituicao)
  }
}

async function buscarSolicitacoes(idInstituicao) {
  const consulta = new URLSearchParams({
    id_instituicao: String(idInstituicao)
  })

  const resultado = await apiRequest(
    `/api/solicitacoes/instituicao?${consulta.toString()}`
  )

  if (!Array.isArray(resultado)) {
    throw new Error('A API retornou uma lista de solicitações inválida.')
  }

  return resultado.map(adaptarSolicitacao)
}

function Requests() {
  const usuario = obterUsuario()
  const idInstituicao = Number(usuario?.id)
  const tipoUsuario = usuario?.tipo_usuario

  const [solicitacoes, setSolicitacoes] = useState([])
  const [filtroAtivo, setFiltroAtivo] = useState('todas')
  const [busca, setBusca] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [processandoId, setProcessandoId] = useState(null)
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    let ativo = true

    async function carregarSolicitacoes() {
      try {
        if (
          tipoUsuario !== 'instituicao' ||
          !Number.isInteger(idInstituicao) ||
          idInstituicao <= 0
        ) {
          throw new Error('Entre com uma conta de instituição para consultar suas solicitações.')
        }

        const resultado = await buscarSolicitacoes(idInstituicao)

        if (ativo) {
          setSolicitacoes(resultado)
          setErro('')
        }
      } catch (error) {
        if (ativo) {
          setErro(error.message || 'Não foi possível carregar suas solicitações.')
        }
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregarSolicitacoes()

    return () => {
      ativo = false
    }
  }, [idInstituicao, tipoUsuario])

  async function confirmarEntrega(id) {
    setProcessandoId(id)
    setErro('')
    setMensagem('')

    try {
      const resultado = await apiRequest(`/api/solicitacoes/${id}/confirmar-entrega`, {
        method: 'PATCH',
        body: JSON.stringify({ id_usuario: idInstituicao })
      })

      const listaAtualizada = await buscarSolicitacoes(idInstituicao)
      setSolicitacoes(listaAtualizada)
      setMensagem(resultado?.message || 'Confirmação registrada com sucesso.')
    } catch (error) {
      setErro(error.message || 'Não foi possível confirmar o recebimento.')
    } finally {
      setProcessandoId(null)
    }
  }

  const totalPendentes = solicitacoes.filter(
    (item) => item.status === 'pendente'
  ).length

  const totalConfirmadas = solicitacoes.filter(
    (item) => item.status === 'aceita'
  ).length

  const totalRecusadas = solicitacoes.filter(
    (item) => item.status === 'recusada'
  ).length

  const solicitacoesFiltradas = solicitacoes.filter((item) => {
    const termoBusca = busca.toLowerCase().trim()

    const correspondeBusca =
      item.alimento.toLowerCase().includes(termoBusca) ||
      item.categoria.toLowerCase().includes(termoBusca) ||
      item.doador.toLowerCase().includes(termoBusca) ||
      item.origem.toLowerCase().includes(termoBusca)

    const correspondeStatus =
      filtroAtivo === 'todas' || item.status === filtroAtivo

    return correspondeBusca && correspondeStatus
  })

  function limparFiltros() {
    setBusca('')
    setFiltroAtivo('todas')
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
              Minhas solicitações
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

        {erro && (
          <div className="tw:mt-5 tw:rounded-xl tw:border tw:border-[#f0d8d5] tw:bg-[#fff0ee] tw:p-4 tw:text-[11px] tw:text-[#9b5148]">
            {erro}
          </div>
        )}

        {mensagem && (
          <div className="tw:mt-5 tw:rounded-xl tw:border tw:border-[#dcebdd] tw:bg-[#edf6ed] tw:p-4 tw:text-[11px] tw:text-[#477b57]">
            {mensagem}
          </div>
        )}

        {/* APRESENTAÇÃO */}
        <section className="tw:flex tw:items-center tw:justify-between tw:gap-5 tw:py-[35px] tw:max-[650px]:flex-col tw:max-[650px]:items-start">

          <div>
            <span className="tw:text-[10px] tw:font-bold tw:tracking-[1px] tw:text-[#689171]">
              ACOMPANHE SEUS PEDIDOS
            </span>

            <h1 className="tw:my-[9px] tw:text-[30px] tw:font-bold tw:tracking-[-0.7px] tw:text-[#124638]">
              Minhas solicitações
            </h1>

            <p className="tw:text-[13px] tw:text-[#78847b]">
              Acompanhe as respostas dos doadores e suas reservas.
            </p>
          </div>

          <Link
            to="/instituicao/doacoes"
            className="tw:flex tw:shrink-0 tw:items-center tw:gap-2 tw:rounded-lg tw:bg-[#52745B] tw:px-4 tw:py-3 tw:text-[12px] tw:font-semibold tw:text-white tw:transition-colors tw:hover:bg-[#3D6047]"
          >
            <Search size={16} />
            Explorar doações
          </Link>

        </section>

        {/* INDICADORES */}
        <section className="tw:mb-[25px] tw:grid tw:grid-cols-3 tw:gap-[17px] tw:max-[760px]:grid-cols-1">

          <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
              <span>Aguardando resposta</span>
              <Clock3 size={21} className="tw:text-[#d39746]" />
            </div>

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
              {totalPendentes.toString().padStart(2, '0')}
            </strong>

            <small className="tw:text-[10px] tw:text-[#8c978e]">
              Solicitações pendentes
            </small>

          </article>

          <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
              <span>Reservas confirmadas</span>
              <CheckCircle2 size={21} className="tw:text-[#528463]" />
            </div>

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
              {totalConfirmadas.toString().padStart(2, '0')}
            </strong>

            <small className="tw:text-[10px] tw:text-[#8c978e]">
              Aceitas pelos doadores
            </small>

          </article>

          <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
              <span>Solicitações recusadas</span>
              <XCircle size={21} className="tw:text-[#c77b72]" />
            </div>

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
              {totalRecusadas.toString().padStart(2, '0')}
            </strong>

            <small className="tw:text-[10px] tw:text-[#8c978e]">
              Não atendidas pelos doadores
            </small>

          </article>

        </section>

        {/* BUSCA E FILTROS */}
        <section className="tw:mb-[22px] tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5">

          <div className="tw:mb-4 tw:flex tw:items-center tw:gap-2">
            <ClipboardList size={18} className="tw:text-[#528463]" />

            <h2 className="tw:text-[13px] tw:font-bold tw:text-[#244d39]">
              Consulte seus pedidos
            </h2>
          </div>

          <SearchInput
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            placeholder="Buscar por alimento, categoria ou doador..."
            ariaLabel="Buscar solicitações"
          />

          <div className="tw:mt-5 tw:flex tw:flex-wrap tw:items-center tw:gap-2">

            {filtros.map((filtro) => (
              <button
                key={filtro.valor}
                type="button"
                onClick={() => setFiltroAtivo(filtro.valor)}
                className={`tw:cursor-pointer tw:appearance-none tw:rounded-full tw:border tw:px-4 tw:py-2 tw:text-[11px] tw:font-semibold tw:transition-colors ${
                  filtroAtivo === filtro.valor
                    ? 'tw:border-[#52745B] tw:bg-[#52745B] tw:text-white'
                    : 'tw:border-[#DDE3D9] tw:bg-white tw:text-[#748278] hover:tw:bg-[#f0f4ed] hover:tw:text-[#315c43]'
                }`}
              >
                {filtro.label}
              </button>
            ))}

            {(busca || filtroAtivo !== 'todas') && (
              <button
                type="button"
                onClick={limparFiltros}
                className="tw:ml-auto tw:inline-flex tw:cursor-pointer tw:appearance-none tw:items-center tw:gap-1.5 tw:rounded-full tw:border-0 tw:bg-[#eaf2e8] tw:px-3 tw:py-2 tw:text-[11px] tw:font-semibold tw:text-[#477b57] tw:shadow-none tw:transition-colors hover:tw:bg-[#dcebd9] hover:tw:text-[#315c43]"
              >
                Limpar filtros
              </button>
            )}

          </div>

        </section>

        {/* LISTA DE SOLICITAÇÕES */}
        <section>

          <div className="tw:mb-4">
            <h2 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
              Histórico de solicitações
            </h2>

            <p className="tw:mt-1 tw:text-[11px] tw:text-[#929b93]">
              {solicitacoesFiltradas.length} pedido(s) encontrado(s)
            </p>
          </div>

          {carregando ? (

            <div className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-6 tw:text-center tw:text-[12px] tw:text-[#78847b]">
              Carregando suas solicitações...
            </div>

          ) : erro ? (

            <div className="tw:rounded-xl tw:border tw:border-[#f0d8d5] tw:bg-[#fff0ee] tw:p-5 tw:text-[12px] tw:text-[#9b5148]">
              {erro}
            </div>

          ) : solicitacoesFiltradas.length > 0 ? (

            <div className="tw:flex tw:flex-col tw:gap-4">

              {solicitacoesFiltradas.map((solicitacao) => {
                const status = statusConfig[solicitacao.status]
                const IconeStatus = status.icone

                return (
                  <article
                    key={solicitacao.id}
                    className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:transition-shadow tw:hover:shadow-sm"
                  >

                    {/* INFORMAÇÕES PRINCIPAIS */}
                    <div className="tw:flex tw:items-start tw:justify-between tw:gap-4 tw:max-[550px]:flex-col">

                      <div className="tw:flex tw:min-w-0 tw:items-center tw:gap-4">

                        <div className="tw:grid tw:size-[52px] tw:shrink-0 tw:place-items-center tw:rounded-xl tw:bg-[#edf2e9] tw:text-[#528463]">
                          <Package size={25} />
                        </div>

                        <div className="tw:min-w-0">

                          <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
                            <h3 className="tw:text-[15px] tw:font-bold tw:text-[#244d39]">
                              {solicitacao.alimento}
                            </h3>

                            <span className="tw:rounded-full tw:bg-[#f0f3ed] tw:px-2 tw:py-1 tw:text-[9px] tw:text-[#748278]">
                              {solicitacao.categoria}
                            </span>
                          </div>

                          <p className="tw:mt-1 tw:text-[11px] tw:text-[#78847b]">
                            Quantidade solicitada: <strong>{solicitacao.quantidade}</strong>
                          </p>

                          <p className="tw:mt-1 tw:text-[10px] tw:text-[#929b93]">
                            Pedido enviado em {solicitacao.dataSolicitacao}
                          </p>

                        </div>

                      </div>

                        <StatusBadge
                          status={solicitacao.status}
                          label={status.label}
                          icon={IconeStatus}
                          size="institution"
                          variant={
                            solicitacao.status === 'aceita'
                              ? 'institution-reserved'
                              : solicitacao.status === 'recusada'
                                ? 'institution-rejected'
                                : undefined
                          }
                        />

                    </div>

                    {/* DETALHES */}
                    <div className="tw:mt-5 tw:grid tw:grid-cols-3 tw:gap-4 tw:border-t tw:border-[#f0f1ec] tw:pt-4 tw:max-[550px]:grid-cols-1">

                      <div className="tw:flex tw:items-center tw:gap-2">
                        <MapPin size={16} className="tw:shrink-0 tw:text-[#528463]" />

                        <div>
                          <small className="tw:block tw:text-[9px] tw:text-[#929b93]">
                            Doador
                          </small>

                          <span className="tw:text-[10px] tw:font-semibold tw:text-[#65746a]">
                            {solicitacao.doador}
                          </span>
                        </div>
                      </div>

                      <div className="tw:flex tw:items-center tw:gap-2">
                        <CalendarDays size={16} className="tw:shrink-0 tw:text-[#d39746]" />

                        <div>
                          <small className="tw:block tw:text-[9px] tw:text-[#929b93]">
                            Validade
                          </small>

                          <span className="tw:text-[10px] tw:font-semibold tw:text-[#65746a]">
                            {solicitacao.validade}
                          </span>
                        </div>
                      </div>

                      <div className="tw:flex tw:items-center tw:gap-2">
                        <HandHeart size={16} className="tw:shrink-0 tw:text-[#528463]" />

                        <div>
                          <small className="tw:block tw:text-[9px] tw:text-[#929b93]">
                            Origem
                          </small>

                          <span className="tw:text-[10px] tw:font-semibold tw:text-[#65746a]">
                            {solicitacao.origem}
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* SITUAÇÃO DO PEDIDO */}
                    <div className="tw:mt-4 tw:rounded-lg tw:bg-[#f8f9f5] tw:px-4 tw:py-3">

                      <div className="tw:flex tw:items-center tw:gap-2">
                        <IconeStatus
                          size={15}
                          className="tw:shrink-0 tw:text-[#748278]"
                        />

                        <p className="tw:text-[11px] tw:text-[#748278]">
                          {status.descricao}
                        </p>
                      </div>

                    </div>

                    {solicitacao.status === 'aceita' && (
                      <div className="tw:mt-4 tw:flex tw:items-center tw:justify-between tw:gap-4 tw:max-[550px]:flex-col tw:max-[550px]:items-start">
                        <p className="tw:text-[11px] tw:leading-[1.5] tw:text-[#477b57]">
                          {solicitacao.confirmacaoInstituicao
                            ? 'Você confirmou o recebimento. Aguardando o doador.'
                            : solicitacao.confirmacaoDoador
                              ? 'O doador já confirmou a entrega. Confirme o recebimento para concluir.'
                              : 'Quando receber o alimento, confirme o recebimento.'}
                        </p>

                        {!solicitacao.confirmacaoInstituicao && (
                          <button
                            type="button"
                            onClick={() => confirmarEntrega(solicitacao.id)}
                            disabled={processandoId !== null}
                            className="tw:flex tw:shrink-0 tw:items-center tw:justify-center tw:gap-2 tw:cursor-pointer tw:rounded-lg tw:bg-[#52745B] tw:px-4 tw:py-2.5 tw:text-[11px] tw:font-semibold tw:text-white tw:transition-colors hover:tw:bg-[#3D6047] disabled:tw:cursor-not-allowed disabled:tw:opacity-60 tw:max-[550px]:w-full"
                          >
                            <CheckCircle2 size={16} />
                            {processandoId === solicitacao.id ? 'Processando...' : 'Confirmar recebimento'}
                          </button>
                        )}
                      </div>
                    )}

                  </article>
                )
              })}

            </div>

          ) : (

            /* ESTADO VAZIO */
            <EmptyState
              icon={ClipboardList}
              title="Nenhuma solicitação encontrada"
              description="Não encontramos pedidos com esses filtros. Você pode tentar outra busca ou explorar novas doações."
              actionLabel="Limpar filtros"
              onAction={limparFiltros}
            />

          )}

        </section>

        {/* ORIENTAÇÃO */}
        <section className="tw:mt-5 tw:flex tw:items-start tw:gap-3 tw:rounded-xl tw:border tw:border-[#f1e7d2] tw:bg-[#fff6e8] tw:p-5">

          <Clock3 size={21} className="tw:mt-0.5 tw:shrink-0 tw:text-[#c28a37]" />

          <div>
            <h2 className="tw:text-[12px] tw:font-bold tw:text-[#775c31]">
              Acompanhe suas solicitações
            </h2>

            <p className="tw:mt-1 tw:text-[10px] tw:leading-[1.6] tw:text-[#927a53]">
              Uma solicitação pendente depende da resposta do doador.
              Quando ele aceitar, a reserva será confirmada.
              A doação só será considerada concluída após a confirmação da entrega.
            </p>
          </div>

        </section>

      </main>
    </div>
  )
}

export default Requests
