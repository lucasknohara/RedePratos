
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Bell,
  UserRound,
  Pencil,
  X,
  Save,
  History,
  Gift,
  ChevronRight,
  Sprout,
  Heart,
  Award,
  PackageCheck,
  Scale
} from 'lucide-react'

import DonorSidebar from '../../../components/layout/DonorSidebar/DonorSidebar.jsx'
import { apiRequest } from '../../../services/api.js'

const perfilInicial = {
  nome: '',
  email: '',
  telefone: '',
  origem: 'residencia'
}

const conquistasBase = [
  {
    id: 1,
    titulo: 'Primeiro passo',
    descricao: 'Primeira doação',
    meta: 1,
    icone: Sprout,
    cor: 'tw:bg-[#DDF5DF] tw:text-[#39845A]'
  },
  {
    id: 2,
    titulo: 'Doador solidário',
    descricao: '5 doações realizadas',
    meta: 5,
    icone: Heart,
    cor: 'tw:bg-[#FFE1E1] tw:text-[#D86A6A]'
  },
  {
    id: 3,
    titulo: 'Guardião dos alimentos',
    descricao: '10 doações realizadas',
    meta: 10,
    icone: Award,
    cor: 'tw:bg-[#E1EAFF] tw:text-[#5487C2]'
  }
]

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

