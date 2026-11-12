const solicitacoesService = require("../services/solicitacoesService.js");

async function criarSolicitacaoController(req, res) {
    const { id_doacao, id_instituicao } = req.body;
    const resultado = await solicitacoesService.criarSolicitacaoService(id_doacao, id_instituicao);

    res.status(201).json(resultado);
};

async function listarSolicitacoesDoDoadorController(req, res) {
    const { id_usuario } = req.query;
    const resultado = await solicitacoesService.listarSolicitacoesDoDoadorService(id_usuario);

    res.status(200).json(resultado);
};

async function listarSolicitacoesDaInstituicaoController(req, res) {
    const { id_instituicao } = req.query;
    const resultado = await solicitacoesService.listarSolicitacoesDaInstituicaoService(id_instituicao);

    res.status(200).json(resultado);
};

async function aceitarSolicitacaoController(req, res) {
    const idSolicitacao = req.params.id;
    const { id_usuario } = req.body;
    const resultado = await solicitacoesService.aceitarSolicitacaoService(idSolicitacao, id_usuario);

    res.status(200).json(resultado);
};

async function recusarSolicitacaoController(req, res) {
    const idSolicitacao = req.params.id;
    const { id_usuario } = req.body;
    const resultado = await solicitacoesService.recusarSolicitacaoService(idSolicitacao, id_usuario);

    res.status(200).json(resultado);
};

module.exports = {
    criarSolicitacaoController,
    listarSolicitacoesDoDoadorController,
    listarSolicitacoesDaInstituicaoController,
    aceitarSolicitacaoController,
    recusarSolicitacaoController,
};