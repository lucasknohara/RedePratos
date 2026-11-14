import { useState } from 'react'

import {
  Bell,
  Building2,
  Mail,
  Phone,
  MapPin,
  Pencil,
  Save,
  X,
  ShieldCheck,
  Users,
  HandHeart,
  Info,
  PackageCheck,
  Scale
} from 'lucide-react'

import InstitutionSidebar from '../../../components/layout/InstitutionSidebar/InstitutionSidebar.jsx'
import { usePerfilUsuario } from '../../../hooks/usePerfilUsuario.js'
import { useImpacto } from '../../../hooks/useImpacto.js'

const perfilInicial = {
  nome: '',
  email: '',
  telefone: '',
  tipo: 'ong',
  regiao: '',
  descricao: ''
}

const tiposInstituicao = [
  { valor: 'ong', label: 'ONG' },
  { valor: 'associacao', label: 'Associação comunitária' },
  { valor: 'beneficente', label: 'Instituição beneficente' },
  { valor: 'outro', label: 'Outro' }
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
  const {
    perfil,
    carregando,
    salvando,
    mensagem,
    erro,
    atualizarPerfil,
    limparMensagens
  } = usePerfilUsuario('instituicao')

  const {
    impacto,
    carregando: carregandoImpacto,
    erro: erroImpacto
  } = useImpacto('instituicao')

  const [formulario, setFormulario] = useState(perfilInicial)
  const [editando, setEditando] = useState(false)

  const tipoSelecionado = tiposInstituicao.find(
    (tipo) => tipo.valor === perfil.tipo
  )

  // Edição do perfil
  function iniciarEdicao() {
    setFormulario(perfil)
    limparMensagens()
    setEditando(true)
  }

  function cancelarEdicao() {
    setFormulario(perfil)
    limparMensagens()
    setEditando(false)
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value
    }))
  }

  async function salvarPerfil(event) {
    event.preventDefault()

    if (salvando) return

    const perfilAtualizado = await atualizarPerfil(formulario)

    if (perfilAtualizado) {
      setFormulario(perfilAtualizado)
      setEditando(false)
    }
  }

  return (
    <div className="tw:flex tw:min-h-screen tw:bg-[#f7f6ef] tw:max-[760px]:flex-col">

      <InstitutionSidebar />

      <main className="tw:min-w-0 tw:flex-1 tw:px-[45px] tw:pb-[35px] tw:max-[1100px]:px-[25px] tw:max-[1100px]:pb-[30px] tw:max-[760px]:px-[18px] tw:max-[760px]:pb-[25px]">

        {/* Cabeçalho */}
        <header className="tw:flex tw:h-[75px] tw:items-center tw:justify-between tw:border-b tw:border-[#e8eae2]">

          <div className="tw:flex tw:items-center tw:gap-[10px] tw:text-[12px] tw:text-[#87938a] tw:max-[450px]:text-[10px]">
            <span>RedePratos</span>
            <span>/</span>
            <strong className="tw:text-[#315c43]">
              Perfil da instituição
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
            INFORMAÇÕES DA ORGANIZAÇÃO
          </span>

          <h1 className="tw:my-[9px] tw:text-[30px] tw:font-bold tw:tracking-[-0.7px] tw:text-[#124638]">
            Meu perfil
          </h1>

          <p className="tw:text-[13px] tw:text-[#78847b]">
            Gerencie os dados e as informações da sua instituição.
          </p>

        </section>

        {/* Identificação da instituição */}
        <section className="tw:mb-[22px] tw:flex tw:items-center tw:gap-5 tw:rounded-2xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[600px]:flex-col tw:max-[600px]:items-start">

          <div className="tw:grid tw:size-[76px] tw:shrink-0 tw:place-items-center tw:rounded-full tw:border-[5px] tw:border-[#dceee0] tw:bg-[#e8f0e5] tw:text-[#477b57]">
            <Building2 size={34} />
          </div>

          <div className="tw:min-w-0 tw:flex-1">

            <h2 className="tw:text-[19px] tw:font-bold tw:text-[#244d39]">
              {carregando ? 'Carregando perfil...' : perfil.nome || 'Instituição'}
            </h2>

            <p className="tw:mt-1 tw:text-[11px] tw:text-[#8c978e]">
              {perfil.email}
            </p>

            <span className="tw:mt-2 tw:inline-flex tw:items-center tw:gap-1.5 tw:rounded-full tw:bg-[#e8f5e9] tw:px-3 tw:py-1 tw:text-[10px] tw:font-semibold tw:text-[#39845A]">
              <ShieldCheck size={12} />
              Conta Instituição
            </span>

          </div>

          <button
            type="button"
            onClick={iniciarEdicao}
            disabled={carregando || Boolean(erro)}
            className="tw:flex tw:shrink-0 tw:items-center tw:gap-2 tw:rounded-full tw:bg-[#e8f5e9] tw:px-4 tw:py-2.5 tw:text-[11px] tw:font-semibold tw:text-[#39845A] tw:transition-colors tw:hover:bg-[#d8eddb] tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
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

        {/* Indicadores de impacto */}
        <section className="tw:mb-[25px]">

          <div className="tw:mb-3">
            <h2 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
              Nosso impacto
            </h2>

            <p className="tw:mt-1 tw:text-[11px] tw:text-[#929b93]">
              Acompanhe os alimentos recebidos e as parcerias realizadas.
            </p>
          </div>

          {erroImpacto && (
            <p className="tw:mb-3 tw:rounded-xl tw:bg-[#fff0ed] tw:p-3 tw:text-sm tw:text-[#b94b42]">
              {erroImpacto}
            </p>
          )}

          <div className="tw:grid tw:grid-cols-3 tw:gap-[17px] tw:max-[760px]:grid-cols-1">

            <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5">

              <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
                <span>Doações recebidas</span>
                <PackageCheck size={21} className="tw:text-[#528463]" />
              </div>

              <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
                {carregandoImpacto ? '...' : impacto.doacoesConcluidas.toString().padStart(2, '0')}
              </strong>

              <small className="tw:text-[10px] tw:text-[#8c978e]">
                Entregas confirmadas
              </small>

            </article>

            <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5">

              <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
                <span>Alimentos recebidos</span>
                <Scale size={21} className="tw:text-[#528463]" />
              </div>

              <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:break-words tw:text-[22px] tw:font-bold tw:text-[#244d39]">
                {carregandoImpacto
                  ? '...'
                  : formatarQuantidades(impacto.quantidadesPorUnidade)}
              </strong>

              <small className="tw:text-[10px] tw:text-[#8c978e]">
                Quantidade por unidade
              </small>

            </article>

            <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5">

              <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">
                <span>Doadores parceiros</span>
                <HandHeart size={21} className="tw:text-[#528463]" />
              </div>

              <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
                {carregandoImpacto
                  ? '...'
                  : impacto.totalParceiros.toString().padStart(2, '0')}
              </strong>

              <small className="tw:text-[10px] tw:text-[#8c978e]">
                Pessoas e comércios que ajudaram
              </small>

            </article>

          </div>

        </section>

        {/* Informações da instituição */}
        <div className="tw:grid tw:grid-cols-[1.4fr_1fr] tw:items-start tw:gap-5 tw:max-[950px]:grid-cols-1">

          <section className="tw:rounded-2xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-6 tw:max-[600px]:p-4">

            <div className="tw:mb-6">
              <h2 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
                Dados da instituição
              </h2>

              <p className="tw:mt-[6px] tw:text-[11px] tw:text-[#929b93]">
                Informações utilizadas para identificar sua organização.
              </p>
            </div>

            <div className="tw:space-y-5">

              <div>
                <label className="tw:mb-2 tw:block tw:text-[11px] tw:font-semibold tw:text-[#78847b]">
                  Nome da instituição
                </label>

                <div className="tw:flex tw:items-center tw:gap-3 tw:rounded-xl tw:bg-[#f8f9f5] tw:px-4 tw:py-3">
                  <Building2 size={17} className="tw:shrink-0 tw:text-[#528463]" />

                  <span className="tw:text-[12px] tw:font-medium tw:text-[#344a3c]">
                    {perfil.nome}
                  </span>
                </div>
              </div>

              <div>
                <label className="tw:mb-2 tw:block tw:text-[11px] tw:font-semibold tw:text-[#78847b]">
                  E-mail de contato
                </label>

                <div className="tw:flex tw:items-center tw:gap-3 tw:rounded-xl tw:bg-[#f8f9f5] tw:px-4 tw:py-3">
                  <Mail size={17} className="tw:shrink-0 tw:text-[#528463]" />

                  <span className="tw:break-all tw:text-[12px] tw:font-medium tw:text-[#344a3c]">
                    {perfil.email}
                  </span>
                </div>
              </div>

              <div>
                <label className="tw:mb-2 tw:block tw:text-[11px] tw:font-semibold tw:text-[#78847b]">
                  Telefone
                </label>

                <div className="tw:flex tw:items-center tw:gap-3 tw:rounded-xl tw:bg-[#f8f9f5] tw:px-4 tw:py-3">
                  <Phone size={17} className="tw:shrink-0 tw:text-[#528463]" />

                  <span className="tw:text-[12px] tw:font-medium tw:text-[#344a3c]">
                    {perfil.telefone}
                  </span>
                </div>
              </div>

              <div>
                <label className="tw:mb-2 tw:block tw:text-[11px] tw:font-semibold tw:text-[#78847b]">
                  Tipo de organização
                </label>

                <div className="tw:flex tw:items-center tw:gap-3 tw:rounded-xl tw:bg-[#f8f9f5] tw:px-4 tw:py-3">
                  <Users size={17} className="tw:shrink-0 tw:text-[#528463]" />

                  <span className="tw:text-[12px] tw:font-medium tw:text-[#344a3c]">
                    {tipoSelecionado?.label || 'Não informado'}
                  </span>
                </div>
              </div>

              <div>
                <label className="tw:mb-2 tw:block tw:text-[11px] tw:font-semibold tw:text-[#78847b]">
                  Região de atuação
                </label>

                <div className="tw:flex tw:items-center tw:gap-3 tw:rounded-xl tw:bg-[#f8f9f5] tw:px-4 tw:py-3">
                  <MapPin size={17} className="tw:shrink-0 tw:text-[#528463]" />

                  <span className="tw:text-[12px] tw:font-medium tw:text-[#344a3c]">
                    {perfil.regiao}
                  </span>
                </div>
              </div>

            </div>

            <div className="tw:mt-6 tw:border-t tw:border-[#f0f1ec] tw:pt-5">

              <h3 className="tw:mb-2 tw:text-[12px] tw:font-bold tw:text-[#344a3c]">
                Sobre a instituição
              </h3>

              <p className="tw:text-[11px] tw:leading-[1.7] tw:text-[#78847b]">
                {perfil.descricao}
              </p>

            </div>

          </section>

          {/* Coluna lateral */}
          <div className="tw:flex tw:flex-col tw:gap-5">

            <section className="tw:rounded-2xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5">

              <div className="tw:mb-4 tw:flex tw:items-center tw:gap-3">

                <div className="tw:grid tw:size-10 tw:shrink-0 tw:place-items-center tw:rounded-full tw:bg-[#e8f0e5] tw:text-[#477b57]">
                  <HandHeart size={21} />
                </div>

                <div>
                  <h2 className="tw:text-[14px] tw:font-bold tw:text-[#244d39]">
                    Nossa atuação
                  </h2>

                  <p className="tw:mt-1 tw:text-[10px] tw:text-[#929b93]">
                    Sobre o trabalho da organização.
                  </p>
                </div>

              </div>

              <p className="tw:text-[11px] tw:leading-[1.7] tw:text-[#78847b]">
                {perfil.descricao}
              </p>

              <div className="tw:mt-4 tw:flex tw:flex-wrap tw:gap-2">

                <span className="tw:rounded-full tw:bg-[#eaf2e8] tw:px-3 tw:py-1.5 tw:text-[10px] tw:font-semibold tw:text-[#477b57]">
                  {tipoSelecionado?.label || 'Instituição'}
                </span>

                <span className="tw:rounded-full tw:bg-[#f1f3ed] tw:px-3 tw:py-1.5 tw:text-[10px] tw:font-semibold tw:text-[#748278]">
                  {perfil.regiao}
                </span>

              </div>

            </section>

            <section className="tw:rounded-2xl tw:border tw:border-[#dfe9dc] tw:bg-[#e8f0e5] tw:p-5">

              <div className="tw:flex tw:items-center tw:gap-2">
                <ShieldCheck size={20} className="tw:text-[#477b57]" />

                <h2 className="tw:text-[13px] tw:font-bold tw:text-[#315c43]">
                  Seus dados protegidos
                </h2>
              </div>

              <p className="tw:mt-3 tw:text-[10px] tw:leading-[1.7] tw:text-[#6d8373]">
                O RedePratos utiliza as informações cadastradas para facilitar
                o contato entre doadores e instituições. Sua localização é
                apresentada por região, sem expor seu endereço completo
                publicamente.
              </p>

            </section>

            <section className="tw:flex tw:items-start tw:gap-3 tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5">

              <Info size={19} className="tw:mt-0.5 tw:shrink-0 tw:text-[#528463]" />

              <div>
                <h2 className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]">
                  Mantenha seus dados atualizados
                </h2>

                <p className="tw:mt-1 tw:text-[10px] tw:leading-[1.6] tw:text-[#929b93]">
                  Informações corretas ajudam os doadores a entrar em contato
                  com sua instituição.
                </p>
              </div>

            </section>

          </div>

        </div>

      </main>

      {/* Modal de edição */}
      {editando && (
        <div className="tw:fixed tw:inset-0 tw:z-50 tw:flex tw:items-center tw:justify-center tw:bg-black/40 tw:px-4 tw:py-6">

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-edicao"
            className="tw:max-h-full tw:w-full tw:max-w-[520px] tw:overflow-y-auto tw:rounded-2xl tw:bg-white tw:p-6 tw:shadow-xl"
          >

            <div className="tw:mb-6 tw:flex tw:items-center tw:justify-between">

              <div>
                <h2
                  id="titulo-edicao"
                  className="tw:text-[18px] tw:font-bold tw:text-[#244d39]"
                >
                  Editar instituição
                </h2>

                <p className="tw:mt-1 tw:text-[11px] tw:text-[#929b93]">
                  Atualize as informações da sua organização.
                </p>
              </div>

              <button
                type="button"
                onClick={cancelarEdicao}
                disabled={salvando}
                className="tw:grid tw:size-9 tw:place-items-center tw:rounded-full tw:text-[#78847b] tw:transition-colors tw:hover:bg-[#f3f5f1] tw:disabled:opacity-50"
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
                  Nome da instituição
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
                  E-mail de contato
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
                  htmlFor="tipo"
                  className="tw:mb-2 tw:block tw:text-[12px] tw:font-semibold tw:text-[#35483A]"
                >
                  Tipo de organização
                </label>

                <select
                  id="tipo"
                  name="tipo"
                  value={formulario.tipo}
                  onChange={handleChange}
                  className="tw:w-full tw:rounded-xl tw:border tw:border-[#DDE3D9] tw:bg-white tw:px-4 tw:py-3 tw:text-sm tw:text-[#35483A] tw:outline-none focus:tw:border-[#52745B]"
                >
                  {tiposInstituicao.map((tipo) => (
                    <option key={tipo.valor} value={tipo.valor}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="regiao"
                  className="tw:mb-2 tw:block tw:text-[12px] tw:font-semibold tw:text-[#35483A]"
                >
                  Região de atuação
                </label>

                <input
                  id="regiao"
                  name="regiao"
                  value={formulario.regiao}
                  onChange={handleChange}
                  placeholder="Ex.: Região central"
                  className="tw:w-full tw:rounded-xl tw:border tw:border-[#DDE3D9] tw:bg-white tw:px-4 tw:py-3 tw:text-sm tw:text-[#35483A] tw:outline-none focus:tw:border-[#52745B]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="descricao"
                  className="tw:mb-2 tw:block tw:text-[12px] tw:font-semibold tw:text-[#35483A]"
                >
                  Sobre a instituição
                </label>

                <textarea
                  id="descricao"
                  name="descricao"
                  value={formulario.descricao}
                  onChange={handleChange}
                  rows={4}
                  maxLength={400}
                  className="tw:w-full tw:resize-y tw:rounded-xl tw:border tw:border-[#DDE3D9] tw:bg-white tw:px-4 tw:py-3 tw:text-sm tw:text-[#35483A] tw:outline-none focus:tw:border-[#52745B]"
                  placeholder="Conte um pouco sobre sua organização."
                />

                <p className="tw:mt-1 tw:text-right tw:text-[10px] tw:text-[#929b93]">
                  {formulario.descricao.length}/400 caracteres
                </p>
              </div>

              {erro && (
                <p className="tw:rounded-xl tw:bg-[#fff0ed] tw:p-3 tw:text-sm tw:text-[#b94b42]">
                  {erro}
                </p>
              )}

              <div className="tw:flex tw:justify-end tw:gap-3 tw:border-t tw:border-[#f0f1ec] tw:pt-5 tw:max-[450px]:flex-col">

                <button
                  type="button"
                  onClick={cancelarEdicao}
                  disabled={salvando}
                  className="tw:rounded-xl tw:border tw:border-[#DDE3D9] tw:px-5 tw:py-3 tw:text-[12px] tw:font-semibold tw:text-[#748278] tw:transition-colors tw:hover:bg-[#f7f8f5] tw:disabled:opacity-50"
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
