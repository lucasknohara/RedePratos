
import { useEffect, useState } from 'react'

import {
  Search,
  Package,
  CheckCircle2,
  Clock3,
  MapPin,
  ArrowUpRight,
  HeartHandshake
} from 'lucide-react'

import { Link } from 'react-router-dom'

import InstitutionSidebar from '../../../components/layout/InstitutionSidebar/InstitutionSidebar.jsx'
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

function obterStatus(status) {
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

function InstitutionDashboard() {
  const [doacoes, setDoacoes] = useState([])
  const [solicitacoes, setSolicitacoes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    let ativo = true

    async function carregarDashboard() {
      try {
        const usuario = obterUsuario()
        const idInstituicao = Number(usuario?.id)

        if (
          usuario?.tipo_usuario !== 'instituicao' ||
          !Number.isInteger(idInstituicao) ||
          idInstituicao <= 0
        ) {
          throw new Error(
            'Entre com uma conta de instituição para visualizar o painel.'
          )
        }

        const paramsDoacoes = new URLSearchParams({
          id_usuario: String(idInstituicao)
        })

        const paramsSolicitacoes = new URLSearchParams({
          id_instituicao: String(idInstituicao)
        })

        const [listaDoacoes, listaSolicitacoes] = await Promise.all([
          apiRequest(`/api/doacoes?${paramsDoacoes.toString()}`),
          apiRequest(`/api/solicitacoes/instituicao?${paramsSolicitacoes.toString()}`)
        ])

        if (
          !Array.isArray(listaDoacoes) ||
          !Array.isArray(listaSolicitacoes)
        ) {
          throw new Error('Não foi possível carregar os dados do painel.')
        }

        if (ativo) {
          setDoacoes(listaDoacoes)
          setSolicitacoes(listaSolicitacoes)
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

  const solicitacoesPendentes = solicitacoes.filter(
    (solicitacao) => solicitacao.status === 'pendente'
  ).length

  const reservasConfirmadas = solicitacoes.filter(
    (solicitacao) => solicitacao.status === 'aceita'
  ).length

  const doacoesRecentes = doacoes.slice(0, 3)
  const solicitacoesRecentes = solicitacoes.slice(0, 3)

  return (
    <div className="tw:flex tw:min-h-screen tw:bg-[#f7f6ef] tw:max-[760px]:flex-col">

      {/* MENU LATERAL */}
      <InstitutionSidebar />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="tw:min-w-0 tw:flex-1 tw:px-[45px] tw:pb-[35px] tw:max-[1100px]:px-[25px] tw:max-[1100px]:pb-[30px] tw:max-[760px]:px-[18px] tw:max-[760px]:pb-[25px]">

        {/* CABEÇALHO */}
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
              ÁREA DA INSTITUIÇÃO
            </span>

            <h1 className="tw:my-[9px] tw:text-[30px] tw:font-bold tw:tracking-[-0.7px] tw:text-[#124638]">
              Olá, seja bem-vinda!
            </h1>

            <p className="tw:text-[13px] tw:text-[#78847b]">
              Encontre alimentos disponíveis e acompanhe suas solicitações.
            </p>
          </div>

        </section>

        {/* INDICADORES */}
        <section className="tw:mb-[25px] tw:grid tw:grid-cols-3 tw:gap-[17px] tw:max-[760px]:grid-cols-1">

          <StatCard
            title="Doações disponíveis"
            value={carregando ? '—' : String(doacoes.length).padStart(2, '0')}
            description="Alimentos para solicitar"
            icon={Package}
            iconColor="tw:text-[#528463]"
          />

          <StatCard
            title="Solicitações em análise"
            value={carregando ? '—' : String(solicitacoesPendentes).padStart(2, '0')}
            description="Aguardando retorno dos doadores"
            icon={Clock3}
            iconColor="tw:text-[#d39746]"
          />

          <StatCard
            title="Reservas confirmadas"
            value={carregando ? '—' : String(reservasConfirmadas).padStart(2, '0')}
            description="Solicitações aceitas"
            icon={CheckCircle2}
            iconColor="tw:text-[#528463]"
          />

        </section>

        {/* PAINÉIS PRINCIPAIS */}
        <div className="tw:grid tw:grid-cols-[1.4fr_1fr] tw:gap-[18px] tw:max-[1100px]:grid-cols-1">

          {/* DOAÇÕES DISPONÍVEIS */}
          <section className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-[23px]">

            <div className="tw:mb-5 tw:flex tw:items-start tw:justify-between tw:gap-[10px] tw:max-[450px]:flex-col">

              <div>
                <h2 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
                  Oportunidades para sua instituição
                </h2>

                <p className="tw:mt-[6px] tw:text-[11px] tw:text-[#929b93]">
                  Alimentos disponibilizados por doadores.
                </p>
              </div>

              <Link
                to="/instituicao/doacoes"
                className="tw:flex tw:items-center tw:gap-[5px] tw:text-[11px] tw:font-bold tw:text-[#4d815e]"
              >
                Ver todas
                <ArrowUpRight size={16} />
              </Link>

            </div>

            <div className="tw:flex tw:flex-col">

              {carregando ? (
                <p className="tw:border-t tw:border-[#f0f1ec] tw:py-5 tw:text-center tw:text-[11px] tw:text-[#929b93]">
                  Carregando doações...
                </p>
              ) : doacoesRecentes.length > 0 ? (

                doacoesRecentes.map((doacao) => (
                  <div
                    key={doacao.id}
                    className="tw:flex tw:items-center tw:gap-3 tw:border-t tw:border-[#f0f1ec] tw:py-[14px] tw:max-[500px]:flex-wrap"
                  >

                    <div className="tw:grid tw:size-[43px] tw:shrink-0 tw:place-items-center tw:rounded-[10px] tw:bg-[#edf2e9]">
                      <img
                        src={imagemDoAlimento(doacao.nome)}
                        alt={doacao.nome}
                        className="tw:size-[31px] tw:object-contain"
                      />
                    </div>

                    <div className="tw:min-w-0 tw:flex-1">

                      <strong className="tw:block tw:text-[12px] tw:text-[#344a3c]">
                        {doacao.nome} • {formatarQuantidade(doacao.quantidade, doacao.unidade)}
                      </strong>

                      <small className="tw:mt-[5px] tw:block tw:text-[10px] tw:text-[#929b93]">
                        {doacao.origem || 'Origem não informada'} · Localização não informada
                      </small>

                      <small className="tw:mt-1 tw:block tw:text-[10px] tw:text-[#59856a]">
                        Validade: {formatarData(doacao.validade)}
                      </small>

                    </div>

                    <Link
                      to="/instituicao/doacoes"
                      className="tw:shrink-0 tw:rounded-lg tw:bg-[#eaf2e8] tw:px-3 tw:py-2 tw:text-[10px] tw:font-bold tw:text-[#477b57] tw:transition-colors tw:hover:bg-[#dcebd9]"
                    >
                      Ver doação
                    </Link>

                  </div>
                ))

              ) : (
                <p className="tw:border-t tw:border-[#f0f1ec] tw:py-5 tw:text-center tw:text-[11px] tw:text-[#929b93]">
                  Não há doações disponíveis no momento.
                </p>
              )}

            </div>

            <Link
              to="/instituicao/doacoes"
              className="tw:mt-[7px] tw:flex tw:items-center tw:justify-center tw:gap-[7px] tw:border-t tw:border-[#f0f1ec] tw:pt-[15px] tw:text-[12px] tw:font-bold tw:text-[#477b57]"
            >
              <Search size={16} />
              Explorar todas as doações
            </Link>

          </section>

          {/* SOLICITAÇÕES RECENTES */}
          <section className="tw:min-w-0 tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-[23px]">

            <div className="tw:mb-5 tw:flex tw:items-start tw:justify-between tw:gap-[10px] tw:max-[450px]:flex-col">

              <div>
                <h2 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
                  Minhas solicitações
                </h2>

                <p className="tw:mt-[6px] tw:text-[11px] tw:text-[#929b93]">
                  Acompanhe seus pedidos recentes.
                </p>
              </div>

              <Link
                to="/instituicao/solicitacoes"
                aria-label="Ver solicitações"
                className="tw:flex tw:items-center tw:justify-center tw:text-[#4d815e]"
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
                  const status = obterStatus(solicitacao.status)

                  return (
                    <div
                      key={solicitacao.id_solicitacao}
                      className="tw:flex tw:items-center tw:gap-[10px] tw:border-t tw:border-[#f0f1ec] tw:py-[15px]"
                    >

                      <div className="tw:grid tw:size-[38px] tw:shrink-0 tw:place-items-center tw:rounded-full tw:bg-[#eaf2e8] tw:text-[#477b57]">
                        <HeartHandshake size={19} />
                      </div>

                      <div className="tw:min-w-0 tw:flex-1">

                        <strong className="tw:block tw:text-[11px] tw:text-[#354b3e]">
                          {solicitacao.nome || 'Alimento'}
                        </strong>

                        <small className="tw:mt-[5px] tw:block tw:text-[10px] tw:text-[#939b94]">
                          {formatarQuantidade(solicitacao.quantidade, solicitacao.unidade)} solicitados
                        </small>

                      </div>

                      <span
                        className={`tw:whitespace-nowrap tw:rounded-full tw:px-2 tw:py-1.5 tw:text-[9px] ${status.classe}`}
                      >
                        {status.nome}
                      </span>

                    </div>
                  )
                })

              ) : (
                <p className="tw:border-t tw:border-[#f0f1ec] tw:py-5 tw:text-center tw:text-[11px] tw:text-[#929b93]">
                  Você ainda não enviou solicitações.
                </p>
              )}

            </div>

            <Link
              to="/instituicao/solicitacoes"
              className="tw:block tw:border-t tw:border-[#f0f1ec] tw:pt-[14px] tw:text-center tw:text-[11px] tw:font-bold tw:text-[#477b57]"
            >
              Ver todas as solicitações
            </Link>

          </section>

        </div>

        {/* MENSAGEM FINAL */}
        <section className="tw:mt-5 tw:flex tw:items-center tw:justify-between tw:gap-[15px] tw:rounded-xl tw:bg-[#e8f0e5] tw:p-[21px] tw:text-[#315c43]">

          <div className="tw:flex tw:items-center tw:gap-[14px]">

            <MapPin size={22} className="tw:shrink-0" />

            <div>
              <h2 className="tw:text-[13px] tw:font-bold">
                Encontre doações perto da sua região.
              </h2>

              <p className="tw:mt-[5px] tw:text-[10px] tw:leading-[1.5] tw:text-[#6d8373]">
                Explore os alimentos disponíveis e encontre oportunidades
                para sua instituição.
              </p>
            </div>

          </div>

        </section>

        <p className="tw:mt-5 tw:text-center tw:text-[10px] tw:text-[#a0a79e]">
          RedePratos — Conectando alimentos a quem precisa.
        </p>

      </main>
    </div>
  )
}

export default InstitutionDashboard
