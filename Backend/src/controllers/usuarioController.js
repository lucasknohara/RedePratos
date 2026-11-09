const usuarioService = require("../services/usuarioService.js");

async function criarUsuarioController(req, res) {
    const { nome, email, tipo_usuario, senha } = req.body;

    const resultado = await usuarioService.criarUsuarioService(nome, email, tipo_usuario, senha);

    res.status(201).json(resultado);
};

async function loginUsuarioController(req, res) {
    const { email, senha } = req.body;

    const resultado = await usuarioService.loginUsuarioService(email, senha);

    res.status(200).json(resultado);
}

module.exports = {
    criarUsuarioController,
    loginUsuarioController
}