const connection = require("../config/database.js");

async function criarSolicitacao(id_doacao, id_instituicao) {
    const [resultado] = await connection.query("INSERT INTO solicitacoes (id_doacao, id_instituicao) VALUES (?, ?)", [id_doacao, id_instituicao]);

    return resultado;
};

async function buscarDoacaoPorId(id_doacao) {
    const [resultado] = await connection.query(`
        SELECT d.id, d.status, a.id_usuario
        FROM doacoes d
        INNER JOIN alimentos a ON a.id = d.id_alimento
        WHERE d.id = ?
        LIMIT 1
    `, [id_doacao]);

    return resultado[0] ?? null;
};

async function buscarInstituicaoPorId(id_instituicao) {
    const [resultado] = await connection.query("SELECT id FROM usuarios WHERE id = ? AND tipo_usuario = 'instituicao'", [id_instituicao]);

    return resultado[0] ?? null;
};

async function buscarSolicitacaoPendente(id_doacao, id_instituicao) {
    const [resultado] = await connection.query(`
        SELECT id
        FROM solicitacoes
        WHERE id_doacao = ?
        AND id_instituicao = ?
        AND status = 'pendente'
        LIMIT 1
    `, [id_doacao, id_instituicao]);

    return resultado[0] ?? null;
};

module.exports = {
    criarSolicitacao,
    buscarDoacaoPorId,
    buscarInstituicaoPorId,
    buscarSolicitacaoPendente,
};