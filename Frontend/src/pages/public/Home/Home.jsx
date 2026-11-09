
import {
  ArrowRight,
  Heart,
  Leaf,
  Check
} from 'lucide-react'

import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link
      to="/"
      className="tw:flex tw:items-center tw:gap-2 tw:text-[21px] tw:font-bold tw:text-[#124638]"
    >
      <img
        src="/icons/logo.svg"
        alt="RedePratos"
        className="tw:size-[29px] tw:object-contain"
      />

      <span>RedePratos</span>
    </Link>
  )
}

function Home() {
  return (
    <div className="tw:min-h-screen tw:bg-[#f7f6ef]">

      {/* CABEÇALHO */}
      <header className="tw:h-[82px] tw:border-b tw:border-[#e9e9e0] tw:bg-[#f7f6ef] tw:max-[760px]:h-auto tw:max-[760px]:py-[17px]">

        <div className="
          tw:mx-auto tw:flex tw:h-full tw:w-full
          tw:max-w-[1300px] tw:items-center
          tw:justify-between tw:px-[35px]
          tw:max-[760px]:flex-wrap
          tw:max-[760px]:gap-[18px]
          tw:max-[760px]:px-[22px]
        ">

          <Logo />

          <nav className="
            tw:flex tw:gap-10
            tw:max-[760px]:order-3
            tw:max-[760px]:w-full
            tw:max-[760px]:justify-center
            tw:max-[760px]:gap-6
          ">
            <a
              href="#solucao"
              className="tw:text-[14px] tw:text-[#40554a] tw:hover:text-[#4aaa70] tw:max-[760px]:text-[12px]"
            >
              A solução
            </a>

            <a
              href="#como-funciona"
              className="tw:text-[14px] tw:text-[#40554a] tw:hover:text-[#4aaa70] tw:max-[760px]:text-[12px]"
            >
              Como funciona
            </a>

            <a
              href="#impacto"
              className="tw:text-[14px] tw:text-[#40554a] tw:hover:text-[#4aaa70] tw:max-[760px]:text-[12px]"
            >
              Impacto
            </a>
          </nav>

          <div className="
            tw:flex tw:items-center tw:gap-7
            tw:max-[760px]:gap-[13px]
          ">

            <Link
              to="/login"
              className="tw:text-[14px] tw:text-[#40554a] tw:transition-colors tw:hover:text-[#4aaa70]"
            >
              Entrar
            </Link>

            <Link
              to="/cadastro"
              className="
                tw:flex tw:items-center tw:gap-[9px]
                tw:rounded-full tw:bg-[#124638]
                tw:px-5 tw:py-[13px]
                tw:text-[14px] tw:font-semibold tw:text-white
                tw:transition-colors tw:hover:bg-[#1d624d]
                tw:max-[760px]:px-[14px]
                tw:max-[760px]:py-[10px]
                tw:max-[760px]:text-[12px]
              "
            >
              Criar conta
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

      </header>

      <main>

        {/* APRESENTAÇÃO */}
        <section
          className="
            tw:mx-auto tw:grid tw:min-h-[625px]
            tw:w-full tw:max-w-[1300px]
            tw:grid-cols-[1fr_0.9fr]
            tw:items-center tw:gap-[30px]
            tw:px-[35px] tw:py-[65px]
            tw:max-[1000px]:grid-cols-[1fr_0.8fr]
            tw:max-[1000px]:py-[55px]
            tw:max-[760px]:grid-cols-1
            tw:max-[760px]:gap-[55px]
            tw:max-[760px]:px-[22px]
            tw:max-[760px]:pt-[65px]
            tw:max-[760px]:pb-[70px]
          "
          id="solucao"
        >

          {/* TEXTO */}
          <div className="tw:relative tw:z-[2] tw:max-w-[620px]">

            <div className="
              tw:mb-[25px] tw:inline-flex
              tw:items-center tw:gap-[9px]
              tw:rounded-full tw:bg-[#e5eee2]
              tw:px-[15px] tw:py-[11px]
              tw:text-[11px] tw:font-semibold
              tw:text-[#124638]
            ">
              <Leaf size={16} className="tw:text-[#4aaa70]" />
              TECNOLOGIA A FAVOR DE UM MUNDO MELHOR
            </div>

            <h1 className="
              tw:text-[clamp(42px,4.5vw,65px)]
              tw:leading-[1.08] tw:tracking-[-2px]
              tw:font-bold tw:text-[#124638]
              tw:max-[1000px]:text-[45px]
              tw:max-[760px]:text-[43px]
              tw:max-[760px]:tracking-[-1px]
              tw:max-[400px]:text-[36px]
            ">
              Menos desperdício.
              <br />
              <span className="tw:text-[#347657]">
                Mais solidariedade.
              </span>
            </h1>

            <p className="
              tw:mt-[23px] tw:max-w-[550px]
              tw:text-[17px] tw:leading-[1.7]
              tw:text-[#66746b]
              tw:max-[760px]:text-[15px]
            ">
              Uma rede que conecta moradores, comércios e instituições
              para aproveitar melhor os alimentos e ajudar quem precisa.
            </p>

            {/* BOTÕES */}
            <div className="tw:mt-[30px] tw:flex tw:flex-wrap tw:items-center tw:gap-[14px] tw:max-[400px]:flex-col tw:max-[400px]:items-stretch">

              <Link
                to="/cadastro"
                className="
                  tw:inline-flex tw:items-center
                  tw:justify-center tw:gap-[13px]
                  tw:rounded-full tw:bg-[#124638]
                  tw:px-[22px] tw:py-[15px]
                  tw:text-[14px] tw:font-semibold tw:text-white
                  tw:transition-colors tw:hover:bg-[#1d624d]
                  tw:max-[400px]:w-full
                "
              >
                Conheça o sistema
                <ArrowRight size={17} />
              </Link>

              <a
                href="#como-funciona"
                className="
                  tw:inline-flex tw:items-center
                  tw:justify-center tw:gap-[13px]
                  tw:rounded-full tw:border tw:border-[#124638]
                  tw:px-[22px] tw:py-[15px]
                  tw:text-[14px] tw:font-semibold tw:text-[#124638]
                  tw:transition-colors tw:hover:bg-[#e9efe6]
                  tw:max-[400px]:w-full
                "
              >
                Veja como funciona
              </a>

            </div>

            {/* PÚBLICO */}
            <div className="
              tw:mt-[42px] tw:flex tw:flex-wrap
              tw:items-center tw:gap-[13px]
              tw:text-[11px] tw:font-semibold
              tw:text-[#718278]
            ">
              <span>RESIDÊNCIAS</span>
              <i className="tw:text-[#4aaa70]">•</i>
              <span>COMÉRCIOS</span>
              <i className="tw:text-[#4aaa70]">•</i>
              <span>INSTITUIÇÕES</span>
            </div>

            <p className="tw:mt-3 tw:text-[13px] tw:text-[#124638]">
              Prevenir em casa. Redistribuir na comunidade.
            </p>

          </div>

          {/* ILUSTRAÇÃO DO APLICATIVO */}
          <div className="
            tw:relative tw:flex tw:min-h-[540px]
            tw:items-center tw:justify-center
            tw:max-[1000px]:min-h-[500px]
            tw:max-[760px]:min-h-[540px]
          ">

            <div className="
              tw:absolute tw:top-0 tw:right-[15px]
              tw:size-[460px] tw:rounded-full
              tw:bg-[#124638]
              tw:max-[1000px]:size-[350px]
              tw:max-[760px]:top-1/2
              tw:max-[760px]:right-1/2
              tw:max-[760px]:size-[min(390px,90vw)]
              tw:max-[760px]:-translate-y-1/2
              tw:max-[760px]:translate-x-1/2
            "></div>

            <div className="
              tw:absolute tw:right-[-5px] tw:bottom-[-15px]
              tw:size-[190px] tw:rounded-full
              tw:bg-[#dce9d8]
            "></div>

            {/* PRIMEIRO AVISO */}
            <div className="
              tw:absolute tw:top-[145px] tw:left-[-10px]
              tw:z-[4] tw:flex tw:items-center tw:gap-[10px]
              tw:rounded-[15px] tw:bg-white
              tw:px-4 tw:py-[13px]
              tw:shadow-[0_8px_25px_rgba(0,0,0,0.1)]
              tw:max-[1000px]:left-[-25px]
              tw:max-[760px]:left-0
              tw:max-[400px]:left-[-5px]
              tw:max-[400px]:p-[10px]
            ">

              <div className="
                tw:grid tw:size-9 tw:shrink-0
                tw:place-items-center tw:rounded-full
                tw:bg-[#e5f2e8] tw:text-[#124638]
              ">
                <Heart size={20} />
              </div>

              <div>
                <strong className="tw:block tw:text-[11px] tw:text-[#124638]">
                  Doação confirmada
                </strong>

                <small className="tw:mt-[3px] tw:block tw:text-[9px] tw:text-[#758279]">
                  Entrega registrada
                </small>
              </div>

            </div>

            {/* CELULAR */}
            <div className="
              tw:relative tw:z-[2]
              tw:w-[252px] tw:overflow-hidden
              tw:rotate-[2deg] tw:rounded-[42px]
              tw:border-[7px] tw:border-[#10231b]
              tw:bg-[#10231b] tw:p-[6px]
              tw:shadow-[0_22px_45px_rgba(0,0,0,0.2)]
              tw:max-[1000px]:w-[225px]
              tw:max-[760px]:w-[min(252px,70vw)]
            ">

              <img
                src="/images/redepratos-tela.png"
                alt="Tela inicial do aplicativo RedePratos"
                className="tw:block tw:h-auto tw:w-full tw:rounded-[30px]"
              />

            </div>

            {/* SEGUNDO AVISO */}
            <div className="
              tw:absolute tw:right-[-10px] tw:bottom-[50px]
              tw:z-[4] tw:flex tw:items-center tw:gap-[10px]
              tw:rounded-[15px] tw:bg-white
              tw:px-4 tw:py-[13px]
              tw:shadow-[0_8px_25px_rgba(0,0,0,0.1)]
              tw:max-[1000px]:right-[-15px]
              tw:max-[760px]:right-0
              tw:max-[400px]:right-[-5px]
              tw:max-[400px]:p-[10px]
            ">

              <div className="
                tw:grid tw:size-9 tw:shrink-0
                tw:place-items-center tw:rounded-full
                tw:bg-[#def1e2] tw:text-[#124638]
              ">
                <Check size={20} />
              </div>

              <div>
                <strong className="tw:block tw:text-[11px] tw:text-[#124638]">
                  Alimento cadastrado
                </strong>

                <small className="tw:mt-[3px] tw:block tw:text-[9px] tw:text-[#758279]">
                  Na sua despensa
                </small>
              </div>

            </div>

            <span className="
              tw:absolute tw:bottom-[-25px]
              tw:text-[9px] tw:tracking-[1px]
              tw:text-[#819086]
            ">
              PRÉVIA DA PLATAFORMA
            </span>

          </div>

        </section>

        {/* BENEFÍCIOS */}
        <section className="tw:bg-[#edf2e9] tw:py-[35px] tw:max-[760px]:py-[25px]">

          <div className="
            tw:mx-auto tw:grid tw:w-full
            tw:max-w-[1300px] tw:grid-cols-3
            tw:gap-[22px] tw:px-[35px]
            tw:max-[1000px]:grid-cols-1
            tw:max-[760px]:px-[22px]
          ">

            <article className="tw:flex tw:items-center tw:gap-4 tw:rounded-[15px] tw:bg-[rgba(255,255,255,0.5)] tw:p-[17px]">

              <div className="tw:grid tw:size-[43px] tw:shrink-0 tw:place-items-center tw:rounded-xl tw:bg-[#dcecdf] tw:text-[#26814e]">
                <Check size={23} />
              </div>

              <div>
                <h3 className="tw:mb-[6px] tw:text-[15px] tw:font-bold">
                  Previna o desperdício
                </h3>

                <p className="tw:text-[12px] tw:leading-[1.5] tw:text-[#758279]">
                  Organize os alimentos e acompanhe suas validades.
                </p>
              </div>

            </article>

            <article className="tw:flex tw:items-center tw:gap-4 tw:rounded-[15px] tw:bg-[rgba(255,255,255,0.5)] tw:p-[17px]">

              <div className="tw:grid tw:size-[43px] tw:shrink-0 tw:place-items-center tw:rounded-xl tw:bg-[#dcecdf] tw:text-[#26814e]">
                <Heart size={23} />
              </div>

              <div>
                <h3 className="tw:mb-[6px] tw:text-[15px] tw:font-bold">
                  Conecte doações
                </h3>

                <p className="tw:text-[12px] tw:leading-[1.5] tw:text-[#758279]">
                  Aproxime quem pode doar de quem precisa receber.
                </p>
              </div>

            </article>

            <article className="tw:flex tw:items-center tw:gap-4 tw:rounded-[15px] tw:bg-[rgba(255,255,255,0.5)] tw:p-[17px]">

              <div className="tw:grid tw:size-[43px] tw:shrink-0 tw:place-items-center tw:rounded-xl tw:bg-[#dcecdf] tw:text-[#26814e]">
                <ArrowRight size={23} />
              </div>

              <div>
                <h3 className="tw:mb-[6px] tw:text-[15px] tw:font-bold">
                  Acompanhe o impacto
                </h3>

                <p className="tw:text-[12px] tw:leading-[1.5] tw:text-[#758279]">
                  Veja a diferença que suas ações podem fazer.
                </p>
              </div>

            </article>

          </div>

        </section>

        {/* COMO FUNCIONA */}
        <section
          className="
            tw:mx-auto tw:w-full tw:max-w-[1300px]
            tw:px-[35px] tw:py-[100px]
            tw:max-[760px]:px-[22px]
            tw:max-[760px]:py-[65px]
          "
          id="como-funciona"
        >

          <div className="tw:mb-10 tw:max-w-[650px]">

            <span className="tw:text-[11px] tw:font-semibold tw:tracking-[1px] tw:text-[#48835b]">
              COMO FUNCIONA
            </span>

            <h2 className="tw:my-[14px] tw:text-[37px] tw:font-bold tw:text-[#124638] tw:max-[760px]:text-[29px]">
              Um pequeno passo pode fazer diferença.
            </h2>

            <p className="tw:text-[15px] tw:leading-[1.7] tw:text-[#758279]">
              O RedePratos aproxima pessoas e instituições para que
              alimentos sejam melhor aproveitados.
            </p>

          </div>

          <div className="tw:grid tw:grid-cols-3 tw:gap-[22px] tw:max-[760px]:grid-cols-1">

            <article className="
              tw:rounded-[17px] tw:border tw:border-[#e8eae2]
              tw:bg-white tw:p-7 tw:transition-transform
              tw:hover:-translate-y-1
            ">

              <div className="tw:grid tw:size-[42px] tw:place-items-center tw:rounded-full tw:bg-[#e8f1e7] tw:text-[13px] tw:font-semibold tw:text-[#124638]">
                01
              </div>

              <h3 className="tw:mt-6 tw:mb-[10px] tw:text-[17px] tw:font-bold">
                Cadastre seus alimentos
              </h3>

              <p className="tw:text-[13px] tw:leading-[1.6] tw:text-[#758279]">
                Organize sua despensa ou estoque e acompanhe
                os alimentos cadastrados.
              </p>

            </article>

            <article className="
              tw:rounded-[17px] tw:border tw:border-[#e8eae2]
              tw:bg-white tw:p-7 tw:transition-transform
              tw:hover:-translate-y-1
            ">

              <div className="tw:grid tw:size-[42px] tw:place-items-center tw:rounded-full tw:bg-[#e8f1e7] tw:text-[13px] tw:font-semibold tw:text-[#124638]">
                02
              </div>

              <h3 className="tw:mt-6 tw:mb-[10px] tw:text-[17px] tw:font-bold">
                Compartilhe excedentes
              </h3>

              <p className="tw:text-[13px] tw:leading-[1.6] tw:text-[#758279]">
                Disponibilize alimentos que podem ser aproveitados
                por outras pessoas.
              </p>

            </article>

            <article className="
              tw:rounded-[17px] tw:border tw:border-[#e8eae2]
              tw:bg-white tw:p-7 tw:transition-transform
              tw:hover:-translate-y-1
            ">

              <div className="tw:grid tw:size-[42px] tw:place-items-center tw:rounded-full tw:bg-[#e8f1e7] tw:text-[13px] tw:font-semibold tw:text-[#124638]">
                03
              </div>

              <h3 className="tw:mt-6 tw:mb-[10px] tw:text-[17px] tw:font-bold">
                Conecte-se a instituições
              </h3>

              <p className="tw:text-[13px] tw:leading-[1.6] tw:text-[#758279]">
                Organizações podem encontrar doações e solicitar
                alimentos disponíveis.
              </p>

            </article>

          </div>

        </section>

        {/* IMPACTO */}
        <section className="tw:bg-[#124638] tw:py-[65px]" id="impacto">

          <div className="
            tw:mx-auto tw:flex tw:w-full
            tw:max-w-[1300px] tw:items-center
            tw:justify-between tw:gap-10
            tw:px-[35px]
            tw:max-[760px]:flex-col
            tw:max-[760px]:items-start
            tw:max-[760px]:px-[22px]
          ">

            <div className="tw:max-w-[670px]">

              <span className="tw:text-[11px] tw:font-semibold tw:tracking-[1px] tw:text-[#9ed2ab]">
                JUNTOS PODEMOS FAZER MAIS
              </span>

              <h2 className="tw:my-[14px] tw:text-[34px] tw:leading-[1.25] tw:font-bold tw:text-white tw:max-[760px]:text-[28px]">
                O alimento que sobra para você
                pode fazer a diferença para alguém.
              </h2>

              <p className="tw:text-[14px] tw:leading-[1.7] tw:text-[#d4e1d7]">
                Faça parte de uma rede que transforma o aproveitamento
                de alimentos em uma ação de solidariedade.
              </p>

            </div>

            <Link
              to="/cadastro"
              className="
                tw:inline-flex tw:shrink-0
                tw:items-center tw:justify-center
                tw:gap-[13px] tw:rounded-full
                tw:bg-white tw:px-[22px] tw:py-[15px]
                tw:text-[14px] tw:font-semibold
                tw:whitespace-nowrap tw:text-[#124638]
                tw:transition-colors tw:hover:bg-[#e8f1e7]
                tw:max-[760px]:whitespace-normal
              "
            >
              Faça parte do RedePratos
              <ArrowRight size={17} />
            </Link>

          </div>

        </section>

      </main>

      {/* RODAPÉ */}
      <footer className="tw:py-7">

        <div className="
          tw:mx-auto tw:flex tw:w-full
          tw:max-w-[1300px] tw:items-center
          tw:justify-between tw:gap-5
          tw:px-[35px]
          tw:max-[760px]:flex-col
          tw:max-[760px]:items-start
          tw:max-[760px]:px-[22px]
        ">

          <Logo />

          <p className="tw:text-[12px] tw:text-[#758279]">
            Menos desperdício. Mais solidariedade.
          </p>

          <span className="tw:text-[12px] tw:text-[#758279]">
            © 2026 RedePratos
          </span>

        </div>

      </footer>

    </div>
  )
}

export default Home
