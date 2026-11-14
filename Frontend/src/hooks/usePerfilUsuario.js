
import { useEffect, useState } from 'react'
import { apiRequest } from '../services/api.js'

function obterUsuario() {
  try {
    return JSON.parse(localStorage.getItem('usuario') || 'null')
  } catch {
    return null
  }
}

function perfilInicial(tipoUsuario) {
  const dados = {
    nome: '',
    email: '',
    telefone: ''
  }

  if (tipoUsuario === 'doador') {
    return {
      ...dados,
      origem: 'residencia'
    }
  }

  return {
    ...dados,
    tipo: 'ong',
    regiao: '',
    descricao: ''
  }
}

function normalizarPerfil(dados, tipoUsuario) {
  const perfil = {
    nome: dados.nome || '',
    email: dados.email || '',
    telefone: dados.telefone || ''
  }

  if (tipoUsuario === 'doador') {
    return {
      ...perfil,
      origem: dados.origem || 'residencia'
    }
  }

  return {
    ...perfil,
    tipo: dados.tipo_instituicao || 'ong',
    regiao: dados.regiao || '',
    descricao: dados.descricao || ''
  }
}

export function usePerfilUsuario(tipoUsuario) {
  const [usuario] = useState(obterUsuario)
  const idUsuario = usuario?.id || null

  const [perfil, setPerfil] = useState(() => perfilInicial(tipoUsuario))
  const [carregando, setCarregando] = useState(Boolean(idUsuario))
  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState(
    idUsuario ? '' : 'Não foi possível identificar o usuário. Faça login novamente.'
  )

  // Consulta do perfil
  useEffect(() => {
    if (!idUsuario) return

    let ativo = true

    async function carregarPerfil() {
      try {
        const dados = await apiRequest(
          `/api/usuarios/${idUsuario}/perfil`
        )

        if (ativo) {
          setPerfil(normalizarPerfil(dados, tipoUsuario))
        }
      } catch (error) {
        if (ativo) {
          setErro(error.message || 'Não foi possível carregar seu perfil.')
        }
      } finally {
        if (ativo) {
          setCarregando(false)
        }
      }
    }

    carregarPerfil()

    return () => {
      ativo = false
    }
  }, [idUsuario, tipoUsuario])

  // Atualização do perfil
  async function atualizarPerfil(dadosFormulario) {
    if (!idUsuario) {
      setErro('Não foi possível identificar o usuário.')
      return null
    }

    setSalvando(true)
    setErro('')
    setMensagem('')

    const dados = {
      nome: dadosFormulario.nome,
      email: dadosFormulario.email,
      telefone: dadosFormulario.telefone
    }

    if (tipoUsuario === 'doador') {
      dados.origem = dadosFormulario.origem
    } else {
      dados.tipo_instituicao =
        dadosFormulario.tipo_instituicao ?? dadosFormulario.tipo

      dados.regiao = dadosFormulario.regiao
      dados.descricao = dadosFormulario.descricao
    }

    try {
      const resultado = await apiRequest(
        `/api/usuarios/${idUsuario}/perfil`,
        {
          method: 'PUT',
          body: JSON.stringify(dados)
        }
      )

      const perfilAtualizado = normalizarPerfil(resultado, tipoUsuario)

      setPerfil(perfilAtualizado)

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

      setMensagem('Perfil atualizado com sucesso!')

      return perfilAtualizado
    } catch (error) {
      setErro(error.message || 'Não foi possível atualizar seu perfil.')
      return null
    } finally {
      setSalvando(false)
    }
  }

  function limparMensagens() {
    setMensagem('')
    setErro('')
  }

  return {
    perfil,
    carregando,
    salvando,
    mensagem,
    erro,
    atualizarPerfil,
    limparMensagens
  }
}