function Profile() {
  const [perfil, setPerfil] = useState(perfilInicial)
  const [formulario, setFormulario] = useState(perfilInicial)
  const [editando, setEditando] = useState(false)
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  const [impacto, setImpacto] = useState({
    doacoesConcluidas: 0,
    quantidadesPorUnidade: {}
  })

  const [carregandoImpacto, setCarregandoImpacto] = useState(true)
  const [erroImpacto, setErroImpacto] = useState('')

  const [idUsuario] = useState(() => {
    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      return usuario?.id || null
    } catch {
      return null
    }
  })

  // Carregamento do perfil e do impacto
  useEffect(() => {
    let componenteAtivo = true

    async function carregarPerfil() {
      try {
        const dados = await apiRequest(
          `/api/usuarios/${idUsuario}/perfil`
        )

        if (!componenteAtivo) return

        const perfilCarregado = {
          nome: dados.nome || '',
          email: dados.email || '',
          telefone: dados.telefone || '',
          origem: dados.origem || 'residencia'
        }

        setPerfil(perfilCarregado)
        setFormulario(perfilCarregado)
      } catch (error) {
        if (componenteAtivo) {
          setErro(error.message || 'Não foi possível carregar seu perfil.')
        }
      } finally {
        if (componenteAtivo) {
          setCarregando(false)
        }
      }
    }

    async function carregarImpacto() {
      try {
        const dados = await apiRequest(
          `/api/solicitacoes/doador?id_usuario=${idUsuario}`
        )

        if (!componenteAtivo) return

        const solicitacoes = Array.isArray(dados)
          ? dados
          : dados?.solicitacoes

        if (!Array.isArray(solicitacoes)) {
          throw new Error('Não foi possível carregar os dados do impacto.')
        }

        const concluidas = solicitacoes.filter(
          (solicitacao) => solicitacao.status === 'concluida'
        )

        const doacoesUnicas = new Map()

        concluidas.forEach((solicitacao) => {
          const idDoacao = solicitacao.id_doacao ?? solicitacao.id_solicitacao

          if (idDoacao !== null && idDoacao !== undefined) {
            doacoesUnicas.set(String(idDoacao), solicitacao)
          }
        })

        const doacoesConcluidas = Array.from(doacoesUnicas.values())
        const quantidades = new Map()

        doacoesConcluidas.forEach((doacao) => {
          const quantidade = Number(doacao.quantidade)

          if (!Number.isFinite(quantidade) || quantidade <= 0) {
            return
          }

          const unidade = typeof doacao.unidade === 'string' && doacao.unidade.trim()
            ? doacao.unidade.trim().toLowerCase()
            : 'unidade'

          quantidades.set(
            unidade,
            (quantidades.get(unidade) || 0) + quantidade
          )
        })

        setImpacto({
          doacoesConcluidas: doacoesConcluidas.length,
          quantidadesPorUnidade: Object.fromEntries(quantidades)
        })
      } catch (error) {
        if (componenteAtivo) {
          setErroImpacto(error.message || 'Não foi possível carregar seu impacto.')
        }
      } finally {
        if (componenteAtivo) {
          setCarregandoImpacto(false)
        }
      }
    }

    if (!idUsuario) {
      setErro('Não foi possível identificar o usuário. Faça login novamente.')
      setCarregando(false)
      setCarregandoImpacto(false)
      return
    }

    carregarPerfil()
    carregarImpacto()

    return () => {
      componenteAtivo = false
    }
  }, [idUsuario])

  // Cálculo do nível e das conquistas
  const metas = [1, 5, 10, 20]
  const doacoesConcluidas = impacto.doacoesConcluidas

  const nivelAtual = metas.filter(
    (meta) => doacoesConcluidas >= meta
  ).length

  const nomesNiveis = [
    'Novo colaborador',
    'Primeiro passo',
    'Doador solidário',
    'Guardião dos alimentos',
    'Embaixador RedePratos'
  ]

  const proximaMeta = metas.find(
    (meta) => doacoesConcluidas < meta
  )

  const progresso = proximaMeta
    ? Math.min((doacoesConcluidas / proximaMeta) * 100, 100)
    : 100

  const faltamDoacoes = proximaMeta
    ? proximaMeta - doacoesConcluidas
    : 0

  const conquistas = conquistasBase.map((conquista) => ({
    ...conquista,
    desbloqueada: doacoesConcluidas >= conquista.meta
  }))

  const inicial = perfil.nome.trim()
    ? perfil.nome.trim().charAt(0).toUpperCase()
    : 'U'

  // Edição do perfil
  function iniciarEdicao() {
    setFormulario(perfil)
    setMensagem('')
    setErro('')
    setEditando(true)
  }

  function cancelarEdicao() {
    setFormulario(perfil)
    setErro('')
    setEditando(false)
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormulario((atual) => ({
      ...atual,
      [name]: value
    }))
  }

  async function salvarPerfil(event) {
    event.preventDefault()

    if (salvando) return

    setSalvando(true)
    setErro('')
    setMensagem('')

    try {
      const dadosAtualizados = await apiRequest(
        `/api/usuarios/${idUsuario}/perfil`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nome: formulario.nome,
            email: formulario.email,
            telefone: formulario.telefone,
            origem: formulario.origem
          })
        }
      )

      const perfilAtualizado = {
        nome: dadosAtualizados.nome || '',
        email: dadosAtualizados.email || '',
        telefone: dadosAtualizados.telefone || '',
        origem: dadosAtualizados.origem || 'residencia'
      }

      setPerfil(perfilAtualizado)
      setFormulario(perfilAtualizado)

      let usuarioSalvo = {}

      try {
        usuarioSalvo = JSON.parse(
          localStorage.getItem('usuario') || '{}'
        )
      } catch {
        usuarioSalvo = {}
      }

      localStorage.setItem(
        'usuario',
        JSON.stringify({
          ...usuarioSalvo,
          nome: perfilAtualizado.nome,
          email: perfilAtualizado.email
        })
      )

      setEditando(false)
      setMensagem('Perfil atualizado com sucesso!')
    } catch (error) {
      setErro(error.message || 'Não foi possível atualizar seu perfil.')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="tw:flex tw:min-h-screen tw:bg-[#f7f6ef] tw:max-[760px]:flex-col">

      <DonorSidebar />

      <main className="tw:min-w-0 tw:flex-1 tw:px-[45px] tw:pb-[35px] tw:max-[1100px]:px-[25px] tw:max-[1100px]:pb-[30px] tw:max-[760px]:px-[18px] tw:max-[760px]:pb-[25px]">

        {/* Cabeçalho */}
        <header className="tw:flex tw:h-[75px] tw:items-center tw:justify-between tw:border-b tw:border-[#e8eae2]">

          <div className="tw:flex tw:items-center tw:gap-[10px] tw:text-[12px] tw:text-[#87938a] tw:max-[450px]:text-[10px]">
            <span>RedePratos</span>
            <span>/</span>
            <strong className="tw:text-[#315c43]">
              Meu perfil
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

        {/* Apresentação */}
        <section className="tw:py-[30px]">

          <span className="tw:text-[10px] tw:font-bold tw:tracking-[1px] tw:text-[#689171]">
            SEU ESPAÇO NO REDEPRATOS
          </span>

          <h1 className="tw:my-[9px] tw:text-[30px] tw:font-bold tw:tracking-[-0.7px] tw:text-[#124638]">
            Meu perfil
          </h1>

          <p className="tw:text-[13px] tw:text-[#78847b]">
            Acompanhe sua jornada de impacto.
          </p>

        </section>

        {/* Cartão de perfil */}
        <section className="tw:mb-[22px] tw:flex tw:items-center tw:gap-5 tw:rounded-2xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[600px]:flex-col tw:max-[600px]:items-start">

          <div className="tw:grid tw:size-[76px] tw:shrink-0 tw:place-items-center tw:rounded-full tw:border-[5px] tw:border-[#dceee0] tw:bg-[#4fa86c] tw:text-[22px] tw:font-bold tw:text-white">
            {inicial}
          </div>

          <div className="tw:min-w-0 tw:flex-1">

            <h2 className="tw:text-[19px] tw:font-bold tw:text-[#244d39]">
              {carregando ? 'Carregando perfil...' : perfil.nome || 'Usuário'}
            </h2>

            <p className="tw:mt-1 tw:text-[11px] tw:text-[#8c978e]">
              Membro do RedePratos
            </p>

            <span className="tw:mt-2 tw:inline-flex tw:items-center tw:gap-1.5 tw:rounded-full tw:bg-[#e8f5e9] tw:px-3 tw:py-1 tw:text-[10px] tw:font-semibold tw:text-[#39845A]">
              <UserRound size={12} />
              Doador
            </span>

          </div>

          <button
            type="button"
            onClick={iniciarEdicao}
            disabled={carregando || !idUsuario || Boolean(erro)}
            className="tw:flex tw:items-center tw:gap-2 tw:rounded-full tw:bg-[#e8f5e9] tw:px-4 tw:py-2.5 tw:text-[11px] tw:font-semibold tw:text-[#39845A] tw:transition-colors tw:hover:bg-[#d8eddb] tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
          >
            <Pencil size={14} />
            Editar perfil
          </button>

        </section>

        {mensagem && (
          <p className="tw:mb-5 tw:rounded-xl tw:bg-[#e8f5e9] tw:p-3 tw:text-sm tw:text-[#39845A]">
            {mensagem}
          </p>
        )}

        {erro && (
          <p className="tw:mb-5 tw:rounded-xl tw:bg-[#fff0ed] tw:p-3 tw:text-sm tw:text-[#b94b42]">
            {erro}
          </p>
        )}

        {/* Seu impacto */}
        <section className="tw:mb-[22px]">

          <div className="tw:mb-3 tw:flex tw:items-center tw:justify-between">
            <h2 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
              Seu impacto
            </h2>

            <Link
              to="/doador/meu-impacto"
              className="tw:flex tw:items-center tw:gap-1 tw:text-[11px] tw:font-bold tw:text-[#39845A] hover:tw:text-[#244d39]"
            >
              Ver detalhes
              <ChevronRight size={15} />
            </Link>
          </div>

          <div className="tw:grid tw:grid-cols-2 tw:gap-4">

            <article className="tw:rounded-2xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:text-center">

              <Scale
                size={20}
                className="tw:mx-auto tw:mb-2 tw:text-[#54845D]"
              />

              <strong className="tw:block tw:break-words tw:text-[22px] tw:font-bold tw:text-[#244d39]">
                {carregandoImpacto
                  ? '...'
                  : formatarQuantidades(impacto.quantidadesPorUnidade)}
              </strong>

              <span className="tw:mt-1 tw:block tw:text-[11px] tw:text-[#87938a]">
                Alimentos doados
              </span>

            </article>

            <article className="tw:rounded-2xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:text-center">

              <PackageCheck
                size={20}
                className="tw:mx-auto tw:mb-2 tw:text-[#39845A]"
              />

              <strong className="tw:block tw:text-[25px] tw:font-bold tw:text-[#39845A]">
                {carregandoImpacto
                  ? '...'
                  : doacoesConcluidas.toString().padStart(2, '0')}
              </strong>

              <span className="tw:mt-1 tw:block tw:text-[11px] tw:text-[#87938a]">
                Doações confirmadas
              </span>

            </article>

          </div>

          {erroImpacto && (
            <p className="tw:mt-3 tw:rounded-xl tw:bg-[#fff0ed] tw:p-3 tw:text-sm tw:text-[#b94b42]">
              {erroImpacto}
            </p>
          )}

        </section>

        {/* Jornada e progresso */}
        <section className="tw:mb-[25px] tw:rounded-2xl tw:bg-[#124638] tw:p-6 tw:text-white tw:max-[600px]:p-5">

          <div className="tw:flex tw:items-center tw:gap-3">

            <div className="tw:grid tw:size-10 tw:shrink-0 tw:place-items-center tw:rounded-full tw:bg-white/15 tw:text-[#D7EDCF]">
              <Award size={22} />
            </div>

            <div>
              <h2 className="tw:text-[14px] tw:font-bold">
                Sua jornada está crescendo
              </h2>

              <p className="tw:mt-1 tw:text-[10px] tw:text-[#d1e4d8]">
                {carregandoImpacto
                  ? 'Calculando seu progresso...'
                  : proximaMeta
                    ? `Faltam ${faltamDoacoes} ${faltamDoacoes === 1 ? 'doação' : 'doações'} para o próximo nível.`
                    : 'Você alcançou todas as conquistas disponíveis!'}
              </p>
            </div>

          </div>

          <div className="tw:mt-5">

            <div className="tw:mb-2 tw:flex tw:items-center tw:justify-between tw:text-[10px] tw:text-[#d1e4d8]">
              <span>Progresso para o próximo nível</span>
              <strong>
                {carregandoImpacto ? '...' : `${Math.round(progresso)}%`}
              </strong>
            </div>

            <div className="tw:h-[9px] tw:overflow-hidden tw:rounded-full tw:bg-white/20">
              <div
                className="tw:h-full tw:rounded-full tw:bg-[#9DDAA5] tw:transition-all"
                style={{
                  width: `${carregandoImpacto ? 0 : progresso}%`
                }}
              />
            </div>

          </div>

          <p className="tw:mt-3 tw:text-[10px] tw:font-semibold tw:text-[#d1e4d8]">
            Nível {nivelAtual} • {nomesNiveis[nivelAtual]}
          </p>

        </section>

        {/* Conquistas */}
        <section className="tw:mb-[25px]">

          <div className="tw:mb-4 tw:flex tw:items-center tw:justify-between">
            <h2 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
              Conquistas
            </h2>

            <Link
              to="/doador/meu-impacto"
              className="tw:flex tw:items-center tw:gap-1 tw:text-[11px] tw:font-bold tw:text-[#39845A] hover:tw:text-[#244d39]"
            >
              Ver todas
              <ChevronRight size={15} />
            </Link>
          </div>

          <div className="tw:grid tw:grid-cols-3 tw:gap-4 tw:max-[600px]:grid-cols-1">

            {conquistas.map((conquista) => {
              const Icone = conquista.icone

              return (
                <article
                  key={conquista.id}
                  className="tw:flex tw:flex-col tw:items-center tw:rounded-2xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:px-3 tw:py-5 tw:text-center"
                >

                  <div className={`tw:mb-3 tw:grid tw:size-[48px] tw:place-items-center tw:rounded-full ${conquista.cor}`}>
                    <Icone size={23} />
                  </div>

                  <h3 className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]">
                    {conquista.titulo}
                  </h3>

                  <p className="tw:mt-1 tw:text-[10px] tw:text-[#929b93]">
                    {carregandoImpacto
                      ? 'Carregando...'
                      : conquista.desbloqueada
                        ? 'Concluída'
                        : `${conquista.meta} ${conquista.meta === 1 ? 'doação necessária' : 'doações necessárias'}`}
                  </p>

                </article>
              )
            })}

          </div>

        </section>

        {/* Minha conta */}
        <section className="tw:rounded-2xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5">

          <h2 className="tw:mb-4 tw:text-[16px] tw:font-bold tw:text-[#244d39]">
            Minha conta
          </h2>

          <Link
            to="/doador/minhas-doacoes"
            className="tw:flex tw:items-center tw:gap-3 tw:rounded-xl tw:p-3 tw:transition-colors tw:hover:bg-[#f7f9f5]"
          >

            <div className="tw:grid tw:size-[42px] tw:shrink-0 tw:place-items-center tw:rounded-full tw:bg-[#dff0e0] tw:text-[#4a9b61]">
              <History size={22} />
            </div>

            <div className="tw:min-w-0 tw:flex-1">
              <h3 className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]">
                Histórico de doações
              </h3>

              <p className="tw:mt-0.5 tw:text-[11px] tw:text-[#929b93]">
                Acompanhe suas contribuições
              </p>
            </div>

            <ChevronRight size={21} className="tw:text-[#78847b]" />

          </Link>

          <div className="tw:my-2 tw:border-t tw:border-[#f0f1ec]" />

          <Link
            to="/doador/meu-impacto"
            className="tw:flex tw:items-center tw:gap-3 tw:rounded-xl tw:p-3 tw:transition-colors tw:hover:bg-[#f7f9f5]"
          >

            <div className="tw:grid tw:size-[42px] tw:shrink-0 tw:place-items-center tw:rounded-full tw:bg-[#dff0e0] tw:text-[#4a9b61]">
              <Gift size={22} />
            </div>

            <div className="tw:min-w-0 tw:flex-1">
              <h3 className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]">
                Conquistas
              </h3>

              <p className="tw:mt-0.5 tw:text-[11px] tw:text-[#929b93]">
                Seus níveis e medalhas
              </p>
            </div>

            <ChevronRight size={21} className="tw:text-[#78847b]" />

          </Link>

        </section>

      </main>

      {/* Modal de edição */}
      {editando && (
        <div className="tw:fixed tw:inset-0 tw:z-50 tw:flex tw:items-center tw:justify-center tw:bg-black/40 tw:px-4 tw:py-6">

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-edicao"
            className="tw:w-full tw:max-w-[480px] tw:rounded-2xl tw:bg-white tw:p-6 tw:shadow-xl"
          >

            <div className="tw:mb-6 tw:flex tw:items-center tw:justify-between">

              <div>
                <h2
                  id="titulo-edicao"
                  className="tw:text-[18px] tw:font-bold tw:text-[#244d39]"
                >
                  Editar perfil
                </h2>

                <p className="tw:mt-1 tw:text-[11px] tw:text-[#929b93]">
                  Atualize suas informações pessoais.
                </p>
              </div>

              <button
                type="button"
                onClick={cancelarEdicao}
                disabled={salvando}
                className="tw:grid tw:size-9 tw:place-items-center tw:rounded-full tw:text-[#78847b] tw:hover:bg-[#f3f5f1] tw:disabled:opacity-50"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={salvarPerfil} className="tw:space-y-4">

              <div>
                <label
                  htmlFor="nome"
                  className="tw:mb-2 tw:block tw:text-[12px] tw:font-semibold tw:text-[#35483A]"
                >
                  Nome
                </label>

                <input
                  id="nome"
                  name="nome"
                  value={formulario.nome}
                  onChange={handleChange}
                  className="tw:w-full tw:rounded-xl tw:border tw:border-[#DDE3D9] tw:bg-white tw:px-4 tw:py-3 tw:text-sm tw:text-[#35483A] tw:outline-none focus:tw:border-[#52745B]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="tw:mb-2 tw:block tw:text-[12px] tw:font-semibold tw:text-[#35483A]"
                >
                  E-mail
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formulario.email}
                  onChange={handleChange}
                  className="tw:w-full tw:rounded-xl tw:border tw:border-[#DDE3D9] tw:bg-white tw:px-4 tw:py-3 tw:text-sm tw:text-[#35483A] tw:outline-none focus:tw:border-[#52745B]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="telefone"
                  className="tw:mb-2 tw:block tw:text-[12px] tw:font-semibold tw:text-[#35483A]"
                >
                  Telefone
                </label>

                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  value={formulario.telefone}
                  onChange={handleChange}
                  className="tw:w-full tw:rounded-xl tw:border tw:border-[#DDE3D9] tw:bg-white tw:px-4 tw:py-3 tw:text-sm tw:text-[#35483A] tw:outline-none focus:tw:border-[#52745B]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="origem"
                  className="tw:mb-2 tw:block tw:text-[12px] tw:font-semibold tw:text-[#35483A]"
                >
                  Origem das doações
                </label>

                <select
                  id="origem"
                  name="origem"
                  value={formulario.origem}
                  onChange={handleChange}
                  className="tw:w-full tw:rounded-xl tw:border tw:border-[#DDE3D9] tw:bg-white tw:px-4 tw:py-3 tw:text-sm tw:text-[#35483A] tw:outline-none focus:tw:border-[#52745B]"
                >
                  <option value="residencia">Residência</option>
                  <option value="comercio">Comércio</option>
                </select>
              </div>

              <div className="tw:flex tw:justify-end tw:gap-3 tw:border-t tw:border-[#f0f1ec] tw:pt-5 tw:max-[400px]:flex-col">

                <button
                  type="button"
                  onClick={cancelarEdicao}
                  disabled={salvando}
                  className="tw:rounded-xl tw:border tw:border-[#DDE3D9] tw:px-5 tw:py-3 tw:text-[12px] tw:font-semibold tw:text-[#748278] tw:hover:bg-[#f7f8f5] tw:disabled:opacity-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={salvando}
                  className="tw:flex tw:items-center tw:justify-center tw:gap-2 tw:rounded-xl tw:bg-[#52745B] tw:px-5 tw:py-3 tw:text-[12px] tw:font-semibold tw:text-white tw:transition-colors tw:hover:bg-[#3D6047] tw:disabled:cursor-not-allowed tw:disabled:opacity-60"
                >
                  <Save size={15} />
                  {salvando ? 'Salvando...' : 'Salvar alterações'}
                </button>

              </div>

            </form>

          </section>

        </div>
      )}

    </div>
  )
}

export default Profile
