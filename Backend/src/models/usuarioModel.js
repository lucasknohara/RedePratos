const connection = require("../config/database.js");

async function criarUsuario(nome, email, tipo_usuario, senha_hash) {
    const [resultado] = await connection.query("INSERT INTO usuarios (nome, email, tipo_usuario, senha) VALUES (?, ?, ?, ?)", [nome, email, tipo_usuario, senha_hash]);

    return resultado;
};

async function buscarUsuarioPorEmail(email) {
    const [resultado] = await connection.query("SELECT * FROM usuarios WHERE email = ? LIMIT 1", [email]);

    return resultado[0] ?? null;
};

module.exports = {
    criarUsuario,
    buscarUsuarioPorEmail,
};