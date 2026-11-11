import { apiRequest } from "./api.js";

export function criarAlimento(dados) {
    return apiRequest("/api/alimentos", {
        method: "POST",
        body: JSON.stringify(dados)
    });
}

export function listarAlimentos(id_usuario) {
    const query = new URLSearchParams({
        id_usuario: String(id_usuario)
    });

    return apiRequest(`/api/alimentos?${query}`, {
        method: "GET"
    });
}

export function atualizarAlimento(id_alimento, dados) {
    return apiRequest(`/api/alimentos/${id_alimento}`, {
        method: "PUT",
        body: JSON.stringify(dados)
    });
}

export function deletarAlimento(id_alimento, id_usuario) {
    return apiRequest(`/api/alimentos/${id_alimento}`, {
        method: "DELETE",
        body: JSON.stringify({ id_usuario })
    });
}