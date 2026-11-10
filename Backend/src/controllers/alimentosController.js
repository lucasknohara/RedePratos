const alimentosService = require("../services/alimentosService.js");

async function criarAlimentoController(req, res) {
    const { nome, categoria, quantidade, unidade, validade, origem, observacao, id_usuario } = req.body;
    const resultado = await alimentosService.criarAlimentoService(nome, categoria, quantidade, unidade, validade, origem, observacao, id_usuario);

    res.status(201).json(resultado);
};

module.exports = {
    criarAlimentoController,
};