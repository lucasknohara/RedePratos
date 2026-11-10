const connection = require("../config/database.js");

async function criarAlimento(nome, categoria, quantidade, unidade, validade, origem, observacao, id_usuario) {
    const [resultado] = await connection.query(
        `INSERT INTO alimentos (nome, categoria, quantidade, unidade, validade, origem, observacao, id_usuario)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [nome, categoria, quantidade, unidade, validade, origem, observacao, id_usuario]
    );

    return resultado;
};

async function listarAlimentos(id_usuario) {
    const [resultado] = await connection.query("SELECT * FROM alimentos WHERE id_usuario = ? ORDER BY validade ASC", [id_usuario]);

    return resultado;
};

async function buscarUsuarioPorId(id_usuario) {
    const [resultado] = await connection.query("SELECT id FROM usuarios WHERE id = ? LIMIT 1", [id_usuario]);

    return resultado[0] ?? null;
};

module.exports = {
    criarAlimento,
    listarAlimentos,
    buscarUsuarioPorId,
};