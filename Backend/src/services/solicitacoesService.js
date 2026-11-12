const AppError = require("../errors/AppError.js");
const solicitacoesModel = require("../models/solicitacoesModel.js");
const pool = require("../config/database.js");
const { application } = require("express");

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

async function listarSolicitacoesDaInstituicaoService(id_instituicao) {
    const idInstituicao = Number(id_instituicao);

    if (!Number.isInteger(idInstituicao) || idInstituicao <= 0) {
        throw new AppError("Id da instituição inválida!", 400);
    }

    const buscarInstituicaoPorId = await solicitacoesModel.buscarInstituicaoPorId(idInstituicao);

    if (buscarInstituicaoPorId === null) {
        throw new AppError("instituição inválida!", 403);
    }

    const resultado = await solicitacoesModel.listarSolicitacoesDaInstituicao(idInstituicao);

    return resultado;
};

async function aceitarSolicitacaoService(id_solicitacao, id_usuario) {
    const idSolicitacao = Number(id_solicitacao);
    const idUsuario = Number(id_usuario);

    if (!Number.isInteger(idSolicitacao) || idSolicitacao <= 0) {
        throw new AppError("Id da solicitação inválida!", 400);
    }

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        throw new AppError("Id do usuário inválido!", 400);
    }

    const doador = await solicitacoesModel.buscarDoadorPorId(idUsuario);

    if (doador === null) {
        throw new AppError("Usuário não é um doador!", 403);
    }

    const solicitacaoInicial = await solicitacoesModel.buscarSolicitacaoParaAceitar(idSolicitacao);

    if (solicitacaoInicial === null) {
        throw new AppError("Solicitação não encontrada!", 404);
    }

    const idDoacao = Number(solicitacaoInicial.id_doacao);
    const conn = await pool.getConnection();

    let transacaoIniciada = false;

    try {
        await conn.beginTransaction();
        transacaoIniciada = true;

        const doacao = await solicitacoesModel.buscarDoacaoParaAtualizar(idDoacao, conn);

        if (doacao === null) {
            throw new AppError("Doação não encontrada!", 404);
        }

        if (Number(doacao.id_usuario) !== idUsuario) {
            throw new AppError("Usuário não é dono da doação!", 403);
        }

        if (doacao.status !== "disponivel") {
            throw new AppError("Doação não está disponível!", 409);
        }

        const buscarSolicitacaoParaAtualizar = await solicitacoesModel.buscarSolicitacaoParaAtualizar(idSolicitacao, conn);

        if (buscarSolicitacaoParaAtualizar === null) {
            throw new AppError("Solicitação não encontrada!", 404);
        }

        if (Number(buscarSolicitacaoParaAtualizar.id_doacao) !== idDoacao) {
            throw new AppError("Solicitações incompatíveis!", 409);
        }

        if (buscarSolicitacaoParaAtualizar.status !== "pendente") {
            throw new AppError("Solicitação não está pendente!", 409);
        }

        const atualizarSolicitacaoAceita = await solicitacoesModel.atualizarSolicitacaoAceita(idSolicitacao, conn);

        if (atualizarSolicitacaoAceita !== 1) {
            throw new AppError("Não foi possível aceitar a solicitação!", 409);
        }

        await solicitacoesModel.encerrarOutrasSolicitacoes(idDoacao, idSolicitacao, conn);

        const reservarDoacao = await solicitacoesModel.reservarDoacao(idDoacao, conn);

        if (reservarDoacao !== 1) {
            throw new AppError("Não foi possível reservar a doação!", 409);
        }

        await conn.commit();
        transacaoIniciada = false;

        return {
            message: "Solicitação aceita e doação reservada com sucesso!"
        };

    } catch (error) {
        if (transacaoIniciada) {
            try {
                await conn.rollback();
                } catch (erroRollback) {
            }
        }

        throw error;

    } finally {
        conn.release();
    }
};

async function recusarSolicitacaoService(id_solicitacao, id_usuario) {
    const idSolicitacao = Number(id_solicitacao);
    const idUsuario = Number(id_usuario);

    if (!Number.isInteger(idSolicitacao) || idSolicitacao <= 0) {
        throw new AppError("Id da solicitação inválida!", 400);
    }

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        throw new AppError("Id do usuário inválido!", 400);
    }

    const doador = await solicitacoesModel.buscarDoadorPorId(idUsuario);

    if (doador === null) {
        throw new AppError("Usuário não é um doador!", 403);
    }

    const solicitacaoInicial = await solicitacoesModel.buscarSolicitacaoParaAceitar(idSolicitacao);

    if (solicitacaoInicial === null) {
        throw new AppError("Solicitação não encontrada!", 404);
    }

    const idDoacao = Number(solicitacaoInicial.id_doacao);

    const conn = await pool.getConnection();

    let transacaoIniciada = false;

    try {
        await conn.beginTransaction();
        transacaoIniciada = true;

        const doacao = await solicitacoesModel.buscarDoacaoParaAtualizar(idDoacao, conn);

        if (doacao === null) {
            throw new AppError("Doação não encontrada!", 404);
        }

        if (Number(doacao.id_usuario) !== idUsuario) {
            throw new AppError("Usuário não é dono da doação!", 403);
        }

        if (doacao.status !== "disponivel") {
            throw new AppError("Doação não está disponível!", 409);
        }

        const solicitacao = await solicitacoesModel.buscarSolicitacaoParaAtualizar(idSolicitacao, conn);

        if (solicitacao === null) {
            throw new AppError("Solicitação não encontrada!", 404);
        }

        if (Number(solicitacao.id_doacao) !== idDoacao) {
            throw new AppError("Solicitações incompatíveis!", 409);
        }

        if (solicitacao.status !== "pendente") {
            throw new AppError("Solicitação não está pendente!", 409);
        }

        const solicitacaoRecusada = await solicitacoesModel.atualizarSolicitacaoRecusada(idSolicitacao, conn);

        if (solicitacaoRecusada !== 1) {
            throw new AppError("Não foi possível recusar a solicitação!", 409);
        }

        await conn.commit();
        transacaoIniciada = false;

        return {
            message: "Solicitação recusada com sucesso!"
        };

    } catch (error) {
        if (transacaoIniciada) {
            try {
                await conn.rollback();
                } catch (erroRollback) {
            }
        }

        throw error;

    } finally {
        conn.release();
    }
};

module.exports = {
    criarSolicitacaoService,
    listarSolicitacoesDoDoadorService,
    listarSolicitacoesDaInstituicaoService,
    aceitarSolicitacaoService,
    recusarSolicitacaoService,
};