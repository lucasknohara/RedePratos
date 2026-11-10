const connection = require("../config/database.js");

async function criarAlimento(nome, categoria, quantidade, unidade, validade, origem, observacao, id_usuario) {
    const [resultado] = await connection.query(
        `INSERT INTO alimentos (nome, categoria, quantidade, unidade, validade, origem, observacao, id_usuario)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [nome, categoria, quantidade, unidade, validade, origem, observacao, id_usuario]
    );

    return resultado;
};

module.exports = {
    criarAlimento,
};