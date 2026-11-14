
import { useEffect, useState } from 'react'
import { apiRequest } from '../services/api.js'

const impactoInicial = {
  doacoesConcluidas: 0,
  totalParceiros: 0,
  quantidadesPorUnidade: {}
}

function obterUsuario() {
  try {
    return JSON.parse(localStorage.getItem('usuario') || 'null')
  } catch {
    return null
  }
}

function calcularImpacto(solicitacoes, tipoUsuario) {
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

  const doacoes = Array.from(doacoesUnicas.values())

  const campoParceiro = tipoUsuario === 'doador'
    ? 'id_instituicao'
    : 'id_doador'

  const parceiros = new Set(
    doacoes
      .map((doacao) => doacao[campoParceiro])
      .filter((id) => id !== null && id !== undefined)
      .map(String)
  )

  const quantidades = new Map()

  doacoes.forEach((doacao) => {
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

  return {
    doacoesConcluidas: doacoes.length,
    totalParceiros: parceiros.size,
    quantidadesPorUnidade: Object.fromEntries(quantidades)
  }
}

export function useImpacto(tipoUsuario) {
  const [usuario] = useState(obterUsuario)
  const idUsuario = usuario?.id || null

  const [impacto, setImpacto] = useState(impactoInicial)
  const [carregando, setCarregando] = useState(Boolean(idUsuario))
  const [erro, setErro] = useState(
    idUsuario ? '' : 'Não foi possível identificar o usuário. Faça login novamente.'
  )

  // Consulta das solicitações e cálculo dos indicadores
  useEffect(() => {
    if (!idUsuario) return

    let ativo = true

    async function carregarImpacto() {
      const endpoint = tipoUsuario === 'doador'
        ? `/api/solicitacoes/doador?id_usuario=${idUsuario}`
        : `/api/solicitacoes/instituicao?id_instituicao=${idUsuario}`

      try {
        const dados = await apiRequest(endpoint)

        const solicitacoes = Array.isArray(dados)
          ? dados
          : dados?.solicitacoes

        if (!Array.isArray(solicitacoes)) {
          throw new Error('A API retornou dados inválidos.')
        }

        const resultado = calcularImpacto(solicitacoes, tipoUsuario)

        if (ativo) {
          setImpacto(resultado)
        }
      } catch (error) {
        if (ativo) {
          setErro(error.message || 'Não foi possível carregar o impacto.')
        }
      } finally {
        if (ativo) {
          setCarregando(false)
        }
      }
    }

    carregarImpacto()

    return () => {
      ativo = false
    }
  }, [idUsuario, tipoUsuario])

  return {
    impacto,
    carregando,
    erro
  }
}
