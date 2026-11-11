import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  HandHeart,
  Building2
} from 'lucide-react'

import { cadastrarUsuario } from '../../../services/usuarioService.js'

function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [tipoPerfil, setTipoPerfil] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    setErro('')

    if (senha.length < 8) {
      setErro('A senha precisa ter pelo menos 8 caracteres.')
      return
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não são iguais.')
      return
    }

    if (!tipoPerfil) {
      setErro('Selecione o tipo da sua conta.')
      return
    }

    setCarregando(true)

    try {
      const usuarioCriado = await cadastrarUsuario({
        nome: nome.trim(),
        email: email.trim(),
        tipo_usuario: tipoPerfil,
        senha
      })

      localStorage.setItem('usuario', JSON.stringify({
        id: usuarioCriado.id,
        nome: usuarioCriado.nome,
        email: usuarioCriado.email,
        tipo_usuario: usuarioCriado.tipo_usuario
      }))

      navigate(
        tipoPerfil === 'doador'
          ? '/doador'
          : '/instituicao',
        {
          replace: true,
          state: { usuario: usuarioCriado }
        }
      )

      setNome('')
      setEmail('')
      setSenha('')
      setConfirmarSenha('')
      setTipoPerfil('')

    } catch (error) {
      setErro(error.message || 'Não foi possível realizar o cadastro.')

    } finally {
      setCarregando(false)
    }
  }

  const estiloCampo =
    'tw:w-full tw:min-w-0 tw:border-0 tw:bg-transparent tw:shadow-none tw:outline-none tw:ring-0 tw:appearance-none tw:text-sm tw:text-[#35483A] tw:font-[inherit] placeholder:tw:text-[#A5ADA4]'

  const estiloContainer =
    'tw:flex tw:items-center tw:gap-3 tw:border tw:border-[#DDE3D9] tw:rounded-xl tw:px-4 tw:py-3 tw:bg-white tw:transition-colors focus-within:tw:border-[#52745B]'

  return (
    <main className="tw:min-h-screen tw:bg-[#F8F7F2] tw:flex tw:items-center tw:justify-center tw:px-5 tw:py-10">

      <div className="tw:w-full tw:max-w-lg">

        {/* Voltar para a página inicial */}
        <Link
          to="/"
          className="tw:inline-flex tw:items-center tw:gap-2 tw:text-sm tw:text-[#52745B] tw:font-medium tw:mb-8 tw:transition-colors tw:hover:text-[#294F35]"
        >
          <ArrowLeft size={18} />
          Voltar para o início
        </Link>

        {/* Card de Cadastro */}
        <section className="tw:bg-white tw:rounded-3xl tw:p-8 tw:shadow-sm tw:border tw:border-[#EAECE5]">

          {/* Logo e apresentação */}
          <div className="tw:flex tw:flex-col tw:items-center tw:mb-8">

            <img
              src="/icons/logo.svg"
              alt="RedePratos"
              className="tw:w-20 tw:h-20 tw:object-contain tw:mb-4"
            />

            <h1 className="tw:text-2xl tw:font-bold tw:text-[#294F35]">
              Crie sua conta
            </h1>

            <p className="tw:text-sm tw:text-[#777F76] tw:mt-2 tw:text-center">
              Faça parte de uma rede que transforma alimentos em oportunidades.
            </p>

          </div>

          <form onSubmit={handleSubmit} className="tw:space-y-5">

            {/* Nome */}
            <div>
              <label
                htmlFor="nome"
                className="tw:block tw:text-sm tw:font-semibold tw:text-[#35483A] tw:mb-2"
              >
                Nome ou nome da instituição
              </label>

              <div className={estiloContainer}>
                <User
                  size={19}
                  className="tw:text-[#829083] tw:shrink-0"
                />

                <input
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  className={estiloCampo}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* E-mail */}
            <div>
              <label
                htmlFor="email"
                className="tw:block tw:text-sm tw:font-semibold tw:text-[#35483A] tw:mb-2"
              >
                E-mail
              </label>

              <div className={estiloContainer}>
                <Mail
                  size={19}
                  className="tw:text-[#829083] tw:shrink-0"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={estiloCampo}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Tipo de conta */}
            <div>
              <label className="tw:block tw:text-sm tw:font-semibold tw:text-[#35483A] tw:mb-3">
                Tipo de conta
              </label>

              <div className="tw:grid tw:grid-cols-2 tw:gap-3">

                {/* Perfil Doador */}
                <label
                  className={`tw:flex tw:flex-col tw:items-center tw:gap-2 tw:p-4 tw:rounded-xl tw:border tw:cursor-pointer tw:transition-colors ${
                    tipoPerfil === 'doador'
                      ? 'tw:border-[#52745B] tw:bg-[#F0F5F0]'
                      : 'tw:border-[#DDE3D9] tw:bg-white tw:hover:bg-[#FAFBF9]'
                  }`}
                >
                  <input
                    type="radio"
                    name="tipoPerfil"
                    value="doador"
                    checked={tipoPerfil === 'doador'}
                    onChange={(event) => setTipoPerfil(event.target.value)}
                    className="tw:sr-only"
                    required
                  />

                  <HandHeart
                    size={25}
                    className="tw:text-[#52745B]"
                  />

                  <span className="tw:text-sm tw:font-semibold tw:text-[#35483A]">
                    Doador
                  </span>

                  <span className="tw:text-xs tw:text-[#777F76] tw:text-center">
                    Quero compartilhar alimentos.
                  </span>
                </label>

                {/* Perfil Instituição */}
                <label
                  className={`tw:flex tw:flex-col tw:items-center tw:gap-2 tw:p-4 tw:rounded-xl tw:border tw:cursor-pointer tw:transition-colors ${
                    tipoPerfil === 'instituicao'
                      ? 'tw:border-[#52745B] tw:bg-[#F0F5F0]'
                      : 'tw:border-[#DDE3D9] tw:bg-white tw:hover:bg-[#FAFBF9]'
                  }`}
                >
                  <input
                    type="radio"
                    name="tipoPerfil"
                    value="instituicao"
                    checked={tipoPerfil === 'instituicao'}
                    onChange={(event) => setTipoPerfil(event.target.value)}
                    className="tw:sr-only"
                  />

                  <Building2
                    size={25}
                    className="tw:text-[#52745B]"
                  />

                  <span className="tw:text-sm tw:font-semibold tw:text-[#35483A]">
                    Instituição
                  </span>

                  <span className="tw:text-xs tw:text-[#777F76] tw:text-center">
                    Quero receber doações.
                  </span>
                </label>

              </div>
            </div>

            {/* Senha */}
            <div>
              <label
                htmlFor="senha"
                className="tw:block tw:text-sm tw:font-semibold tw:text-[#35483A] tw:mb-2"
              >
                Senha
              </label>

              <div className={estiloContainer}>
                <Lock
                  size={19}
                  className="tw:text-[#829083] tw:shrink-0"
                />

                <input
                  id="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Crie uma senha"
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  className={estiloCampo}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="tw:flex tw:items-center tw:justify-center tw:shrink-0 tw:border-0 tw:bg-transparent tw:p-1 tw:rounded-full tw:text-[#829083] tw:hover:text-[#294F35] tw:hover:bg-[#F0F4EF] tw:transition-colors"
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {mostrarSenha ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              <p className="tw:text-xs tw:text-[#92998F] tw:mt-2">
                Utilize pelo menos 8 caracteres.
              </p>
            </div>

            {/* Confirmar senha */}
            <div>
              <label
                htmlFor="confirmarSenha"
                className="tw:block tw:text-sm tw:font-semibold tw:text-[#35483A] tw:mb-2"
              >
                Confirmar senha
              </label>

              <div className={estiloContainer}>
                <Lock
                  size={19}
                  className="tw:text-[#829083] tw:shrink-0"
                />

                <input
                  id="confirmarSenha"
                  type={mostrarConfirmacao ? 'text' : 'password'}
                  placeholder="Digite sua senha novamente"
                  value={confirmarSenha}
                  onChange={(event) => setConfirmarSenha(event.target.value)}
                  className={estiloCampo}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
                  className="tw:flex tw:items-center tw:justify-center tw:shrink-0 tw:border-0 tw:bg-transparent tw:p-1 tw:rounded-full tw:text-[#829083] tw:hover:text-[#294F35] tw:hover:bg-[#F0F4EF] tw:transition-colors"
                  aria-label={
                    mostrarConfirmacao
                      ? 'Ocultar confirmação da senha'
                      : 'Mostrar confirmação da senha'
                  }
                >
                  {mostrarConfirmacao ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Mensagens */}
            {erro && (
              <p className="tw:text-sm tw:text-red-600 tw:bg-red-50 tw:p-3 tw:rounded-lg">
                {erro}
              </p>
            )}

            {/* Botão de cadastro */}
            <button
              type="submit"
              disabled={carregando}
              className="tw:w-full tw:bg-[#52745B] tw:text-white tw:font-semibold tw:py-3 tw:rounded-xl tw:hover:bg-[#3D6047] tw:transition-colors disabled:tw:cursor-not-allowed disabled:tw:opacity-60"
            >
              {carregando ? 'Criando conta...' : 'Criar minha conta'}
            </button>

          </form>

          {/* Link para Login */}
          <div className="tw:mt-7 tw:text-center">
            <p className="tw:text-sm tw:text-[#777F76]">
              Já possui uma conta?
            </p>

            <Link
              to="/login"
              className="tw:inline-block tw:mt-2 tw:text-sm tw:font-bold tw:text-[#52745B] tw:hover:text-[#294F35] tw:transition-colors"
            >
              Fazer login
            </Link>
          </div>

        </section>

        {/* Rodapé */}
        <p className="tw:text-center tw:text-xs tw:text-[#92998F] tw:mt-6">
          RedePratos — Conectando alimentos a quem precisa.
        </p>

      </div>
    </main>
  )
}

export default Cadastro
