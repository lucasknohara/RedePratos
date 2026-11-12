const AppError = require("../errors/AppError.js");
const doacoesModel = require("../models/doacoesModel.js");

async function criarDoacaoService(id_alimento, quantidade, id_usuario) {
    const idAlimento = Number(id_alimento);
    const idUsuario =  Number(id_usuario);

    if (!Number.isInteger(idAlimento) || idAlimento <= 0) {
        throw new AppError("Id do alimento inválido!", 400);
    }

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        throw new AppError("Id do usuário inválido!", 400);
    }    
    
    if (typeof quantidade !== "number" || !Number.isFinite(quantidade) || quantidade <= 0) {
        throw new AppError("Quantidade inválida!", 400);
    }

    const buscarAlimento = await doacoesModel.buscarAlimentoPorId(idAlimento);
    const buscarAlimentoAtivo = await doacoesModel.buscarDoacaoAtivaPorAlimento(idAlimento);

    if (buscarAlimento === null || Number(buscarAlimento.id_usuario) !== idUsuario) {
        throw new AppError("Alimento não encontrado!", 404);
    }

    if (buscarAlimentoAtivo !== null) {
        throw new AppError("Alimento já doado!", 409);
    }

    if (buscarAlimento.quantidade < quantidade) {
        throw new AppError("Quantidade inválida!", 400);
    }

    await doacoesModel.criarDoacao(idAlimento, quantidade);

    return {
        message: "Alimento doado com sucesso!"
    };
};

async function listarDoacoesDisponiveisService(id_usuario) {
    const idInstituicao = Number(id_usuario);

    if (!Number.isInteger(idInstituicao) || idInstituicao <= 0) {
        throw new AppError("Id da instituição inválida!", 400);
    }  

    const buscarInstiruicaoPorId = await doacoesModel.buscarInstiruicaoPorId(idInstituicao);

    if (buscarInstiruicaoPorId === null) {
        throw new AppError("Não é uma instituição!", 403);
    }

    const resultado = await doacoesModel.listarDoacoesDisponiveis();

    return resultado;
};

module.exports = {
    criarDoacaoService,
    listarDoacoesDisponiveisService,
};