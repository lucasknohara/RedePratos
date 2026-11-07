
import {
  Package,
  HeartHandshake,
  Bell,
  Plus,
  ArrowUpRight,
  Clock3,
  Leaf
} from 'lucide-react'

import DonorSidebar from '../../../components/layout/DonorSidebar/DonorSidebar.jsx'

import { Link } from 'react-router-dom'

const alimentos = [
  {
    id: 1,
    nome: 'Tomates',
    quantidade: '4 unidades',
    validade: 'Vence hoje',
    imagem: '/icons/tomate.svg',
    status: 'attention'
  },
  {
    id: 2,
    nome: 'Arroz',
    quantidade: '2 kg',
    validade: 'Validade: 20/11/2026',
    imagem: '/icons/arroz.svg',
    status: 'normal'
  },
  {
    id: 3,
    nome: 'Leite',
    quantidade: '1 caixa',
    validade: 'Validade: 08/11/2026',
    imagem: '/icons/leite.svg',
    status: 'normal'
  }
]

const classesValidade = {
  attention: 'tw:text-[#c58a39]',
  normal: 'tw:text-[#59856a]'
}

function Dashboard() {
  return (
    <div className="tw:flex tw:min-h-screen tw:bg-[#f7f6ef] tw:max-[760px]:flex-col">

      {/* MENU LATERAL */}
      <DonorSidebar />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="tw:min-w-0 tw:flex-1 tw:px-[45px] tw:pb-[35px] tw:max-[1100px]:px-[25px] tw:max-[1100px]:pb-[30px] tw:max-[760px]:px-[18px] tw:max-[760px]:pb-[25px]">

        <header className="tw:flex tw:h-[75px] tw:items-center tw:justify-between tw:border-b tw:border-[#e8eae2]">

          <div className="tw:flex tw:items-center tw:gap-[10px] tw:text-[12px] tw:text-[#87938a] tw:max-[450px]:text-[10px]">
            <span>RedePratos</span>
            <span>/</span>
            <strong className="tw:text-[#315c43]">Visão geral</strong>
          </div>

          <button
            className="tw:relative tw:grid tw:size-10 tw:cursor-pointer tw:place-items-center tw:rounded-full tw:border tw:border-[#e8eae2] tw:bg-white tw:text-[#315c43]"
            aria-label="Notificações"
          >
            <Bell size={20} />
            <span className="tw:absolute tw:top-2 tw:right-[9px] tw:size-[7px] tw:rounded-full tw:bg-[#d78b42]"></span>
          </button>

        </header>

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

          <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
              <span>Alimentos cadastrados</span>
              <Package size={21} className="tw:text-[#528463]" />
            </div>

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
              08
            </strong>

            <small className="tw:text-[10px] tw:text-[#8c978e]">
              Na sua despensa
            </small>

          </article>

          <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
              <span>Próximos da validade</span>
              <Clock3 size={21} className="tw:text-[#d39746]" />
            </div>

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
              02
            </strong>

            <small className="tw:text-[10px] tw:text-[#8c978e]">
              Precisam da sua atenção
            </small>

          </article>

          <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
              <span>Doações ativas</span>
              <HeartHandshake size={21} className="tw:text-[#528463]" />
            </div>

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
              03
            </strong>

            <small className="tw:text-[10px] tw:text-[#8c978e]">
              Alimentos disponibilizados
            </small>

          </article>

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
                to="/inicio/alimentos"
                className="tw:flex tw:items-center tw:gap-[5px] tw:text-[11px] tw:font-bold tw:text-[#4d815e]"
              >
                Ver todos
                <ArrowUpRight size={16} />
              </Link>

            </div>

            <div className="tw:flex tw:flex-col">

              {alimentos.map((alimento) => (
                <div
                  className="tw:flex tw:items-center tw:gap-3 tw:border-t tw:border-[#f0f1ec] tw:py-[14px] tw:max-[450px]:flex-wrap"
                  key={alimento.id}
                >

                  <div className="tw:grid tw:size-[43px] tw:shrink-0 tw:place-items-center tw:rounded-[10px] tw:bg-[#edf2e9]">
                    <img
                      src={alimento.imagem}
                      alt={alimento.nome}
                      className="tw:size-[31px] tw:object-contain"
                    />
                  </div>

                  <div className="tw:min-w-0 tw:flex-1">
                    <strong className="tw:block tw:text-[12px] tw:text-[#344a3c]">
                      {alimento.nome}
                    </strong>
                    <small className="tw:mt-[5px] tw:block tw:text-[10px] tw:text-[#929b93]">
                      {alimento.quantidade}
                    </small>
                  </div>

                  <div className={`tw:whitespace-nowrap tw:text-[10px] tw:max-[450px]:ml-auto ${classesValidade[alimento.status]}`}>
                    {alimento.validade}
                  </div>

                </div>
              ))}

            </div>

            <Link
              to="/inicio/alimentos/novo"
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
                  Alguns alimentos estão próximos do vencimento.
                  Aproveite antes que estraguem.
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
                  to="/inicio/solicitacoes"
                  aria-label="Ver solicitações"
                  className="tw:flex tw:items-center tw:justify-center tw:gap-[7px] tw:rounded-full tw:text-[#4d815e]"
                >
                  <ArrowUpRight size={17} />
                </Link>

              </div>

              <div className="tw:flex tw:items-center tw:gap-[10px] tw:border-t tw:border-[#f0f1ec] tw:py-[15px]">

                <div className="tw:grid tw:size-[38px] tw:shrink-0 tw:place-items-center tw:rounded-full tw:bg-[#eaf2e8] tw:text-[#477b57]">
                  <HeartHandshake size={20} />
                </div>

                <div className="tw:min-w-0 tw:flex-1">
                  <strong className="tw:block tw:text-[11px] tw:text-[#354b3e]">
                    Instituição parceira
                  </strong>
                  <small className="tw:mt-[5px] tw:block tw:text-[10px] tw:text-[#939b94]">
                    Solicitou uma doação.
                  </small>
                </div>

                <span className="tw:whitespace-nowrap tw:rounded-full tw:bg-[#fff1d8] tw:px-2 tw:py-1.5 tw:text-[9px] tw:text-[#a97930]">
                  Pendente
                </span>

              </div>

              <Link
                to="/inicio/solicitacoes"
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
              to="/inicio/minhas-doacoes"
              className="tw:flex tw:items-center tw:gap-[5px] tw:text-[11px] tw:font-bold tw:text-[#4d815e]"
            >
              Ver todas
              <ArrowUpRight size={16} />
            </Link>

          </div>

          <div className="tw:flex tw:items-center tw:gap-[13px] tw:rounded-[9px] tw:bg-[#f8f9f5] tw:p-[13px]">

            <div className="tw:grid tw:size-[42px] tw:shrink-0 tw:place-items-center tw:rounded-[9px] tw:bg-[#eaf1e7]">
              <img
                src="/icons/arroz.svg"
                alt="Arroz"
                className="tw:size-[30px] tw:object-contain"
              />
            </div>

            <div className="tw:min-w-0 tw:flex-1">
              <strong className="tw:block tw:text-[12px]">
                Arroz
              </strong>
              <small className="tw:mt-[5px] tw:block tw:text-[10px] tw:text-[#929b93]">
                2 kg disponibilizados
              </small>
            </div>

            <span className="tw:rounded-full tw:bg-[#e3f2e6] tw:px-[10px] tw:py-[7px] tw:text-[10px] tw:text-[#36734a]">
              Disponível
            </span>

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

          <ArrowUpRight size={21} className="tw:shrink-0" />

        </section>

      </main>
    </div>
  )
}

export default Dashboard
