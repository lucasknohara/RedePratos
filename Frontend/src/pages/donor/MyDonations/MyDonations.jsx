import { useEffect, useState } from 'react'

import {
  Bell,
  Package,
  HeartHandshake,
  Clock3,
  CheckCircle,
  CalendarDays,
  MapPin
} from 'lucide-react'

import { Link } from 'react-router-dom'

import DonorSidebar from '../../../components/layout/DonorSidebar/DonorSidebar.jsx'
import StatusBadge from '../../../components/layout/StatusBadge/StatusBadge.jsx'
import EmptyState from '../../../components/layout/EmptyState/EmptyState.jsx'
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

function adaptarDoacao(doacao) {
  const status = doacao.status === 'disponivel' &&
    Number(doacao.solicitacoes_pendentes) > 0
    ? 'pendente'
    : doacao.status

  return {
    id: Number(doacao.id),
    nome: doacao.nome || 'Alimento',
    imagem: doacao.imagem || imagemDoAlimento(doacao.nome),
    quantidade: formatarQuantidade(doacao.quantidade, doacao.unidade),
    validade: formatarData(doacao.validade),
    data: formatarData(doacao.criado_em),
    regiao: doacao.regiao || 'Localização não informada',
    instituicao: doacao.instituicoes || 'Nenhuma instituição ainda',
    status
  }
}

