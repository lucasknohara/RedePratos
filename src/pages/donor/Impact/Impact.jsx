
import {
  Bell,
  ArrowUpRight,
  Sprout,
  HeartHandshake,
  Leaf,
  Trophy,
  PackageCheck,
  Scale,
  LockKeyhole,
  Award
} from 'lucide-react'

import DonorSidebar from '../../../components/layout/DonorSidebar/DonorSidebar.jsx'

import { Link } from 'react-router-dom'

// Dados demonstrativos.
// Posteriormente serão substituídos pelos dados do backend.
const impacto = {
  doacoesConcluidas: 12,
  alimentosDoados: 35,
  instituicoesAjudadas: 4
}

const conquistas = [
  {
    id: 1,
    titulo: 'Primeiro passo',
    descricao: 'Realize sua primeira doação.',
    requisito: '1 doação concluída',
    icone: Sprout,
    desbloqueada: true
  },
  {
    id: 2,
    titulo: 'Doador solidário',
    descricao: 'Complete 5 doações e ajude a combater o desperdício.',
    requisito: '5 doações concluídas',
    icone: HeartHandshake,
    desbloqueada: true
  },
  {
    id: 3,
    titulo: 'Guardião dos alimentos',
    descricao: 'Alcance a marca de 10 doações concluídas.',
    requisito: '10 doações concluídas',
    icone: Leaf,
    desbloqueada: true
  },
  {
    id: 4,
    titulo: 'Embaixador RedePratos',
    descricao: 'Complete 20 doações e inspire outras pessoas.',
    requisito: '20 doações concluídas',
    icone: Trophy,
    desbloqueada: false
  }
]

