const doacoesService = require("../services/doacoesService.js");

async function criarDoacaoController(req, res) {
    const { id_alimento, quantidade, id_usuario } = req.body;
    const resultado = await doacoesService.criarDoacaoService(id_alimento, quantidade, id_usuario);

    res.status(201).json(resultado);
};

async function listarDoacoesDisponiveisController(req, res) {
    const { id_usuario } = req.query;
    const resultado = await doacoesService.listarDoacoesDisponiveisService(id_usuario);

    res.status(200).json(resultado);
};

async function listarDoacoesDoDoadorController(req, res) {
    const { id_usuario } = req.query;
    const resultado = await doacoesService.listarDoacoesDoDoadorService(id_usuario);

    res.status(200).json(resultado);
};


module.exports = {
    criarDoacaoController,
    listarDoacoesDisponiveisController,
    listarDoacoesDoDoadorController,
};