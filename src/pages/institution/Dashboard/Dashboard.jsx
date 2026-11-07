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

const doacoes = [
  {
    id: 1,
    nome: 'Tomates',
    quantidade: '5 kg',
    validade: 'Validade: 10/11/2026',
    regiao: 'Região central',
    origem: 'Comércio',
    imagem: '/icons/tomate.svg'
  },
  {
    id: 2,
    nome: 'Arroz',
    quantidade: '10 kg',
    validade: 'Validade: 15/11/2026',
    regiao: 'Região norte',
    origem: 'Residência',
    imagem: '/icons/arroz.svg'
  },
  {
    id: 3,
    nome: 'Leite',
    quantidade: '12 caixas',
    validade: 'Validade: 12/11/2026',
    regiao: 'Região sul',
    origem: 'Comércio',
    imagem: '/icons/leite.svg'
  }
]

const solicitacoes = [
  {
    id: 1,
    alimento: 'Arroz',
    quantidade: '5 kg',
    status: 'Pendente',
    tipo: 'pendente'
  },
  {
    id: 2,
    alimento: 'Leite',
    quantidade: '6 caixas',
    status: 'Aprovada',
    tipo: 'aprovada'
  },
  {
    id: 3,
    alimento: 'Tomates',
    quantidade: '3 kg',
    status: 'Pendente',
    tipo: 'pendente'
  }
]

function InstitutionDashboard() {
  return (
    <div className="tw:flex tw:min-h-screen tw:bg-[#f7f6ef] tw:max-[760px]:flex-col">

      {/* MENU LATERAL */}
      <InstitutionSidebar />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="tw:min-w-0 tw:flex-1 tw:px-[45px] tw:pb-[35px] tw:max-[1100px]:px-[25px] tw:max-[1100px]:pb-[30px] tw:max-[760px]:px-[18px] tw:max-[760px]:pb-[25px]">

        {/* CABEÇALHO */}
        <PageHeader currentPage="Visão geral" />

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

          <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
              <span>Doações disponíveis</span>
              <Package size={21} className="tw:text-[#528463]" />
            </div>

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
              08
            </strong>

            <small className="tw:text-[10px] tw:text-[#8c978e]">
              Alimentos para solicitar
            </small>

          </article>

          <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
              <span>Solicitações em análise</span>
              <Clock3 size={21} className="tw:text-[#d39746]" />
            </div>

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
              03
            </strong>

            <small className="tw:text-[10px] tw:text-[#8c978e]">
              Aguardando retorno dos doadores
            </small>

          </article>

          <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
              <span>Reservas confirmadas</span>
              <CheckCircle2 size={21} className="tw:text-[#528463]" />
            </div>

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
              02
            </strong>

            <small className="tw:text-[10px] tw:text-[#8c978e]">
              Solicitações aprovadas
            </small>

          </article>

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

              {doacoes.map((doacao) => (
                <div
                  key={doacao.id}
                  className="tw:flex tw:items-center tw:gap-3 tw:border-t tw:border-[#f0f1ec] tw:py-[14px] tw:max-[500px]:flex-wrap"
                >

                  <div className="tw:grid tw:size-[43px] tw:shrink-0 tw:place-items-center tw:rounded-[10px] tw:bg-[#edf2e9]">
                    <img
                      src={doacao.imagem}
                      alt={doacao.nome}
                      className="tw:size-[31px] tw:object-contain"
                    />
                  </div>

                  <div className="tw:min-w-0 tw:flex-1">

                    <strong className="tw:block tw:text-[12px] tw:text-[#344a3c]">
                      {doacao.nome} • {doacao.quantidade}
                    </strong>

                    <small className="tw:mt-[5px] tw:block tw:text-[10px] tw:text-[#929b93]">
                      {doacao.origem} · {doacao.regiao}
                    </small>

                    <small className="tw:mt-1 tw:block tw:text-[10px] tw:text-[#59856a]">
                      {doacao.validade}
                    </small>

                  </div>

                  <Link
                    to="/instituicao/doacoes"
                    className="tw:shrink-0 tw:rounded-lg tw:bg-[#eaf2e8] tw:px-3 tw:py-2 tw:text-[10px] tw:font-bold tw:text-[#477b57] tw:transition-colors tw:hover:bg-[#dcebd9]"
                  >
                    Ver doação
                  </Link>

                </div>
              ))}

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

              {solicitacoes.map((solicitacao) => (
                <div
                  key={solicitacao.id}
                  className="tw:flex tw:items-center tw:gap-[10px] tw:border-t tw:border-[#f0f1ec] tw:py-[15px]"
                >

                  <div className="tw:grid tw:size-[38px] tw:shrink-0 tw:place-items-center tw:rounded-full tw:bg-[#eaf2e8] tw:text-[#477b57]">
                    <HeartHandshake size={19} />
                  </div>

                  <div className="tw:min-w-0 tw:flex-1">

                    <strong className="tw:block tw:text-[11px] tw:text-[#354b3e]">
                      {solicitacao.alimento}
                    </strong>

                    <small className="tw:mt-[5px] tw:block tw:text-[10px] tw:text-[#939b94]">
                      {solicitacao.quantidade} solicitados
                    </small>

                  </div>

                  <span
                    className={`tw:whitespace-nowrap tw:rounded-full tw:px-2 tw:py-1.5 tw:text-[9px] ${
                      solicitacao.tipo === 'aprovada'
                        ? 'tw:bg-[#e3f2e6] tw:text-[#36734a]'
                        : 'tw:bg-[#fff1d8] tw:text-[#a97930]'
                    }`}
                  >
                    {solicitacao.status}
                  </span>

                </div>
              ))}

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