function Impact() {
  const progresso = Math.min(
    (impacto.doacoesConcluidas / 20) * 100,
    100
  )

  const faltamDoacoes = Math.max(
    20 - impacto.doacoesConcluidas,
    0
  )

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
              Meu impacto
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

        {/* APRESENTAÇÃO */}
        <section className="tw:py-[35px]">

          <span className="tw:text-[10px] tw:font-bold tw:tracking-[1px] tw:text-[#689171]">
            CADA ATITUDE FAZ A DIFERENÇA
          </span>

          <h1 className="tw:my-[9px] tw:text-[30px] tw:font-bold tw:tracking-[-0.7px] tw:text-[#124638]">
            Meu impacto
          </h1>

          <p className="tw:text-[13px] tw:text-[#78847b]">
            Acompanhe suas conquistas e veja como suas doações transformam vidas.
          </p>

        </section>

        {/* NÍVEL E PROGRESSO */}
        <section className="tw:mb-[22px] tw:rounded-xl tw:border tw:border-[#dfe9dc] tw:bg-[#e8f0e5] tw:p-[25px] tw:max-[760px]:p-5">

          <div className="tw:flex tw:items-center tw:justify-between tw:gap-5 tw:max-[600px]:flex-col tw:max-[600px]:items-start">

            <div className="tw:flex tw:items-center tw:gap-4">

              <div className="tw:grid tw:size-[65px] tw:shrink-0 tw:place-items-center tw:rounded-full tw:bg-white tw:text-[#54845d]">
                <Award size={34} />
              </div>

              <div>
                <span className="tw:text-[10px] tw:font-bold tw:tracking-[1px] tw:text-[#78917b]">
                  SEU NÍVEL ATUAL
                </span>

                <h2 className="tw:mt-1 tw:text-[21px] tw:font-bold tw:text-[#315c43]">
                  Guardião dos alimentos
                </h2>

                <p className="tw:mt-1 tw:text-[11px] tw:text-[#718575]">
                  Você já está fazendo a diferença!
                </p>
              </div>

            </div>

            <div className="tw:rounded-full tw:border tw:border-[#cbdcc9] tw:bg-white/70 tw:px-4 tw:py-2 tw:text-[11px] tw:font-semibold tw:text-[#477b57]">
              Nível 3
            </div>

          </div>

          {/* BARRA DE PROGRESSO */}
          <div className="tw:mt-7">

            <div className="tw:mb-2 tw:flex tw:items-center tw:justify-between tw:gap-3">
              <span className="tw:text-[11px] tw:font-semibold tw:text-[#496b51]">
                Próxima conquista
              </span>

              <span className="tw:text-[11px] tw:font-bold tw:text-[#477b57]">
                {impacto.doacoesConcluidas}/20 doações
              </span>
            </div>

            <div
              className="tw:h-[9px] tw:overflow-hidden tw:rounded-full tw:bg-[#d5e2d2]"
              role="progressbar"
              aria-label="Progresso para a próxima conquista"
              aria-valuenow={impacto.doacoesConcluidas}
              aria-valuemin={0}
              aria-valuemax={20}
            >
              <div
                className="tw:h-full tw:rounded-full tw:bg-[#54845d] tw:transition-all"
                style={{ width: `${progresso}%` }}
              ></div>
            </div>

            <p className="tw:mt-2 tw:text-[10px] tw:text-[#718575]">
              {faltamDoacoes > 0
                ? `Faltam ${faltamDoacoes} doações para desbloquear Embaixador RedePratos.`
                : 'Você alcançou todas as conquistas disponíveis!'}
            </p>

          </div>

        </section>

        {/* INDICADORES DE IMPACTO */}
        <section className="tw:mb-[25px] tw:grid tw:grid-cols-3 tw:gap-[17px] tw:max-[760px]:grid-cols-1">

          <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
              <span>Doações concluídas</span>
              <PackageCheck size={21} className="tw:text-[#528463]" />
            </div>

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
              {impacto.doacoesConcluidas.toString().padStart(2, '0')}
            </strong>

            <small className="tw:text-[10px] tw:text-[#8c978e]">
              Entregas confirmadas
            </small>

          </article>

          <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
              <span>Alimentos doados</span>
              <Scale size={21} className="tw:text-[#528463]" />
            </div>

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
              {impacto.alimentosDoados} kg
            </strong>

            <small className="tw:text-[10px] tw:text-[#8c978e]">
              Quantidade total doada
            </small>

          </article>

          <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
              <span>Instituições ajudadas</span>
              <HeartHandshake size={21} className="tw:text-[#528463]" />
            </div>

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
              {impacto.instituicoesAjudadas.toString().padStart(2, '0')}
            </strong>

            <small className="tw:text-[10px] tw:text-[#8c978e]">
              Instituições alcançadas
            </small>

          </article>

        </section>

        {/* CONQUISTAS */}
        <section className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-[23px] tw:max-[760px]:p-4">

          <div className="tw:mb-6">
            <h2 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
              Minhas conquistas
            </h2>

            <p className="tw:mt-[6px] tw:text-[11px] tw:text-[#929b93]">
              Cada conquista representa uma atitude positiva.
            </p>
          </div>

          <div className="tw:grid tw:grid-cols-2 tw:gap-4 tw:max-[600px]:grid-cols-1">

            {conquistas.map((conquista) => {
              const Icone = conquista.icone

              return (
                <article
                  key={conquista.id}
                  className={`tw:relative tw:flex tw:items-center tw:gap-4 tw:rounded-xl tw:border tw:p-4 tw:transition-colors ${
                    conquista.desbloqueada
                      ? 'tw:border-[#e0e9dc] tw:bg-[#f7faf5]'
                      : 'tw:border-[#e9ebe4] tw:bg-[#fafaf8]'
                  }`}
                >

                  <div
                    className={`tw:grid tw:size-[58px] tw:shrink-0 tw:place-items-center tw:rounded-full ${
                      conquista.desbloqueada
                        ? 'tw:bg-[#e5efe1] tw:text-[#54845d]'
                        : 'tw:bg-[#eeefeb] tw:text-[#a1a89f]'
                    }`}
                  >
                    <Icone size={29} />
                  </div>

                  <div className="tw:min-w-0 tw:flex-1">

                    <div className="tw:flex tw:items-center tw:gap-2">

                      <h3
                        className={`tw:text-[12px] tw:font-bold ${
                          conquista.desbloqueada
                            ? 'tw:text-[#315c43]'
                            : 'tw:text-[#858d85]'
                        }`}
                      >
                        {conquista.titulo}
                      </h3>

                      {!conquista.desbloqueada && (
                        <LockKeyhole
                          size={13}
                          className="tw:shrink-0 tw:text-[#a1a89f]"
                        />
                      )}

                    </div>

                    <p className="tw:mt-1 tw:text-[10px] tw:leading-[1.5] tw:text-[#929b93]">
                      {conquista.descricao}
                    </p>

                    <span
                      className={`tw:mt-2 tw:inline-block tw:text-[9px] tw:font-semibold ${
                        conquista.desbloqueada
                          ? 'tw:text-[#528463]'
                          : 'tw:text-[#969d94]'
                      }`}
                    >
                      {conquista.desbloqueada
                        ? 'Conquista desbloqueada'
                        : conquista.requisito}
                    </span>

                  </div>

                </article>
              )
            })}

          </div>

        </section>

        {/* MENSAGEM FINAL */}
        <section className="tw:mt-5 tw:flex tw:items-center tw:justify-between tw:gap-4 tw:rounded-xl tw:bg-[#e8f0e5] tw:p-[21px] tw:text-[#315c43]">

          <div className="tw:flex tw:items-center tw:gap-[14px]">

            <Leaf size={25} className="tw:shrink-0" />

            <div>
              <h2 className="tw:text-[13px] tw:font-bold">
                Continue espalhando solidariedade!
              </h2>

              <p className="tw:mt-[5px] tw:text-[10px] tw:leading-[1.5] tw:text-[#6d8373]">
                Cada alimento aproveitado representa menos desperdício e mais oportunidades.
              </p>
            </div>

          </div>

          <Link
            to="/inicio/solicitacoes"
            aria-label="Ver meus alimentos"
          >
            <ArrowUpRight size={21} />
          </Link>

        </section>

        <p className="tw:mt-5 tw:text-center tw:text-[10px] tw:text-[#a0a79e]">
          Continue contribuindo para um futuro com menos desperdício.
        </p>

      </main>
    </div>
  )
}

export default Impact