function MyDonations() {
  const [filtro, setFiltro] = useState('todas')
  const [doacoes, setDoacoes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    let ativo = true

    async function carregarDoacoes() {
      try {
        const usuario = obterUsuario()
        const idUsuario = Number(usuario?.id)

        if (usuario?.tipo_usuario !== 'doador' ||
            !Number.isInteger(idUsuario) ||
            idUsuario <= 0) {
          throw new Error('Entre com uma conta de doador para consultar suas doações.')
        }

        const params = new URLSearchParams({
          id_usuario: String(idUsuario)
        })

        const resultado = await apiRequest(
          `/api/doacoes/doador?${params.toString()}`
        )

        if (!Array.isArray(resultado)) {
          throw new Error('A API retornou uma lista de doações inválida.')
        }

        if (ativo) {
          setDoacoes(resultado.map(adaptarDoacao))
        }
      } catch (error) {
        if (ativo) {
          setErro(error.message || 'Não foi possível carregar suas doações.')
        }
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregarDoacoes()

    return () => {
      ativo = false
    }
  }, [])

  const doacoesFiltradas = doacoes.filter((doacao) => (
    filtro === 'todas' || doacao.status === filtro
  ))

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
              Minhas doações
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

          {/* TÍTULO */}
          <section className="tw:mb-7 tw:flex tw:items-center tw:justify-between tw:gap-5 tw:max-[760px]:items-start tw:max-[760px]:flex-col">

            <div>
              <span className="tw:text-[10px] tw:font-bold tw:tracking-[1px] tw:text-[#689171]">
                COMPARTILHE E TRANSFORME
              </span>

              <h1 className="tw:my-[9px] tw:text-[29px] tw:font-bold tw:tracking-[-0.7px] tw:text-[#124638]">
                Minhas doações
              </h1>

              <p className="tw:text-[13px] tw:leading-[1.6] tw:text-[#78847b]">
                Acompanhe os alimentos que você disponibilizou
                para ajudar outras pessoas.
              </p>
            </div>

            <Link
              to="/doador/alimentos"
              className="tw:flex tw:items-center tw:gap-[9px] tw:whitespace-nowrap tw:rounded-lg tw:bg-[#124638] tw:px-[17px] tw:py-[13px] tw:text-[12px] tw:font-bold tw:text-white tw:transition-colors tw:hover:bg-[#1d624d] tw:max-[760px]:w-full tw:max-[760px]:justify-center"
            >
              <Package size={18} />
              Ver minha despensa
            </Link>

          </section>

          {/* RESUMO */}
          <section className="tw:mb-[25px] tw:grid tw:grid-cols-4 tw:gap-[13px] tw:max-[1100px]:grid-cols-2 tw:max-[400px]:grid-cols-1">

            {/* TOTAL */}
            <article className="tw:flex tw:min-w-0 tw:items-center tw:gap-3 tw:rounded-[11px] tw:border tw:border-[#e9ebe4] tw:bg-white tw:px-[14px] tw:py-[17px]">

              <div className="tw:grid tw:size-10 tw:shrink-0 tw:place-items-center tw:rounded-[10px] tw:bg-[#eaf2e8] tw:text-[#477b57]">
                <HeartHandshake size={21} />
              </div>

              <div>
                <span className="tw:block tw:text-[10px] tw:text-[#78847b]">
                  Total de doações
                </span>

                <strong className="tw:my-[5px] tw:block tw:text-[23px] tw:text-[#244d39]">
                  {doacoes.length}
                </strong>

                <small className="tw:block tw:text-[9px] tw:text-[#9aa29b]">
                  Ofertas cadastradas
                </small>
              </div>

            </article>

            {/* DISPONÍVEIS */}
            <article className="tw:flex tw:min-w-0 tw:items-center tw:gap-3 tw:rounded-[11px] tw:border tw:border-[#e9ebe4] tw:bg-white tw:px-[14px] tw:py-[17px]">

              <div className="tw:grid tw:size-10 tw:shrink-0 tw:place-items-center tw:rounded-[10px] tw:bg-[#eaf2e8] tw:text-[#477b57]">
                <Package size={21} />
              </div>

              <div>
                <span className="tw:block tw:text-[10px] tw:text-[#78847b]">
                  Disponíveis
                </span>

                <strong className="tw:my-[5px] tw:block tw:text-[23px] tw:text-[#244d39]">
                  {doacoes.filter(d => d.status === 'disponivel').length}
                </strong>

                <small className="tw:block tw:text-[9px] tw:text-[#9aa29b]">
                  Aguardando instituições
                </small>
              </div>

            </article>

            {/* PENDENTES */}
            <article className="tw:flex tw:min-w-0 tw:items-center tw:gap-3 tw:rounded-[11px] tw:border tw:border-[#e9ebe4] tw:bg-white tw:px-[14px] tw:py-[17px]">

              <div className="tw:grid tw:size-10 tw:shrink-0 tw:place-items-center tw:rounded-[10px] tw:bg-[#fff1d8] tw:text-[#c28a37]">
                <Clock3 size={21} />
              </div>

              <div>
                <span className="tw:block tw:text-[10px] tw:text-[#78847b]">
                  Solicitações pendentes
                </span>

                <strong className="tw:my-[5px] tw:block tw:text-[23px] tw:text-[#244d39]">
                  {doacoes.filter(d => d.status === 'pendente').length}
                </strong>

                <small className="tw:block tw:text-[9px] tw:text-[#9aa29b]">
                  Precisam da sua resposta
                </small>
              </div>

            </article>

            {/* CONCLUÍDAS */}
            <article className="tw:flex tw:min-w-0 tw:items-center tw:gap-3 tw:rounded-[11px] tw:border tw:border-[#e9ebe4] tw:bg-white tw:px-[14px] tw:py-[17px]">

              <div className="tw:grid tw:size-10 tw:shrink-0 tw:place-items-center tw:rounded-[10px] tw:bg-[#eaf2e8] tw:text-[#477b57]">
                <CheckCircle size={21} />
              </div>

              <div>
                <span className="tw:block tw:text-[10px] tw:text-[#78847b]">
                  Concluídas
                </span>

                <strong className="tw:my-[5px] tw:block tw:text-[23px] tw:text-[#244d39]">
                  {doacoes.filter(d => d.status === 'concluida').length}
                </strong>

                <small className="tw:block tw:text-[9px] tw:text-[#9aa29b]">
                  Entregas finalizadas
                </small>
              </div>

            </article>

          </section>

          {/* PAINEL DAS DOAÇÕES */}
          <section className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-6 tw:max-[1100px]:p-[18px] tw:max-[400px]:p-[14px]">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-[15px] tw:max-[400px]:items-start tw:max-[400px]:flex-col">

              <div>
                <h2 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
                  Alimentos disponibilizados
                </h2>

                <p className="tw:mt-[6px] tw:text-[11px] tw:text-[#929b93]">
                  Acompanhe o andamento das suas ofertas.
                </p>
              </div>

              <span className="tw:whitespace-nowrap tw:rounded-full tw:bg-[#eaf2e8] tw:px-[11px] tw:py-[7px] tw:text-[10px] tw:text-[#477b57]">
                {doacoesFiltradas.length} registros
              </span>

            </div>

            {/* FILTROS */}
            <div className="tw:flex tw:items-center tw:gap-2 tw:overflow-x-auto tw:border-b tw:border-[#edf0e9] tw:py-5">

              {filtros.map((item) => (

                <button
                  key={item.valor}
                  type="button"
                  className={`
                    tw:shrink-0 tw:cursor-pointer
                    tw:rounded-full tw:border
                    tw:px-[13px] tw:py-[9px]
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

            {/* CABEÇALHO DA LISTA */}
            <div className="
              tw:grid tw:grid-cols-[1.2fr_0.8fr_1.3fr_1fr]
              tw:items-center tw:gap-[15px]
              tw:bg-[#f7f8f4] tw:px-[10px] tw:py-[14px]
              tw:text-[9px] tw:font-bold
              tw:tracking-[0.5px] tw:text-[#929c93]
              tw:max-[1100px]:grid-cols-[1.1fr_0.8fr_1.2fr_1fr]
              tw:max-[1100px]:gap-[9px]
              tw:max-[760px]:hidden
            ">

              <span>ALIMENTO</span>
              <span>VALIDADE</span>
              <span>INSTITUIÇÃO</span>
              <span>STATUS</span>

            </div>

            {/* REGISTROS */}
            <div>

              {carregando ? (
                <p className="tw:py-8 tw:text-center tw:text-[12px] tw:text-[#78847b]">
                  Carregando suas doações...
                </p>
              ) : doacoesFiltradas.map((doacao) => (

                <article
                  className="
                    tw:grid tw:grid-cols-[1.2fr_0.8fr_1.3fr_1fr]
                    tw:items-center tw:gap-[15px]
                    tw:border-b tw:border-[#edf0e9]
                    tw:px-[10px] tw:py-[17px]
                    tw:max-[1100px]:grid-cols-[1.1fr_0.8fr_1.2fr_1fr]
                    tw:max-[1100px]:gap-[9px]
                    tw:max-[760px]:grid-cols-2
                    tw:max-[760px]:gap-[14px]
                    tw:max-[760px]:px-[5px]
                    tw:max-[760px]:py-[18px]
                  "
                  key={doacao.id}
                >

                  {/* ALIMENTO */}
                  <div className="tw:flex tw:min-w-0 tw:items-center tw:gap-[11px] tw:max-[760px]:col-span-full">

                    <div className="tw:grid tw:size-11 tw:shrink-0 tw:place-items-center tw:rounded-[10px] tw:bg-[#edf2e9]">
                      <img
                        src={doacao.imagem}
                        alt={doacao.nome}
                        className="tw:size-[31px] tw:object-contain"
                      />
                    </div>

                    <div className="tw:min-w-0">
                      <strong className="tw:block tw:text-[12px] tw:text-[#344a3c]">
                        {doacao.nome}
                      </strong>

                      <small className="tw:mt-1 tw:block tw:text-[9px] tw:text-[#929b93]">
                        {doacao.quantidade}
                      </small>

                      <small className="tw:mt-1 tw:block tw:text-[9px] tw:text-[#929b93]">
                        Disponibilizada em {doacao.data}
                      </small>
                    </div>

                  </div>

                  {/* VALIDADE */}
                  <div className="tw:flex tw:items-center tw:gap-2 tw:text-[10px] tw:text-[#708075] tw:max-[760px]:col-start-1">
                    <CalendarDays
                      size={16}
                      className="tw:shrink-0 tw:text-[#668b70]"
                    />
                    {doacao.validade}
                  </div>

                  {/* INSTITUIÇÃO */}
                  <div className="tw:flex tw:min-w-0 tw:items-center tw:gap-[9px] tw:text-[#568064] tw:max-[760px]:col-span-full">

                    <HeartHandshake size={17} className="tw:shrink-0" />

                    <div className="tw:min-w-0">
                      <strong className="tw:block tw:text-[10px] tw:leading-[1.4] tw:text-[#40564a]">
                        {doacao.instituicao}
                      </strong>

                      <small className="tw:mt-[5px] tw:flex tw:items-center tw:gap-[3px] tw:text-[9px] tw:text-[#929b93]">
                        <MapPin size={12} />
                        {doacao.regiao}
                      </small>
                    </div>

                  </div>

                  {/* STATUS */}
                  <div className="tw:max-[760px]:col-start-2 tw:max-[760px]:row-start-2 tw:max-[760px]:justify-self-end">
                    <StatusBadge
                      status={doacao.status}
                      size="compact"
                      label={
                        doacao.status === 'pendente'
                          ? 'Solicitação recebida'
                          : doacao.status === 'reservada'
                            ? 'Reservada'
                            : undefined
                      }
                      variant={
                        doacao.status === 'reservada' ? 'blue' : undefined
                      }
                    />
                  </div>

                </article>

              ))}

              {/* LISTA VAZIA */}
              {!carregando && doacoesFiltradas.length === 0 && (

                <EmptyState
                  icon={Package}
                  iconSize={32}
                  title="Nenhuma doação encontrada"
                  description="Não há registros com esse status."
                  variant="donor"
                />

              )}

            </div>

          </section>

          {/* AVISO */}
          <section className="tw:mt-5 tw:flex tw:items-start tw:gap-[14px] tw:rounded-[11px] tw:bg-[#eaf1e7] tw:p-[21px] tw:text-[#477b57] tw:max-[400px]:p-4">

            <HeartHandshake size={24} className="tw:shrink-0" />

            <div>
              <strong className="tw:text-[13px]">
                Cada doação faz a diferença!
              </strong>

              <p className="tw:mt-[6px] tw:text-[11px] tw:leading-[1.6] tw:text-[#718278]">
                Quando uma instituição solicitar um alimento,
                você poderá analisar o pedido antes de confirmar a reserva.
              </p>
            </div>

          </section>

        </div>

      </main>

    </div>
  )
}

export default MyDonations
