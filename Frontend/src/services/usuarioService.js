import { apiRequest } from "./api.js"

export function cadastrarUsuario(dados) {
  return apiRequest("/api/usuarios/cadastro", {
    method: "POST",
    body: JSON.stringify(dados)
  })
}

export function loginUsuario(dados) {
  return apiRequest("/api/usuarios/login", {
    method: "POST",
    body: JSON.stringify(dados)
  })
}
