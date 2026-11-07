
import { useState } from 'react'
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

// Dados demonstrativos.
const perfilInicial = {
  nome: 'Lucas',
  email: 'lucas@exemplo.com',
  telefone: '(11) 99999-9999',
  origem: 'residencia'
}

const conquistas = [
  {
    id: 1,
    titulo: 'Primeiro passo',
    descricao: 'Primeira doação',
    icone: Sprout,
    cor: 'tw:bg-[#DDF5DF] tw:text-[#39845A]',
    status: 'Concluída'
  },
  {
    id: 2,
    titulo: 'Doador solidário',
    descricao: '5 doações realizadas',
    icone: Heart,
    cor: 'tw:bg-[#FFE1E1] tw:text-[#D86A6A]',
    status: 'Concluída'
  },
  {
    id: 3,
    titulo: 'Guardião dos alimentos',
    descricao: '10 doações realizadas',
    icone: Award,
    cor: 'tw:bg-[#E1EAFF] tw:text-[#5487C2]',
    status: 'Concluída'
  }
]

function Profile() {
  const [perfil, setPerfil] = useState(perfilInicial)
  const [formulario, setFormulario] = useState(perfilInicial)
  const [editando, setEditando] = useState(false)
  const [mensagem, setMensagem] = useState('')

  const inicial = perfil.nome.trim()
    ? perfil.nome.trim().charAt(0).toUpperCase()
    : 'U'

  const progresso = Math.min((12 / 20) * 100, 100)

  function iniciarEdicao() {
    setFormulario(perfil)
    setMensagem('')
    setEditando(true)
  }

  function cancelarEdicao() {
    setFormulario(perfil)
    setEditando(false)
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormulario({
      ...formulario,
      [name]: value
    })
  }

  function salvarPerfil(event) {
    event.preventDefault()

    setPerfil(formulario)
    setEditando(false)
    setMensagem('Perfil atualizado com sucesso!')
  }

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

        {/* APRESENTAÇÃO */}
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

        {/* CARTÃO DE PERFIL */}
        <section className="tw:mb-[22px] tw:flex tw:items-center tw:gap-5 tw:rounded-2xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[600px]:flex-col tw:max-[600px]:items-start">

          <div className="tw:grid tw:size-[76px] tw:shrink-0 tw:place-items-center tw:rounded-full tw:border-[5px] tw:border-[#dceee0] tw:bg-[#4fa86c] tw:text-[22px] tw:font-bold tw:text-white">
            {inicial}
          </div>

          <div className="tw:min-w-0 tw:flex-1">

            <h2 className="tw:text-[19px] tw:font-bold tw:text-[#244d39]">
              {perfil.nome}
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
            className="tw:flex tw:items-center tw:gap-2 tw:rounded-full tw:bg-[#e8f5e9] tw:px-4 tw:py-2.5 tw:text-[11px] tw:font-semibold tw:text-[#39845A] tw:transition-colors tw:hover:bg-[#d8eddb]"
          >
            <Pencil size={14} />
            Editar perfil
          </button>

        </section>

        {/* MENSAGEM DE SUCESSO */}
        {mensagem && (
          <p className="tw:mb-5 tw:rounded-xl tw:bg-[#e8f5e9] tw:p-3 tw:text-sm tw:text-[#39845A]">
            {mensagem}
          </p>
        )}

        {/* SEU IMPACTO */}
        <section className="tw:mb-[22px]">

          <div className="tw:mb-3 tw:flex tw:items-center tw:justify-between">
            <h2 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
              Seu impacto
            </h2>

            <Link
              to="/inicio/meu-impacto"
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

              <strong className="tw:block tw:text-[25px] tw:font-bold tw:text-[#244d39]">
                35 kg
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
                12
              </strong>

              <span className="tw:mt-1 tw:block tw:text-[11px] tw:text-[#87938a]">
                Doações confirmadas
              </span>

            </article>

          </div>

        </section>

        {/* JORNADA E PROGRESSO */}
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
                Mais uma contribuição para desbloquear seu próximo nível.
              </p>
            </div>

          </div>

          <div className="tw:mt-5">

            <div className="tw:mb-2 tw:flex tw:items-center tw:justify-between tw:text-[10px] tw:text-[#d1e4d8]">
              <span>Progresso para o próximo nível</span>
              <strong>60%</strong>
            </div>

            <div className="tw:h-[9px] tw:overflow-hidden tw:rounded-full tw:bg-white/20">
              <div
                className="tw:h-full tw:rounded-full tw:bg-[#9DDAA5]"
                style={{ width: `${progresso}%` }}
              />
            </div>

          </div>

          <p className="tw:mt-3 tw:text-[10px] tw:font-semibold tw:text-[#d1e4d8]">
            Nível 3 • Guardião dos alimentos
          </p>

        </section>

        {/* CONQUISTAS */}
        <section className="tw:mb-[25px]">

          <div className="tw:mb-4 tw:flex tw:items-center tw:justify-between">
            <h2 className="tw:text-[16px] tw:font-bold tw:text-[#244d39]">
              Conquistas
            </h2>

            <Link
              to="/inicio/meu-impacto"
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
                    {conquista.status}
                  </p>

                </article>
              )
            })}

          </div>

        </section>

        {/* MINHA CONTA */}
        <section className="tw:rounded-2xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5">

          <h2 className="tw:mb-4 tw:text-[16px] tw:font-bold tw:text-[#244d39]">
            Minha conta
          </h2>

          <Link
            to="/inicio/minhas-doacoes"
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
            to="/inicio/meu-impacto"
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

      {/* MODAL DE EDIÇÃO DO PERFIL */}
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
                className="tw:grid tw:size-9 tw:place-items-center tw:rounded-full tw:text-[#78847b] tw:hover:bg-[#f3f5f1]"
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
                  className="tw:rounded-xl tw:border tw:border-[#DDE3D9] tw:px-5 tw:py-3 tw:text-[12px] tw:font-semibold tw:text-[#748278] tw:hover:bg-[#f7f8f5]"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="tw:flex tw:items-center tw:justify-center tw:gap-2 tw:rounded-xl tw:bg-[#52745B] tw:px-5 tw:py-3 tw:text-[12px] tw:font-semibold tw:text-white tw:transition-colors tw:hover:bg-[#3D6047]"
                >
                  <Save size={15} />
                  Salvar alterações
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
