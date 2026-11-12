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

async function listarSolicitacoesDoDoador(id_usuario) {
    const [resultado] = await connection.query(`
        SELECT s.id AS id_solicitacao, s.status, d.id AS id_doacao, d.quantidade, a.nome, a.categoria, a.validade, u.id AS id_instituicao, u.nome AS nome_instituicao
        FROM solicitacoes s
        INNER JOIN doacoes d ON s.id_doacao = d.id
        INNER JOIN alimentos a ON a.id = d.id_alimento
        INNER JOIN usuarios u ON u.id = s.id_instituicao
        WHERE a.id_usuario = ?
        ORDER BY s.criado_em DESC
    `, [id_usuario]);

    return resultado;
};

async function buscarDoadorPorId(id_usuario) {
    const [resultado] = await connection.query("SELECT id FROM usuarios WHERE id = ? AND tipo_usuario = 'doador' LIMIT 1", [id_usuario]);

    return resultado[0] ?? null;
};

async function listarSolicitacoesDaInstituicao(id_instituicao) {
    const [resultado] = await connection.query(`
		SELECT s.id AS id_solicitacao, s.status, s.criado_em, d.id AS id_doacao, d.quantidade, a.nome, a.categoria, a.validade, a.origem, u.id AS id_doador, u.nome AS nome_doador
        FROM solicitacoes s
        INNER JOIN doacoes d ON s.id_doacao = d.id
        INNER JOIN alimentos a ON d.id_alimento = a.id
        INNER JOIN usuarios u ON a.id_usuario = u.id
        WHERE s.id_instituicao = ?
        ORDER BY s.criado_em DESC
    `, [id_instituicao]);

    return resultado;
};

module.exports = {
    criarSolicitacao,
    buscarDoacaoPorId,
    buscarInstituicaoPorId,
    buscarSolicitacaoPendente,
    listarSolicitacoesDoDoador,
    buscarDoadorPorId,
    listarSolicitacoesDaInstituicao,
};