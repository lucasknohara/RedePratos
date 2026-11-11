const alimentosService = require("../services/alimentosService.js");

async function criarAlimentoController(req, res) {
    const { nome, categoria, quantidade, unidade, validade, origem, observacao, id_usuario } = req.body;
    const resultado = await alimentosService.criarAlimentoService(nome, categoria, quantidade, unidade, validade, origem, observacao, id_usuario);

    res.status(201).json(resultado);
};

async function listarAlimentosController(req, res) {
    const { id_usuario } = req.query;
    const resultado = await alimentosService.listarAlimentosService(id_usuario);

    res.status(200).json(resultado);
};

async function atualizarAlimentoController(req, res) {
    const { nome, categoria, quantidade, unidade, validade, origem, observacao, id_usuario } = req.body;
    const { id_alimento } = req.params;
    const resultado = await alimentosService.atualizarAlimentoService(id_alimento, nome, categoria, quantidade, unidade, validade, origem, observacao, id_usuario);

    res.status(200).json(resultado);
};

async function deletarAlimentoController(req, res) {
    const { id_alimento } = req.params;
    const { id_usuario } = req.body;
    const resultado = await alimentosService.deletarAlimentoService(id_alimento, id_usuario);

    res.status(200).json(resultado);
};

module.exports = {
    criarAlimentoController,
    listarAlimentosController,
    atualizarAlimentoController,
    deletarAlimentoController
};