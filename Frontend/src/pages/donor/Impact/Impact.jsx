import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
import { apiRequest } from '../../../services/api.js'

const formatador = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2
})

function formatarQuantidades(quantidades) {
  const unidades = Object.entries(quantidades)

  if (unidades.length === 0) {
    return '0'
  }

  return unidades
    .map(([unidade, quantidade]) => {
      return `${formatador.format(quantidade)} ${unidade}`
    })
    .join(' / ')
}

function Impact() {
  const [impacto, setImpacto] = useState({
    doacoesConcluidas: 0,
    instituicoesAjudadas: 0,
    quantidadesPorUnidade: {}
  })

  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  const [idUsuario] = useState(() => {
    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      return usuario?.id || null
    } catch {
      return null
    }
  })

  useEffect(() => {
    let componenteAtivo = true

    async function carregarImpacto() {
      if (!idUsuario) {
        setErro('Não foi possível identificar o usuário. Faça login novamente.')
        setCarregando(false)
        return
      }

      try {
        const dados = await apiRequest(
          `/api/solicitacoes/doador?id_usuario=${idUsuario}`
        )

        if (!componenteAtivo) return

        const solicitacoes = Array.isArray(dados)
          ? dados
          : dados?.solicitacoes

        if (!Array.isArray(solicitacoes)) {
          throw new Error('Não foi possível carregar os dados do seu impacto.')
        }

        const concluidas = solicitacoes.filter(
          (solicitacao) => solicitacao.status === 'concluida'
        )

        const doacoesPorId = new Map()

        concluidas.forEach((solicitacao) => {
          const idDoacao = solicitacao.id_doacao ?? solicitacao.id_solicitacao

          if (idDoacao !== null && idDoacao !== undefined) {
            doacoesPorId.set(String(idDoacao), solicitacao)
          }
        })

        const doacoesConcluidas = Array.from(doacoesPorId.values())

        const instituicoes = new Set(
          doacoesConcluidas
            .map((doacao) => doacao.id_instituicao)
            .filter((id) => id !== null && id !== undefined)
            .map(String)
        )

        const quantidades = new Map()

        doacoesConcluidas.forEach((doacao) => {
          const quantidade = Number(doacao.quantidade)

          if (!Number.isFinite(quantidade) || quantidade <= 0) {
            return
          }

          const unidade = typeof doacao.unidade === 'string' && doacao.unidade.trim()
            ? doacao.unidade.trim().toLowerCase()
            : 'unidade'

          const totalAtual = quantidades.get(unidade) || 0

          quantidades.set(unidade, totalAtual + quantidade)
        })

        setImpacto({
          doacoesConcluidas: doacoesConcluidas.length,
          instituicoesAjudadas: instituicoes.size,
          quantidadesPorUnidade: Object.fromEntries(quantidades)
        })
      } catch (error) {
        if (componenteAtivo) {
          setErro(error.message || 'Não foi possível carregar seu impacto.')
        }
      } finally {
        if (componenteAtivo) {
          setCarregando(false)
        }
      }
    }

    carregarImpacto()

    return () => {
      componenteAtivo = false
    }
  }, [idUsuario])

  const metasConquistas = [1, 5, 10, 20]

  const metaAtual = metasConquistas.find(
    (meta) => impacto.doacoesConcluidas < meta
  )

  const proximaMeta = metaAtual || 20

  const progresso = Math.min(
    (impacto.doacoesConcluidas / proximaMeta) * 100,
    100
  )

  const faltamDoacoes = Math.max(
    proximaMeta - impacto.doacoesConcluidas,
    0
  )

  let nivelAtual = 0

  if (impacto.doacoesConcluidas >= 20) {
    nivelAtual = 4
  } else if (impacto.doacoesConcluidas >= 10) {
    nivelAtual = 3
  } else if (impacto.doacoesConcluidas >= 5) {
    nivelAtual = 2
  } else if (impacto.doacoesConcluidas >= 1) {
    nivelAtual = 1
  }

  const nomesNiveis = [
    'Novo colaborador',
    'Primeiro passo',
    'Doador solidário',
    'Guardião dos alimentos',
    'Embaixador RedePratos'
  ]

  const definicaoConquistas = [
    {
      id: 1,
      titulo: 'Primeiro passo',
      descricao: 'Realize sua primeira doação.',
      requisito: 1,
      textoRequisito: '1 doação concluída',
      icone: Sprout
    },
    {
      id: 2,
      titulo: 'Doador solidário',
      descricao: 'Complete 5 doações e ajude a combater o desperdício.',
      requisito: 5,
      textoRequisito: '5 doações concluídas',
      icone: HeartHandshake
    },
    {
      id: 3,
      titulo: 'Guardião dos alimentos',
      descricao: 'Alcance a marca de 10 doações concluídas.',
      requisito: 10,
      textoRequisito: '10 doações concluídas',
      icone: Leaf
    },
    {
      id: 4,
      titulo: 'Embaixador RedePratos',
      descricao: 'Complete 20 doações e inspire outras pessoas.',
      requisito: 20,
      textoRequisito: '20 doações concluídas',
      icone: Trophy
    }
  ]

  const conquistas = definicaoConquistas.map((conquista) => ({
    ...conquista,
    desbloqueada: impacto.doacoesConcluidas >= conquista.requisito
  }))

  return (
    <div className="tw:flex tw:min-h-screen tw:bg-[#f7f6ef] tw:max-[760px]:flex-col">

      <DonorSidebar />

      <main className="tw:min-w-0 tw:flex-1 tw:px-[45px] tw:pb-[35px] tw:max-[1100px]:px-[25px] tw:max-[1100px]:pb-[30px] tw:max-[760px]:px-[18px] tw:max-[760px]:pb-[25px]">

        <header className="tw:flex tw:h-[75px] tw:items-center tw:justify-between tw:border-b tw:border-[#e8eae2]">

          <div className="tw:flex tw:items-center tw:gap-[10px] tw:text-[12px] tw:text-[#87938a] tw:max-[450px]:text-[10px]">
            <span>RedePratos</span>
            <span>/</span>
            <strong className="tw:text-[#315c43]">
              Meu impacto
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

        {erro && (
          <p className="tw:mb-5 tw:rounded-xl tw:bg-[#fff0ed] tw:p-3 tw:text-sm tw:text-[#b94b42]" role="alert">
            {erro}
          </p>
        )}

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
                  {carregando ? 'Carregando...' : nomesNiveis[nivelAtual]}
                </h2>

                <p className="tw:mt-1 tw:text-[11px] tw:text-[#718575]">
                  {carregando
                    ? 'Buscando suas contribuições.'
                    : 'Você já está fazendo a diferença!'}
                </p>
              </div>

            </div>

            <div className="tw:rounded-full tw:border tw:border-[#cbdcc9] tw:bg-white/70 tw:px-4 tw:py-2 tw:text-[11px] tw:font-semibold tw:text-[#477b57]">
              Nível {nivelAtual}
            </div>

          </div>

          <div className="tw:mt-7">

            <div className="tw:mb-2 tw:flex tw:items-center tw:justify-between tw:gap-3">
              <span className="tw:text-[11px] tw:font-semibold tw:text-[#496b51]">
                Próxima conquista
              </span>

              <span className="tw:text-[11px] tw:font-bold tw:text-[#477b57]">
                {carregando
                  ? '...'
                  : `${impacto.doacoesConcluidas}/${proximaMeta} doações`}
              </span>
            </div>

            <div
              className="tw:h-[9px] tw:overflow-hidden tw:rounded-full tw:bg-[#d5e2d2]"
              role="progressbar"
              aria-label="Progresso para a próxima conquista"
              aria-valuenow={carregando ? 0 : progresso}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="tw:h-full tw:rounded-full tw:bg-[#54845d] tw:transition-all"
                style={{ width: `${carregando ? 0 : progresso}%` }}
              />
            </div>

            <p className="tw:mt-2 tw:text-[10px] tw:text-[#718575]">
              {carregando
                ? 'Calculando seu progresso...'
                : faltamDoacoes > 0
                  ? `Faltam ${faltamDoacoes} ${faltamDoacoes === 1 ? 'doação' : 'doações'} para desbloquear ${nomesNiveis[nivelAtual + 1]}.`
                  : 'Você alcançou todas as conquistas disponíveis!'}
            </p>

          </div>

        </section>

        <section className="tw:mb-[25px] tw:grid tw:grid-cols-3 tw:gap-[17px] tw:max-[760px]:grid-cols-1">

          <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
              <span>Doações concluídas</span>
              <PackageCheck size={21} className="tw:text-[#528463]" />
            </div>

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
              {carregando
                ? '...'
                : impacto.doacoesConcluidas.toString().padStart(2, '0')}
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

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:break-words tw:text-[22px] tw:font-bold tw:text-[#244d39]">
              {carregando
                ? '...'
                : formatarQuantidades(impacto.quantidadesPorUnidade)}
            </strong>

            <small className="tw:text-[10px] tw:text-[#8c978e]">
              Quantidade por unidade
            </small>

          </article>

          <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
              <span>Instituições ajudadas</span>
              <HeartHandshake size={21} className="tw:text-[#528463]" />
            </div>

            <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
              {carregando
                ? '...'
                : impacto.instituicoesAjudadas.toString().padStart(2, '0')}
            </strong>

            <small className="tw:text-[10px] tw:text-[#8c978e]">
              Instituições alcançadas
            </small>

          </article>

        </section>

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
                        : conquista.textoRequisito}
                    </span>

                  </div>

                </article>
              )
            })}

          </div>

        </section>

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
            to="/doador/solicitacoes"
            aria-label="Ver minhas solicitações"
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
