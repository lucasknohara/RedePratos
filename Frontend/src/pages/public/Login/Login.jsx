import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react'

import { loginUsuario } from '../../../services/usuarioService.js'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const navigate = useNavigate()


  async function handleSubmit(event) {
    event.preventDefault()
    setErro('')
  
    if (!email.trim() || !senha.trim()) {
      setErro('Preencha todos os campos.')
      return
    }
  
    if (!email.includes('@')) {
      setErro('Informe um e-mail válido.')
      return
    }
  
    setCarregando(true)
  
    try {
      const usuario = await loginUsuario({
        email: email.trim(),
        senha
      })
    
      navigate(
        usuario.tipo_usuario === 'doador'
          ? '/doador'
          : '/instituicao',
        {
          replace: true,
          state: { usuario }
        }
      )
    
    } catch (error) {
      setErro(error.message || 'Email ou senha inválidos!')
    
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="tw:min-h-screen tw:bg-[#F8F7F2] tw:flex tw:items-center tw:justify-center tw:px-5 tw:py-10">
      <div className="tw:w-full tw:max-w-md">

        {/* Voltar para a página inicial */}
        <Link
          to="/"
          className="tw:inline-flex tw:items-center tw:gap-2 tw:text-sm tw:text-[#52745B] tw:font-medium tw:mb-8 tw:transition-colors tw:hover:text-[#294F35]"
        >
          <ArrowLeft size={18} />
          Voltar para o início
        </Link>

        {/* Card de Login */}
        <section className="tw:bg-white tw:rounded-3xl tw:p-8 tw:shadow-sm tw:border tw:border-[#EAECE5]">

          {/* Logo e apresentação */}
          <div className="tw:flex tw:flex-col tw:items-center tw:mb-8">
            <img
              src="/icons/logo.svg"
              alt="RedePratos"
              className="tw:w-20 tw:h-20 tw:object-contain tw:mb-4"
            />

            <h1 className="tw:text-2xl tw:font-bold tw:text-[#294F35]">
              Bem-vindo de volta!
            </h1>

            <p className="tw:text-sm tw:text-[#777F76] tw:mt-2 tw:text-center">
              Entre na sua conta e continue fazendo a diferença.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="tw:space-y-5">

            {/* E-mail */}
            <div>
              <label
                htmlFor="email"
                className="tw:block tw:text-sm tw:font-semibold tw:text-[#35483A] tw:mb-2"
              >
                E-mail
              </label>

              <div className="tw:flex tw:items-center tw:gap-3 tw:border tw:border-[#DDE3D9] tw:rounded-xl tw:px-4 tw:py-3 tw:bg-white tw:transition-colors focus-within:tw:border-[#52745B]">
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
                  className="tw:w-full tw:min-w-0 tw:border-0 tw:bg-transparent tw:shadow-none tw:outline-none tw:ring-0 tw:appearance-none tw:text-sm tw:text-[#35483A] tw:font-[inherit] placeholder:tw:text-[#A5ADA4]"
                  required
                />
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

              <div className="tw:flex tw:items-center tw:gap-3 tw:border tw:border-[#DDE3D9] tw:rounded-xl tw:px-4 tw:py-3 tw:bg-white tw:transition-colors focus-within:tw:border-[#52745B]">
                <Lock
                  size={19}
                  className="tw:text-[#829083] tw:shrink-0"
                />

                <input
                  id="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  className="tw:w-full tw:min-w-0 tw:border-0 tw:bg-transparent tw:shadow-none tw:outline-none tw:ring-0 tw:appearance-none tw:text-sm tw:text-[#35483A] tw:font-[inherit] placeholder:tw:text-[#A5ADA4]"
                  required
                />

                {/* Mostrar ou ocultar senha */}
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="tw:flex tw:items-center tw:justify-center tw:shrink-0 tw:border-0 tw:bg-transparent tw:p-1 tw:rounded-full tw:text-[#829083] tw:hover:text-[#294F35] tw:hover:bg-[#F0F4EF] tw:transition-colors"
                  aria-label={
                    mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'
                  }
                >
                  {mostrarSenha ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Mensagem de erro */}
            {erro && (
              <p className="tw:text-sm tw:text-red-600 tw:bg-red-50 tw:p-3 tw:rounded-lg">
                {erro}
              </p>
            )}

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={carregando}
              className="tw:w-full tw:bg-[#52745B] tw:text-white tw:font-semibold tw:py-3 tw:rounded-xl tw:hover:bg-[#3D6047] tw:transition-colors disabled:tw:cursor-not-allowed disabled:tw:opacity-60"
            >
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>

          </form>

          {/* Link para Cadastro */}
          <div className="tw:mt-7 tw:text-center">
            <p className="tw:text-sm tw:text-[#777F76]">
              Ainda não tem uma conta?
            </p>

            <Link
              to="/cadastro"
              className="tw:inline-block tw:mt-2 tw:text-sm tw:font-bold tw:text-[#52745B] tw:hover:text-[#294F35] tw:transition-colors"
            >
              Criar minha conta
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

export default Login
