const connection = require("../config/database.js");

async function criarDoacao(id_alimento, quantidade) {
    const [resultado] = await connection.query("INSERT INTO doacoes (id_alimento, quantidade) VALUES (?, ?)", [id_alimento, quantidade]);

    return resultado;
};

async function buscarAlimentoPorId(id_alimento) {
    const [resultado] = await connection.query("SELECT id, id_usuario, quantidade FROM alimentos WHERE id = ? LIMIT 1", [id_alimento]);

    return resultado[0] ?? null;
};

async function buscarDoacaoAtivaPorAlimento(id_alimento) {
    const [resultado] = await connection.query("SELECT id, status FROM doacoes WHERE id_alimento = ? AND status IN ('disponivel', 'reservada') LIMIT 1", [id_alimento]);

    return resultado[0] ?? null;
};

module.exports = {
    criarDoacao,
    buscarAlimentoPorId,
    buscarDoacaoAtivaPorAlimento,
};