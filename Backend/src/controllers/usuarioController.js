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
};

async function buscarPerfilPorIdController(req, res) {
    const id_usuario = req.params.id;
    const resultado = await usuarioService.buscarPerfilPorIdService(id_usuario);

    res.status(200).json(resultado);
};

async function atualizarPerfilController(req, res) {
    const id_usuario = req.params.id;
    const { nome, email, telefone, origem, tipo_instituicao, tipo, regiao, descricao } = req.body;
    const resultado = await usuarioService.atualizarPerfilService(id_usuario, nome, email, telefone, origem, tipo_instituicao ?? tipo, regiao, descricao);

    res.status(200).json(resultado);
};

module.exports = {
    criarUsuarioController,
    loginUsuarioController,
    buscarPerfilPorIdController,
    atualizarPerfilController
};