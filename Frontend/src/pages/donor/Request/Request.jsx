import { useEffect, useState } from 'react'

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
import StatusBadge from '../../../components/layout/StatusBadge/StatusBadge.jsx'
import EmptyState from '../../../components/layout/EmptyState/EmptyState.jsx'
import { apiRequest } from '../../../services/api.js'

const filtros = [
  { valor: 'todas', nome: 'Todas' },
  { valor: 'pendente', nome: 'Pendentes' },
  { valor: 'aceita', nome: 'Reservadas' },
  { valor: 'recusada', nome: 'Recusadas' },
  { valor: 'encerrada', nome: 'Encerradas' },
  { valor: 'concluida', nome: 'Concluídas' }
]

function obterUsuario() {
  try {
    return JSON.parse(localStorage.getItem('usuario') || 'null')
  } catch {
    return null
  }
}

function formatarData(data) {
  if (!data) return 'Data não informada'

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

function imagemDoAlimento(nome) {
  const alimento = String(nome || '').toLowerCase()

  if (alimento.includes('tomate')) return '/icons/tomate.svg'
  if (alimento.includes('arroz')) return '/icons/arroz.svg'
  if (alimento.includes('leite')) return '/icons/leite.svg'
  if (alimento.includes('banana')) return '/icons/banana.svg'

  return '/icons/arroz.svg'
}

function adaptarSolicitacao(item) {
  return {
    id: Number(item.id_solicitacao),
    idDoacao: Number(item.id_doacao),
    instituicao: item.nome_instituicao || 'Instituição não identificada',
    alimento: item.nome || 'Alimento',
    imagem: imagemDoAlimento(item.nome),
    quantidade: formatarQuantidade(item.quantidade, item.unidade),
    data: formatarData(item.criado_em),
    regiao: 'Localização não informada',
    status: item.status,
    categoria: item.categoria
  }
}

async function buscarSolicitacoes(idUsuario) {
  const params = new URLSearchParams({ id_usuario: String(idUsuario) })
  const resultado = await apiRequest(`/api/solicitacoes/doador?${params.toString()}`)

  if (!Array.isArray(resultado)) {
    throw new Error('A API retornou uma lista de solicitações inválida.')
  }

  return resultado.map(adaptarSolicitacao)
}

function Requests() {
  const usuario = obterUsuario()
  const idUsuario = Number(usuario?.id)

  const [solicitacoes, setSolicitacoes] = useState([])
  const [filtro, setFiltro] = useState('todas')
  const [carregando, setCarregando] = useState(true)
  const [processandoId, setProcessandoId] = useState(null)
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    let ativo = true

    async function carregarSolicitacoes() {
      try {
        if (usuario?.tipo_usuario !== 'doador' ||
            !Number.isInteger(idUsuario) ||
            idUsuario <= 0) {
          throw new Error('Entre com uma conta de doador para consultar as solicitações.')
        }

        const resultado = await buscarSolicitacoes(idUsuario)

        if (ativo) {
          setSolicitacoes(resultado)
          setErro('')
        }
      } catch (error) {
        if (ativo) {
          setErro(error.message || 'Não foi possível carregar as solicitações.')
        }
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregarSolicitacoes()

    return () => {
      ativo = false
    }
  }, [idUsuario, usuario?.tipo_usuario])

  async function atualizarSolicitacao(id, acao) {
    setProcessandoId(id)
    setErro('')
    setMensagem('')

    try {
      const resultado = await apiRequest(`/api/solicitacoes/${id}/${acao}`, {
        method: 'PATCH',
        body: JSON.stringify({ id_usuario: idUsuario })
      })

      const listaAtualizada = await buscarSolicitacoes(idUsuario)
      setSolicitacoes(listaAtualizada)
      setMensagem(resultado?.message || 'Solicitação atualizada com sucesso.')
    } catch (error) {
      setErro(error.message || 'Não foi possível atualizar a solicitação.')
    } finally {
      setProcessandoId(null)
    }
  }

  const solicitacoesFiltradas = solicitacoes.filter((solicitacao) => {
    return filtro === 'todas' || solicitacao.status === filtro
  })

  const pendentes = solicitacoes.filter(
    (solicitacao) => solicitacao.status === 'pendente'
  ).length

  const reservadas = solicitacoes.filter(
    (solicitacao) => solicitacao.status === 'aceita'
  ).length

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
              Solicitações recebidas
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

        <div className="tw:pt-[35px] tw:pb-10">

          {erro && (
            <div className="tw:mb-5 tw:rounded-xl tw:border tw:border-[#f0d8d5] tw:bg-[#fff0ee] tw:p-4 tw:text-[11px] tw:text-[#9b5148]">
              {erro}
            </div>
          )}

          {mensagem && (
            <div className="tw:mb-5 tw:rounded-xl tw:border tw:border-[#dcebdd] tw:bg-[#edf6ed] tw:p-4 tw:text-[11px] tw:text-[#477b57]">
              {mensagem}
            </div>
          )}

          {/* TÍTULO */}
          <section className="tw:mb-7">

            <div>
              <span className="tw:text-[10px] tw:font-bold tw:tracking-[1px] tw:text-[#689171]">
                SUA PARTICIPAÇÃO FAZ A DIFERENÇA
              </span>

              <h1 className="tw:my-[9px] tw:text-[29px] tw:font-bold tw:tracking-[-0.7px] tw:text-[#124638]">
                Solicitações recebidas
              </h1>

              <p className="tw:text-[13px] tw:leading-[1.6] tw:text-[#78847b]">
                Acompanhe os pedidos das instituições interessadas
                nos seus alimentos.
              </p>
            </div>

          </section>

          {/* RESUMO */}
          <section className="tw:mb-[25px] tw:grid tw:grid-cols-3 tw:gap-4 tw:max-[1000px]:grid-cols-2 tw:max-[760px]:grid-cols-1">

            {/* TOTAL */}
            <article className="tw:flex tw:items-center tw:gap-[13px] tw:rounded-[11px] tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-[19px]">

              <div className="tw:grid tw:size-[43px] tw:shrink-0 tw:place-items-center tw:rounded-[10px] tw:bg-[#eaf2e8] tw:text-[#477b57]">
                <HeartHandshake size={21} />
              </div>

              <div>
                <span className="tw:block tw:text-[11px] tw:text-[#78847b]">
                  Total de solicitações
                </span>

                <strong className="tw:my-[5px] tw:block tw:text-[24px] tw:text-[#244d39]">
                  {solicitacoes.length}
                </strong>

                <small className="tw:block tw:text-[10px] tw:text-[#9aa29b]">
                  Pedidos recebidos
                </small>
              </div>

            </article>

            {/* PENDENTES */}
            <article className="tw:flex tw:items-center tw:gap-[13px] tw:rounded-[11px] tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-[19px]">

              <div className="tw:grid tw:size-[43px] tw:shrink-0 tw:place-items-center tw:rounded-[10px] tw:bg-[#fff1d8] tw:text-[#c28a37]">
                <Clock3 size={21} />
              </div>

              <div>
                <span className="tw:block tw:text-[11px] tw:text-[#78847b]">
                  Pendentes
                </span>

                <strong className="tw:my-[5px] tw:block tw:text-[24px] tw:text-[#244d39]">
                  {pendentes}
                </strong>

                <small className="tw:block tw:text-[10px] tw:text-[#9aa29b]">
                  Aguardando sua resposta
                </small>
              </div>

            </article>

            {/* RESERVADAS */}
            <article className="tw:flex tw:items-center tw:gap-[13px] tw:rounded-[11px] tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-[19px]">

              <div className="tw:grid tw:size-[43px] tw:shrink-0 tw:place-items-center tw:rounded-[10px] tw:bg-[#e5f1e8] tw:text-[#438358]">
                <CheckCircle2 size={21} />
              </div>

              <div>
                <span className="tw:block tw:text-[11px] tw:text-[#78847b]">
                  Reservadas
                </span>

                <strong className="tw:my-[5px] tw:block tw:text-[24px] tw:text-[#244d39]">
                  {reservadas}
                </strong>

                <small className="tw:block tw:text-[10px] tw:text-[#9aa29b]">
                  Com reserva confirmada
                </small>
              </div>

            </article>

          </section>

          {/* PAINEL */}
          <section className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-6 tw:max-[760px]:p-[17px] tw:max-[400px]:p-[14px]">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-[15px] tw:max-[760px]:items-start tw:max-[760px]:flex-col">

              <div>
                <h2 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
                  Pedidos das instituições
                </h2>

                <p className="tw:mt-[6px] tw:text-[11px] tw:text-[#929b93]">
                  Analise as solicitações antes de confirmar uma reserva.
                </p>
              </div>

              <span className="tw:whitespace-nowrap tw:rounded-full tw:bg-[#eaf2e8] tw:px-[11px] tw:py-[7px] tw:text-[10px] tw:text-[#477b57]">
                {solicitacoesFiltradas.length} registros
              </span>

            </div>

            {/* FILTROS */}
            <div className="tw:flex tw:items-center tw:gap-[9px] tw:overflow-x-auto tw:border-b tw:border-[#edf0e9] tw:py-5">

              {filtros.map((item) => (

                <button
                  key={item.valor}
                  type="button"
                  className={`
                    tw:shrink-0 tw:cursor-pointer
                    tw:rounded-full tw:border
                    tw:px-[14px] tw:py-[9px]
                    tw:text-[10px] tw:transition-colors tw:duration-200
                    ${filtro === item.valor
                      ? 'tw:border-[#124638] tw:bg-[#124638] tw:text-white'
                      : 'tw:border-[#e6eae3] tw:bg-white tw:text-[#718076] tw:hover:bg-[#f1f5ee]'
                    }
                  `}
                  onClick={() => setFiltro(item.valor)}
                >
                  {item.nome}
                </button>

              ))}

            </div>

            {/* SOLICITAÇÕES */}
            <div className="tw:flex tw:flex-col tw:gap-[14px] tw:pt-5">

              {carregando ? (
                <p className="tw:py-8 tw:text-center tw:text-[12px] tw:text-[#78847b]">
                  Carregando solicitações...
                </p>
              ) : solicitacoesFiltradas.map((solicitacao) => (

                <article
                  className="tw:rounded-[10px] tw:border tw:border-[#e9ebe4] tw:p-[19px] tw:max-[400px]:p-[14px]"
                  key={solicitacao.id}
                >

                  {/* INSTITUIÇÃO E STATUS */}
                  <div className="tw:flex tw:items-center tw:justify-between tw:gap-[15px] tw:max-[760px]:items-start tw:max-[760px]:flex-col">

                    <div className="tw:flex tw:min-w-0 tw:items-center tw:gap-[11px]">

                      <div className="tw:grid tw:size-[42px] tw:shrink-0 tw:place-items-center tw:rounded-[10px] tw:bg-[#eaf2e8] tw:text-[#477b57]">
                        <Building2 size={21} />
                      </div>

                      <div className="tw:min-w-0">
                        <strong className="tw:block tw:text-[12px] tw:text-[#344a3c]">
                          {solicitacao.instituicao}
                        </strong>

                        <small className="tw:mt-[5px] tw:block tw:text-[10px] tw:text-[#929b93]">
                          Solicitação enviada em {solicitacao.data}
                        </small>
                      </div>

                    </div>

                      <StatusBadge status={solicitacao.status} />

                  </div>

                  {/* DETALHES */}
                  <div className="tw:mt-[17px] tw:grid tw:grid-cols-2 tw:gap-[18px] tw:border-t tw:border-b tw:border-[#edf0e9] tw:py-[18px] tw:max-[760px]:grid-cols-1 tw:max-[760px]:gap-[17px]">

                    {/* ALIMENTO */}
                    <div className="tw:flex tw:items-center tw:gap-3">

                      <div className="tw:grid tw:size-[52px] tw:shrink-0 tw:place-items-center tw:rounded-[11px] tw:bg-[#edf2e9]">
                        <img
                          src={solicitacao.imagem}
                          alt={solicitacao.alimento}
                          className="tw:size-[37px] tw:object-contain"
                        />
                      </div>

                      <div>
                        <small className="tw:mb-[5px] tw:block tw:text-[9px] tw:text-[#929b93]">
                          ALIMENTO SOLICITADO
                        </small>

                        <strong className="tw:block tw:text-[13px] tw:text-[#344a3c]">
                          {solicitacao.alimento}
                        </strong>

                        <span className="tw:mt-1 tw:block tw:text-[10px] tw:text-[#78847b]">
                          {solicitacao.quantidade}
                        </span>
                      </div>

                    </div>

                    {/* LOCALIZAÇÃO E DATA */}
                    <div className="tw:flex tw:flex-col tw:justify-center tw:gap-3">

                      <div className="tw:flex tw:items-center tw:gap-[9px] tw:text-[11px] tw:text-[#78847b]">
                        <CalendarDays size={16} className="tw:shrink-0 tw:text-[#63896c]" />
                        <span>{solicitacao.data}</span>
                      </div>

                      <div className="tw:flex tw:items-center tw:gap-[9px] tw:text-[11px] tw:text-[#78847b]">
                        <MapPin size={16} className="tw:shrink-0 tw:text-[#63896c]" />
                        <span>{solicitacao.regiao}</span>
                      </div>

                    </div>

                  </div>

                  {/* AÇÕES */}
                  <div className="tw:flex tw:items-center tw:justify-between tw:gap-[15px] tw:pt-[17px] tw:max-[760px]:items-start tw:max-[760px]:flex-col">

                    {solicitacao.status === 'pendente' ? (

                      <>
                        <p className="tw:text-[11px] tw:leading-[1.5] tw:text-[#78847b]">
                          Esta instituição está interessada no seu alimento.
                        </p>

                        <div className="tw:flex tw:items-center tw:gap-[9px] tw:max-[760px]:w-full">

                          <button
                            type="button"
                            className="tw:flex tw:items-center tw:justify-center tw:gap-[7px] tw:cursor-pointer tw:rounded-[7px] tw:border tw:border-[#e9d9d5] tw:bg-white tw:px-[14px] tw:py-[10px] tw:text-[10px] tw:font-bold tw:text-[#a75e53] tw:transition-colors tw:hover:bg-[#fdf1ef] tw:max-[760px]:flex-1 tw:max-[400px]:px-2 tw:max-[400px]:text-[9px]"
                            onClick={() => atualizarSolicitacao(solicitacao.id, 'recusar')}
                            disabled={processandoId !== null}
                          >
                            <X size={16} />
                            {processandoId === solicitacao.id ? 'Processando...' : 'Recusar'}
                          </button>

                          <button
                            type="button"
                            className="tw:flex tw:items-center tw:justify-center tw:gap-[7px] tw:cursor-pointer tw:rounded-[7px] tw:border tw:border-[#124638] tw:bg-[#124638] tw:px-[14px] tw:py-[10px] tw:text-[10px] tw:font-bold tw:text-white tw:transition-colors tw:hover:bg-[#1d624d] tw:max-[760px]:flex-1 tw:max-[400px]:px-2 tw:max-[400px]:text-[9px]"
                            onClick={() => atualizarSolicitacao(solicitacao.id, 'aceitar')}
                            disabled={processandoId !== null}
                          >
                            <Check size={16} />
                            {processandoId === solicitacao.id ? 'Processando...' : 'Aceitar solicitação'}
                          </button>

                        </div>
                      </>

                    ) : solicitacao.status === 'aceita' ? (

                      <div className="tw:flex tw:items-center tw:gap-2 tw:text-[11px] tw:leading-[1.5] tw:text-[#477b57]">
                        <CheckCircle2 size={17} className="tw:shrink-0" />
                        Reserva confirmada. Aguardando a organização da entrega.
                      </div>

                    ) : solicitacao.status === 'recusada' ? (

                      <div className="tw:flex tw:items-center tw:gap-2 tw:text-[11px] tw:leading-[1.5] tw:text-[#b15e51]">
                        <XCircle size={17} className="tw:shrink-0" />
                        Esta solicitação foi recusada.
                      </div>

                    ) : solicitacao.status === 'encerrada' ? (

                      <div className="tw:flex tw:items-center tw:gap-2 tw:text-[11px] tw:leading-[1.5] tw:text-[#78847b]">
                        <XCircle size={17} className="tw:shrink-0" />
                        Outra instituição foi escolhida para esta doação.
                      </div>

                    ) : solicitacao.status === 'concluida' ? (

                      <div className="tw:flex tw:items-center tw:gap-2 tw:text-[11px] tw:leading-[1.5] tw:text-[#477b57]">
                        <CheckCircle2 size={17} className="tw:shrink-0" />
                        Entrega concluída.
                      </div>

                    ) : null}

                  </div>

                </article>

              ))}

              {/* LISTA VAZIA */}
              {!carregando && solicitacoesFiltradas.length === 0 && (

                <EmptyState
                  icon={Package}
                  title="Nenhuma solicitação encontrada"
                  description="Não há pedidos com esse status no momento."
                  variant="donor"
                />
                
              )}

            </div>

          </section>

          {/* INFORMAÇÃO */}
          <section className="tw:mt-5 tw:flex tw:items-start tw:gap-[13px] tw:rounded-[11px] tw:bg-[#eaf1e7] tw:p-5 tw:text-[#477b57] tw:max-[400px]:p-[15px]">

            <HeartHandshake size={24} className="tw:shrink-0" />

            <div>
              <strong className="tw:text-[12px]">
                Você decide antes de confirmar uma doação.
              </strong>

              <p className="tw:mt-[6px] tw:text-[11px] tw:leading-[1.6] tw:text-[#718278]">
                Ao aceitar uma solicitação, o alimento ficará reservado.
                A doação só será considerada concluída após a confirmação
                da entrega.
              </p>
            </div>

          </section>

        </div>

      </main>

    </div>
  )
}

export default Requests
