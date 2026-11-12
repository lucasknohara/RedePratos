const doacoesService = require("../services/doacoesService.js");

async function criarDoacaoController(req, res) {
    const { id_alimento, quantidade, id_usuario } = req.body;
    const resultado = await doacoesService.criarDoacaoService(id_alimento, quantidade, id_usuario);

    res.status(201).json(resultado);
};

module.exports = {
    criarDoacaoController,
}