
import { useEffect, useState } from 'react'

import {
  Package,
  HeartHandshake,
  Plus,
  ArrowUpRight,
  Clock3,
  Leaf
} from 'lucide-react'

import { Link } from 'react-router-dom'

import DonorSidebar from '../../../components/layout/DonorSidebar/DonorSidebar.jsx'
import PageHeader from '../../../components/layout/PageHeader/PageHeader.jsx'
import StatCard from '../../../components/layout/StatCard/StatCard.jsx'
import { apiRequest } from '../../../services/api.js'

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

function diasAteValidade(data) {
  if (!data) return null

  const partes = String(data).slice(0, 10).split('-')

  if (partes.length !== 3) return null

  const [ano, mes, dia] = partes.map(Number)

  const validade = Date.UTC(ano, mes - 1, dia)

  if (!Number.isFinite(validade)) return null

  const hoje = new Date()

  const dataHoje = Date.UTC(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate()
  )

  return Math.round((validade - dataHoje) / 86400000)
}

function formatarQuantidade(quantidade, unidade) {
  const numero = Number(quantidade)

  const valor = Number.isFinite(numero)
    ? new Intl.NumberFormat('pt-BR', {
        maximumFractionDigits: 2
      }).format(numero)
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

function obterValidade(alimento) {
  const dias = diasAteValidade(alimento.validade)

  if (dias === null) {
    return {
      texto: 'Validade não informada',
      classe: 'tw:text-[#59856a]'
    }
  }

  if (dias < 0) {
    return {
      texto: 'Vencido',
      classe: 'tw:text-[#c58a39]'
    }
  }

  if (dias === 0) {
    return {
      texto: 'Vence hoje',
      classe: 'tw:text-[#c58a39]'
    }
  }

  if (dias === 1) {
    return {
      texto: 'Vence amanhã',
      classe: 'tw:text-[#c58a39]'
    }
  }

  if (dias <= 7) {
    return {
      texto: `Vence em ${dias} dias`,
      classe: 'tw:text-[#c58a39]'
    }
  }

  return {
    texto: `Validade: ${formatarData(alimento.validade)}`,
    classe: 'tw:text-[#59856a]'
  }
}

function statusSolicitacao(status) {
  const statusInfo = {
    pendente: {
      nome: 'Pendente',
      classe: 'tw:bg-[#fff1d8] tw:text-[#a97930]'
    },
    aceita: {
      nome: 'Aceita',
      classe: 'tw:bg-[#e3f2e6] tw:text-[#36734a]'
    },
    recusada: {
      nome: 'Recusada',
      classe: 'tw:bg-[#f9e9e7] tw:text-[#a65349]'
    },
    encerrada: {
      nome: 'Encerrada',
      classe: 'tw:bg-[#f0f1ec] tw:text-[#78847b]'
    },
    concluida: {
      nome: 'Concluída',
      classe: 'tw:bg-[#e3f2e6] tw:text-[#36734a]'
    }
  }

  return statusInfo[status] || {
    nome: status || 'Indefinido',
    classe: 'tw:bg-[#f0f1ec] tw:text-[#78847b]'
  }
}

function statusDoacao(status) {
  const statusInfo = {
    disponivel: {
      nome: 'Disponível',
      classe: 'tw:bg-[#e3f2e6] tw:text-[#36734a]'
    },
    reservada: {
      nome: 'Reservada',
      classe: 'tw:bg-[#e4edf7] tw:text-[#436b91]'
    },
    concluida: {
      nome: 'Concluída',
      classe: 'tw:bg-[#e3f2e6] tw:text-[#36734a]'
    },
    cancelada: {
      nome: 'Cancelada',
      classe: 'tw:bg-[#f9e9e7] tw:text-[#a65349]'
    }
  }

  return statusInfo[status] || {
    nome: status || 'Indefinido',
    classe: 'tw:bg-[#f0f1ec] tw:text-[#78847b]'
  }
}

function Dashboard() {
  const [alimentos, setAlimentos] = useState([])
  const [solicitacoes, setSolicitacoes] = useState([])
  const [doacoes, setDoacoes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    let ativo = true

    async function carregarDashboard() {
      try {
        const usuario = obterUsuario()
        const idUsuario = Number(usuario?.id)

        if (
          usuario?.tipo_usuario !== 'doador' ||
          !Number.isInteger(idUsuario) ||
          idUsuario <= 0
        ) {
          throw new Error('Entre com uma conta de doador para visualizar o painel.')
        }

        const params = new URLSearchParams({
          id_usuario: String(idUsuario)
        })

        const [listaAlimentos, listaSolicitacoes, listaDoacoes] =
          await Promise.all([
            apiRequest(`/api/alimentos?${params.toString()}`),
            apiRequest(`/api/solicitacoes/doador?${params.toString()}`),
            apiRequest(`/api/doacoes/doador?${params.toString()}`)
          ])

        if (
          !Array.isArray(listaAlimentos) ||
          !Array.isArray(listaSolicitacoes) ||
          !Array.isArray(listaDoacoes)
        ) {
          throw new Error('Não foi possível carregar os dados do painel.')
        }

        if (ativo) {
          setAlimentos(listaAlimentos)
          setSolicitacoes(listaSolicitacoes)
          setDoacoes(listaDoacoes)
          setErro('')
        }
      } catch (error) {
        if (ativo) {
          setErro(error.message || 'Não foi possível carregar a visão geral.')
        }
      } finally {
        if (ativo) {
          setCarregando(false)
        }
      }
    }

    carregarDashboard()

    return () => {
      ativo = false
    }
  }, [])

  const alimentosProximosValidade = alimentos.filter((alimento) => {
    const dias = diasAteValidade(alimento.validade)

    return dias !== null && dias >= 0 && dias <= 7
  }).length

  const doacoesAtivas = doacoes.filter((doacao) => (
    doacao.status === 'disponivel' ||
    doacao.status === 'reservada'
  )).length

  const alimentosRecentes = alimentos.slice(0, 3)
  const solicitacoesRecentes = solicitacoes.slice(0, 3)
  const doacoesRecentes = doacoes.slice(0, 2)

  return (
    <div className="tw:flex tw:min-h-screen tw:bg-[#f7f6ef] tw:max-[760px]:flex-col">

      {/* MENU LATERAL */}
      <DonorSidebar />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="tw:min-w-0 tw:flex-1 tw:px-[45px] tw:pb-[35px] tw:max-[1100px]:px-[25px] tw:max-[1100px]:pb-[30px] tw:max-[760px]:px-[18px] tw:max-[760px]:pb-[25px]">

        <PageHeader currentPage="Visão geral" />

        {erro && (
          <div className="tw:mt-5 tw:rounded-xl tw:border tw:border-[#f0d8d5] tw:bg-[#fff0ee] tw:p-4 tw:text-[11px] tw:text-[#9b5148]">
            {erro}
          </div>
        )}

        {/* BOAS-VINDAS */}
        <section className="tw:flex tw:items-center tw:justify-between tw:gap-5 tw:py-[35px] tw:max-[760px]:flex-col tw:max-[760px]:items-start">

          <div>
            <span className="tw:text-[10px] tw:font-bold tw:tracking-[1px] tw:text-[#689171]">
              SEU ESPAÇO NO REDEPRATOS
            </span>

            <h1 className="tw:my-[9px] tw:text-[30px] tw:font-bold tw:tracking-[-0.7px] tw:text-[#124638]">
              Olá, bem-vindo!
            </h1>

            <p className="tw:text-[13px] tw:text-[#78847b]">
              Veja como estão seus alimentos e acompanhe suas doações.
            </p>
          </div>

        </section>

        {/* INDICADORES */}
        <section className="tw:mb-[25px] tw:grid tw:grid-cols-3 tw:gap-[17px] tw:max-[760px]:grid-cols-1">

          <StatCard
            title="Alimentos cadastrados"
            value={carregando ? '—' : alimentos.length.toString().padStart(2, '0')}
            description="Na sua despensa"
            icon={Package}
            iconColor="tw:text-[#528463]"
          />

          <StatCard
            title="Próximos da validade"
            value={carregando ? '—' : alimentosProximosValidade.toString().padStart(2, '0')}
            description="Precisam da sua atenção"
            icon={Clock3}
            iconColor="tw:text-[#d39746]"
          />

          <StatCard
            title="Doações ativas"
            value={carregando ? '—' : doacoesAtivas.toString().padStart(2, '0')}
            description="Alimentos disponibilizados"
            icon={HeartHandshake}
            iconColor="tw:text-[#528463]"
          />

        </section>

        {/* PAINÉIS PRINCIPAIS */}
        <div className="tw:grid tw:grid-cols-[1.4fr_1fr] tw:gap-[18px] tw:max-[1100px]:grid-cols-1">

          {/* DESPENSA */}
          <section
            className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-[23px]"
            id="alimentos"
          >

            <div className="tw:mb-5 tw:flex tw:items-start tw:justify-between tw:gap-[10px] tw:max-[450px]:flex-col">

              <div>
                <h2 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
                  Minha despensa
                </h2>
                <p className="tw:mt-[6px] tw:text-[11px] tw:text-[#929b93]">
                  Seus alimentos cadastrados.
                </p>
              </div>

              <Link
                to="/doador/alimentos"
                className="tw:flex tw:items-center tw:gap-[5px] tw:text-[11px] tw:font-bold tw:text-[#4d815e]"
              >
                Ver todos
                <ArrowUpRight size={16} />
              </Link>

            </div>

            <div className="tw:flex tw:flex-col">

              {carregando ? (
                <p className="tw:py-5 tw:text-center tw:text-[11px] tw:text-[#929b93]">
                  Carregando alimentos...
                </p>
              ) : alimentosRecentes.length > 0 ? (

                alimentosRecentes.map((alimento) => {
                  const validade = obterValidade(alimento)

                  return (
                    <div
                      className="tw:flex tw:items-center tw:gap-3 tw:border-t tw:border-[#f0f1ec] tw:py-[14px] tw:max-[450px]:flex-wrap"
                      key={alimento.id}
                    >

                      <div className="tw:grid tw:size-[43px] tw:shrink-0 tw:place-items-center tw:rounded-[10px] tw:bg-[#edf2e9]">
                        <img
                          src={imagemDoAlimento(alimento.nome)}
                          alt={alimento.nome}
                          className="tw:size-[31px] tw:object-contain"
                        />
                      </div>

                      <div className="tw:min-w-0 tw:flex-1">
                        <strong className="tw:block tw:text-[12px] tw:text-[#344a3c]">
                          {alimento.nome}
                        </strong>
                        <small className="tw:mt-[5px] tw:block tw:text-[10px] tw:text-[#929b93]">
                          {formatarQuantidade(alimento.quantidade, alimento.unidade)}
                        </small>
                      </div>

                      <div className={`tw:whitespace-nowrap tw:text-[10px] tw:max-[450px]:ml-auto ${validade.classe}`}>
                        {validade.texto}
                      </div>

                    </div>
                  )
                })

              ) : (
                <p className="tw:border-t tw:border-[#f0f1ec] tw:py-5 tw:text-center tw:text-[11px] tw:text-[#929b93]">
                  Você ainda não cadastrou alimentos.
                </p>
              )}

            </div>

            <Link
              to="/doador/alimentos/novo"
              className="tw:mt-[7px] tw:flex tw:items-center tw:justify-center tw:gap-[7px] tw:border-t tw:border-[#f0f1ec] tw:pt-[15px] tw:text-[12px] tw:font-bold tw:text-[#477b57]"
            >
              <Plus size={17} />
              Adicionar alimento
            </Link>

          </section>

          {/* COLUNA LATERAL */}
          <div className="tw:flex tw:flex-col tw:gap-[18px]">

            {/* ATENÇÃO */}
            <section className="tw:flex tw:items-start tw:gap-[13px] tw:rounded-xl tw:border tw:border-[#f1e7d2] tw:bg-[#fff6e8] tw:p-[19px]">

              <div className="tw:text-[#c28a37]">
                <Clock3 size={21} />
              </div>

              <div>
                <strong className="tw:text-[12px] tw:text-[#775c31]">
                  Fique de olho na validade!
                </strong>

                <p className="tw:mt-[7px] tw:text-[11px] tw:leading-[1.6] tw:text-[#927a53]">
                  {alimentosProximosValidade > 0
                    ? `Você tem ${alimentosProximosValidade} alimento(s) próximo(s) do vencimento. Aproveite antes que estraguem.`
                    : 'Seus alimentos não possuem vencimentos nos próximos 7 dias.'}
                </p>
              </div>

            </section>

            {/* SOLICITAÇÕES */}
            <section
              className="tw:min-w-0 tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-[23px]"
              id="solicitacoes"
            >

              <div className="tw:mb-5 tw:flex tw:items-start tw:justify-between tw:gap-[10px] tw:max-[450px]:flex-col">

                <div>
                  <h2 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
                    Solicitações recentes
                  </h2>
                  <p className="tw:mt-[6px] tw:text-[11px] tw:text-[#929b93]">
                    Pedidos das instituições.
                  </p>
                </div>

                <Link
                  to="/doador/solicitacoes"
                  aria-label="Ver solicitações"
                  className="tw:flex tw:items-center tw:justify-center tw:gap-[7px] tw:rounded-full tw:text-[#4d815e]"
                >
                  <ArrowUpRight size={17} />
                </Link>

              </div>

              <div className="tw:flex tw:flex-col">

                {carregando ? (
                  <p className="tw:border-t tw:border-[#f0f1ec] tw:py-5 tw:text-center tw:text-[11px] tw:text-[#929b93]">
                    Carregando solicitações...
                  </p>
                ) : solicitacoesRecentes.length > 0 ? (

                  solicitacoesRecentes.map((solicitacao) => {
                    const status = statusSolicitacao(solicitacao.status)

                    return (
                      <div
                        key={solicitacao.id_solicitacao}
                        className="tw:flex tw:items-center tw:gap-[10px] tw:border-t tw:border-[#f0f1ec] tw:py-[15px]"
                      >

                        <div className="tw:grid tw:size-[38px] tw:shrink-0 tw:place-items-center tw:rounded-full tw:bg-[#eaf2e8] tw:text-[#477b57]">
                          <HeartHandshake size={20} />
                        </div>

                        <div className="tw:min-w-0 tw:flex-1">
                          <strong className="tw:block tw:text-[11px] tw:text-[#354b3e]">
                            {solicitacao.nome_instituicao || 'Instituição'}
                          </strong>

                          <small className="tw:mt-[5px] tw:block tw:text-[10px] tw:text-[#939b94]">
                            Solicitou {solicitacao.nome || 'um alimento'}
                          </small>
                        </div>

                        <span className={`tw:whitespace-nowrap tw:rounded-full tw:px-2 tw:py-1.5 tw:text-[9px] ${status.classe}`}>
                          {status.nome}
                        </span>

                      </div>
                    )
                  })

                ) : (
                  <p className="tw:border-t tw:border-[#f0f1ec] tw:py-5 tw:text-center tw:text-[11px] tw:text-[#929b93]">
                    Você ainda não recebeu solicitações.
                  </p>
                )}

              </div>

              <Link
                to="/doador/solicitacoes"
                className="tw:block tw:border-t tw:border-[#f0f1ec] tw:pt-[14px] tw:text-center tw:text-[11px] tw:font-bold tw:text-[#477b57]"
              >
                Ver solicitações
              </Link>

            </section>

          </div>

        </div>

        {/* DOAÇÕES */}
        <section
          className="tw:mt-5 tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-[23px]"
          id="doacoes"
        >

          <div className="tw:mb-5 tw:flex tw:items-start tw:justify-between tw:gap-[10px] tw:max-[450px]:flex-col">

            <div>
              <h2 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
                Minhas doações
              </h2>
              <p className="tw:mt-[6px] tw:text-[11px] tw:text-[#929b93]">
                Acompanhe os alimentos que você disponibilizou.
              </p>
            </div>

            <Link
              to="/doador/minhas-doacoes"
              className="tw:flex tw:items-center tw:gap-[5px] tw:text-[11px] tw:font-bold tw:text-[#4d815e]"
            >
              Ver todas
              <ArrowUpRight size={16} />
            </Link>

          </div>

          <div className="tw:flex tw:flex-col tw:gap-3">

            {carregando ? (
              <p className="tw:py-5 tw:text-center tw:text-[11px] tw:text-[#929b93]">
                Carregando doações...
              </p>
            ) : doacoesRecentes.length > 0 ? (

              doacoesRecentes.map((doacao) => {
                const status = statusDoacao(doacao.status)

                return (
                  <div
                    key={doacao.id}
                    className="tw:flex tw:items-center tw:gap-[13px] tw:rounded-[9px] tw:bg-[#f8f9f5] tw:p-[13px]"
                  >

                    <div className="tw:grid tw:size-[42px] tw:shrink-0 tw:place-items-center tw:rounded-[9px] tw:bg-[#eaf1e7]">
                      <img
                        src={imagemDoAlimento(doacao.nome)}
                        alt={doacao.nome}
                        className="tw:size-[30px] tw:object-contain"
                      />
                    </div>

                    <div className="tw:min-w-0 tw:flex-1">
                      <strong className="tw:block tw:text-[12px]">
                        {doacao.nome}
                      </strong>

                      <small className="tw:mt-[5px] tw:block tw:text-[10px] tw:text-[#929b93]">
                        {formatarQuantidade(doacao.quantidade, doacao.unidade)} disponibilizados
                      </small>
                    </div>

                    <span className={`tw:whitespace-nowrap tw:rounded-full tw:px-[10px] tw:py-[7px] tw:text-[10px] ${status.classe}`}>
                      {status.nome}
                    </span>

                  </div>
                )
              })

            ) : (
              <p className="tw:rounded-[9px] tw:bg-[#f8f9f5] tw:p-5 tw:text-center tw:text-[11px] tw:text-[#929b93]">
                Você ainda não publicou nenhuma doação.
              </p>
            )}

          </div>

        </section>

        {/* IMPACTO */}
        <section
          className="tw:mt-5 tw:flex tw:items-center tw:justify-between tw:gap-[15px] tw:rounded-xl tw:bg-[#e8f0e5] tw:p-[21px] tw:text-[#315c43]"
          id="impacto"
        >

          <div className="tw:flex tw:items-center tw:gap-[14px]">

            <Leaf size={25} className="tw:shrink-0" />

            <div>
              <h2 className="tw:text-[13px] tw:font-bold">
                Seu impacto começa com pequenas ações.
              </h2>
              <p className="tw:mt-[5px] tw:text-[10px] tw:leading-[1.5] tw:text-[#6d8373]">
                Continue aproveitando seus alimentos e contribuindo
                para reduzir o desperdício.
              </p>
            </div>

          </div>

          <Link to="/doador/meu-impacto">
            <ArrowUpRight size={21} className="tw:shrink-0" />
          </Link>

        </section>

      </main>
    </div>
  )
}

export default Dashboard
