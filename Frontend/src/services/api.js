const API_URL = import.meta.env.VITE_API_URL

export async function apiRequest(endpoint, options = {}) {
  let response

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })
  } catch {
    throw new Error(
      "Não foi possível conectar ao servidor. Verifique se o Backend está ativo."
    )
  }

  const dados = await response.json().catch(() => null)

  if (!response.ok) {
    const mensagem =
      dados?.message || dados?.mensagem || "Não foi possível concluir a operação."

    throw new Error(mensagem)
  }

  return dados
}
