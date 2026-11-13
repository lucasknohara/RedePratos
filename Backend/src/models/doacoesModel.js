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

async function listarDoacoesDisponiveis() {
    const [resultado] = await connection.query(`
        SELECT d.id, d.quantidade, d.status, a.nome, a.categoria, a.unidade, a.validade, a.origem 
        FROM doacoes d
        INNER JOIN alimentos a ON a.id = d.id_alimento
        WHERE d.status = 'disponivel'
        ORDER BY d.criado_em DESC
    `);

    return resultado;
};

async function buscarInstiruicaoPorId(id_usuario) {
    const [resultado] = await connection.query("SELECT id FROM usuarios WHERE id = ? AND tipo_usuario = 'instituicao' LIMIT 1", [id_usuario]);

    return resultado[0] ?? null;
};

async function buscarDoadorPorId(id_usuario) {
    const [resultado] = await connection.query(`
        SELECT id
        FROM usuarios
        WHERE id = ? AND tipo_usuario = 'doador'
        LIMIT 1
    `, [id_usuario]);

    return resultado[0] ?? null;
}

async function listarDoacoesDoDoador(id_usuario) {
    const [resultado] = await connection.query(`
        SELECT d.id, d.quantidade, d.status, d.criado_em, a.nome, a.categoria, a.unidade, a.validade, a.origem, a.observacao,
        COUNT(
            CASE
                WHEN s.status = 'pendente' THEN 1
            END
        ) AS solicitacoes_pendentes,
        GROUP_CONCAT(
            DISTINCT CASE
                WHEN s.status IN ('pendente', 'aceita', 'concluida')
                THEN u.nome
                ELSE NULL
            END
            ORDER BY u.nome
            SEPARATOR ', '
        ) AS instituicoes
        FROM doacoes d
        INNER JOIN alimentos a ON a.id = d.id_alimento
        LEFT JOIN solicitacoes s ON s.id_doacao = d.id
        LEFT JOIN usuarios u ON u.id = s.id_instituicao
        WHERE a.id_usuario = ?
        GROUP BY d.id, d.quantidade, d.status, d.criado_em, a.nome, a.categoria, a.unidade, a.validade, a.origem, a.observacao
        ORDER BY d.criado_em DESC
    `, [id_usuario]);

    return resultado;
}

module.exports = {
    criarDoacao,
    buscarAlimentoPorId,
    buscarDoacaoAtivaPorAlimento,
    listarDoacoesDisponiveis,
    buscarInstiruicaoPorId,
    buscarDoadorPorId,
    listarDoacoesDoDoador,
};