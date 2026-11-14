const connection = require("../config/database.js");

async function criarUsuario(nome, email, tipo_usuario, senha_hash) {
    const [resultado] = await connection.query("INSERT INTO usuarios (nome, email, tipo_usuario, senha) VALUES (?, ?, ?, ?)", [nome, email, tipo_usuario, senha_hash]);

    return resultado;
};

async function buscarUsuarioPorEmail(email) {
    const [resultado] = await connection.query("SELECT * FROM usuarios WHERE email = ? LIMIT 1", [email]);

    return resultado[0] ?? null;
};

async function buscarPerfilPorId(id_usuario) {
    const [resultado] = await connection.query("SELECT id, nome, email, tipo_usuario, telefone, origem, tipo_instituicao, regiao, descricao  FROM usuarios WHERE id = ? LIMIT 1", [id_usuario]);

    return resultado[0] ?? null;
};

async function atualizarPerfil(id_usuario, nome, email, telefone, origem, tipo_instituicao, regiao, descricao) {
    const [resultado] = await connection.query(`
        UPDATE usuarios SET nome = ?, email = ?, telefone = ?, origem = ?, tipo_instituicao = ?, regiao = ?, descricao = ?
        WHERE id = ?
    `, [nome, email, telefone, origem, tipo_instituicao, regiao, descricao, id_usuario]);

    return resultado.affectedRows;
};

module.exports = {
    criarUsuario,
    buscarUsuarioPorEmail,
    buscarPerfilPorId,
    atualizarPerfil,
};