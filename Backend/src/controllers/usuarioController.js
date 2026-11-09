const usuarioService = require("../services/usuarioService.js");

async function criarUsuarioController(req, res) {
    const { nome, email, tipo_usuario, senha } = req.body;

    const resultado = await usuarioService.criarUsuarioService(nome, email, tipo_usuario, senha);

    res.status(201).json(resultado);
};

module.exports = {
    criarUsuarioController,
}