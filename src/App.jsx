import {
  ArrowRight,
  Bell,
  Check,
  Clock,
  Heart,
  Leaf,
  Plus
} from 'lucide-react'

function Logo() {
  return (
    <a href="/" className="logo">
      <Leaf size={27} strokeWidth={2.5} />
      <span>RedePratos</span>
    </a>
  )
}

function App() {
  return (
    <div className="pagina">

      {/* CABEÇALHO */}
      <header className="cabecalho">
        <div className="container header-conteudo">

          <Logo />

          <nav className="menu">
            <a href="#solucao">A solução</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#impacto">Impacto</a>
          </nav>

          <div className="acoes-header">
            <a href="/login" className="entrar">
              Entrar
            </a>

            <a href="/cadastro" className="botao-header">
              Criar conta
              <ArrowRight size={16} />
            </a>
          </div>

        </div>
      </header>

      <main>

        {/* APRESENTAÇÃO */}
        <section className="hero container" id="solucao">

          <div className="hero-texto">

            <div className="etiqueta">
              <Leaf size={16} />
              TECNOLOGIA A FAVOR DE UM MUNDO MELHOR
            </div>

            <h1>
              Menos desperdício.
              <br />
              <span>Mais solidariedade.</span>
            </h1>

            <p className="descricao-hero">
              Uma rede que conecta moradores, comércios e instituições
              para aproveitar melhor os alimentos e ajudar quem precisa.
            </p>

            <div className="botoes-hero">

              <a href="/cadastro" className="botao-principal">
                Conheça o projeto
                <ArrowRight size={17} />
              </a>

              <a href="#como-funciona" className="botao-outline">
                Veja como funciona
              </a>

            </div>

            <div className="publico">
              <span>RESIDÊNCIAS</span>
              <i>•</i>
              <span>COMÉRCIOS</span>
              <i>•</i>
              <span>INSTITUIÇÕES</span>
            </div>

            <p className="frase-final">
              Prevenir em casa. Redistribuir na comunidade.
            </p>

          </div>

          {/* ILUSTRAÇÃO DO APLICATIVO */}
          <div className="hero-visual">

            <div className="circulo-verde"></div>
            <div className="circulo-claro"></div>

            {/* AVISO FLUTUANTE */}
            <div className="aviso-flutuante aviso-um">

              <div className="aviso-icone">
                <Heart size={20} />
              </div>

              <div>
                <strong>Doação confirmada</strong>
                <small>Entrega registrada</small>
              </div>

            </div>

            {/* CELULAR */}
            <div className="celular">

              <div className="notch"></div>

              <div className="tela-celular">

                <div className="marca-celular">
                  <Logo />
                  <Bell size={17} />
                </div>

                <div className="saudacao-celular">
                  <h3>Olá!</h3>
                  <p>Veja como estão seus alimentos.</p>
                </div>

                <div className="resumo-celular">
                  <small>ALIMENTOS APROVEITADOS</small>

                  <strong>3,2 kg</strong>

                  <span>Exemplo ilustrativo</span>
                </div>

                <div className="atencao-celular">

                  <Clock size={20} />

                  <div>
                    <strong>Fique de olho</strong>
                    <small>
                      Alimentos próximos da validade.
                    </small>
                  </div>

                </div>

                <div className="titulo-lista">
                  <strong>Minha despensa</strong>
                  <small>Ver todos</small>
                </div>

                {/* TOMATE */}
                <div className="item-celular">

                  <div className="mini-alimento tomate">
                    <img src="/icons/tomate.svg" alt="Tomate" />
                  </div>

                  <div>
                    <strong>Tomates</strong>
                    <small>4 unidades</small>
                  </div>

                  <span className="validade hoje">
                    Hoje
                  </span>

                </div>

                {/* ARROZ */}
                <div className="item-celular">

                  <div className="mini-alimento arroz">
                    <img src="/icons/arroz.svg" alt="arroz" />
                  </div>

                  <div>
                    <strong>arroz</strong>
                    <small>1 unidade</small>
                  </div>

                  <span className="validade">
                    3 dias
                  </span>

                </div>

              </div>
            </div>

            {/* SEGUNDO AVISO */}
            <div className="aviso-flutuante aviso-dois">

              <div className="aviso-icone verde">
                <Check size={20} />
              </div>

              <div>
                <strong>Alimento cadastrado</strong>
                <small>Na sua despensa</small>
              </div>

            </div>

            <span className="texto-ilustrativo">
              PRÉVIA DA PLATAFORMA
            </span>

          </div>

        </section>

        {/* BENEFÍCIOS */}
        <section className="beneficios">

          <div className="container beneficios-conteudo">

            <article className="beneficio">

              <div className="beneficio-icone">
                <Check size={23} />
              </div>

              <div>
                <h3>Previna o desperdício</h3>
                <p>
                  Organize os alimentos e acompanhe suas validades.
                </p>
              </div>

            </article>

            <article className="beneficio">

              <div className="beneficio-icone">
                <Heart size={23} />
              </div>

              <div>
                <h3>Conecte doações</h3>
                <p>
                  Aproxime quem pode doar de quem precisa receber.
                </p>
              </div>

            </article>

            <article className="beneficio">

              <div className="beneficio-icone">
                <ArrowRight size={23} />
              </div>

              <div>
                <h3>Acompanhe o impacto</h3>
                <p>
                  Veja a diferença que suas ações podem fazer.
                </p>
              </div>

            </article>

          </div>

        </section>

        {/* COMO FUNCIONA */}
        <section className="como-funciona container" id="como-funciona">

          <div className="titulo-secao">

            <span>COMO FUNCIONA</span>

            <h2>
              Um pequeno passo pode fazer diferença.
            </h2>

            <p>
              O RedePratos aproxima pessoas e instituições para que
              alimentos sejam melhor aproveitados.
            </p>

          </div>

          <div className="etapas">

            <article className="etapa">

              <div className="numero-etapa">01</div>

              <h3>Cadastre seus alimentos</h3>

              <p>
                Organize sua despensa ou estoque e acompanhe
                os alimentos cadastrados.
              </p>

            </article>

            <article className="etapa">

              <div className="numero-etapa">02</div>

              <h3>Compartilhe excedentes</h3>

              <p>
                Disponibilize alimentos que podem ser aproveitados
                por outras pessoas.
              </p>

            </article>

            <article className="etapa">

              <div className="numero-etapa">03</div>

              <h3>Conecte-se a instituições</h3>

              <p>
                Organizações podem encontrar doações e solicitar
                alimentos disponíveis.
              </p>

            </article>

          </div>

        </section>

        {/* IMPACTO */}
        <section className="impacto" id="impacto">

          <div className="container impacto-conteudo">

            <div>

              <span>JUNTOS PODEMOS FAZER MAIS</span>

              <h2>
                O alimento que sobra para você
                pode fazer a diferença para alguém.
              </h2>

              <p>
                Faça parte de uma rede que transforma o aproveitamento
                de alimentos em uma ação de solidariedade.
              </p>

            </div>

            <a href="/cadastro" className="botao-claro">
              Faça parte do RedePratos
              <ArrowRight size={17} />
            </a>

          </div>

        </section>

      </main>

      {/* RODAPÉ */}
      <footer className="rodape">

        <div className="container rodape-conteudo">

          <Logo />

          <p>
            Menos desperdício. Mais solidariedade.
          </p>

          <span>
            © 2026 RedePratos
          </span>

        </div>

      </footer>

    </div>
  )
}

export default App