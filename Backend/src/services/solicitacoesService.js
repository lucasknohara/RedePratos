const AppError = require("../errors/AppError.js");
const solicitacoesModel = require("../models/solicitacoesModel.js");

async function criarSolicitacaoService(id_doacao, id_instituicao) {
    const idDoacao = Number(id_doacao);
    const idInstituicao = Number(id_instituicao);

    if (!Number.isInteger(idDoacao) || idDoacao <= 0) {
        throw new AppError("Id da doação inválida!", 400);
    }

    if (!Number.isInteger(idInstituicao) || idInstituicao <= 0) {
        throw new AppError("Id da instituição inválida!", 400);
    }

    const buscarDoacaoPorId = await solicitacoesModel.buscarDoacaoPorId(idDoacao);
    const buscarInstituicaoPorId = await solicitacoesModel.buscarInstituicaoPorId(idInstituicao);

    if (buscarDoacaoPorId === null) {
        throw new AppError("Doação inválida!", 404);
    }

    if (Number(buscarDoacaoPorId.id_usuario) === idInstituicao) {
        throw new AppError("A instituição é dona da doação!", 403);
    }

    if (buscarDoacaoPorId.status !== "disponivel") {
        throw new AppError("Doação não disponivel!", 409);
    }

    if (buscarInstituicaoPorId === null) {
        throw new AppError("instituição inválida!", 403);
    }

    const buscarSolicitacaoPendente = await solicitacoesModel.buscarSolicitacaoPendente(idDoacao, idInstituicao);

    if (buscarSolicitacaoPendente !== null) {
        throw new AppError("Solicitação já existente!", 409);
    }

    await solicitacoesModel.criarSolicitacao(idDoacao, idInstituicao);

    return {
        message: "Solicitação feita com sucesso!"
    }
};

async function listarSolicitacoesDoDoadorService(id_usuario) {
    const idUsuario = Number(id_usuario);

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        throw new AppError("Id do usuário inválido!", 400);
    }

    const buscarDoadorPorId = await solicitacoesModel.buscarDoadorPorId(idUsuario);

    if (buscarDoadorPorId === null) {
        throw new AppError("Usuário inválido!", 403);
    }

    const resultado = await solicitacoesModel.listarSolicitacoesDoDoador(idUsuario);

    return resultado;
};

module.exports = {
    criarSolicitacaoService,
    listarSolicitacoesDoDoadorService,
}