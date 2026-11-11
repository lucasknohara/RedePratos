const alimentosModel = require("../models/alimentosModel.js");
const AppError = require("../errors/AppError.js");

async function criarAlimentoService(nome, categoria, quantidade, unidade, validade, origem, observacao, id_usuario) {
    const [ano, mes, dia] = validade.split("-").map(Number);
    let dataValidade = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    const hojeFormatado = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
    const origemTrim = origem.trim();

    if (typeof nome !== "string" || nome.trim() === "") {
        throw new AppError("Nome inválido!", 400);
    }

    if (typeof categoria !== "string" || categoria.trim() === "") {
        throw new AppError("Categoria inválida!!", 400);
    }

    if (typeof quantidade !== "number" || quantidade <= 0 || quantidade === NaN) {
        throw new AppError("Quantidade inválida!", 400);
    }

    if (typeof unidade !== "string" || unidade.trim() === "") {
        throw new AppError("Unidade inválida!", 400);
    }

    if (typeof validade !== "string" || validade.trim() === "") {
        throw new AppError("Validade inválida!", 400);
    }

    if (
        dataValidade.getFullYear() !== ano ||
        dataValidade.getMonth() !== mes - 1 ||
        dataValidade.getDate() !== dia
    ) {
        throw new AppError("Data de validade inexistente!", 400);
    }

    if (validade < hojeFormatado) {
        throw new AppError("A validade não pode ser anterior à data atual!", 400);
    }

    if (typeof origemTrim !== "string" || origemTrim === "" || origemTrim !== "Residência" && origemTrim !== "Comércio") {
        throw new AppError("Origem inválida!", 400);
    }

    const resultado = await alimentosModel.criarAlimento(nome, categoria, quantidade, unidade, validade, origem, observacao, id_usuario);

    return {
        id: resultado.insertId,
        nome: nome,
        categoria: categoria,
        quantidade: quantidade,
        unidade: unidade,
        validade: validade,
        origem: origem
    }
};

async function listarAlimentosService(id_usuario) {
    const idUsuario = Number(id_usuario);
    
    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        throw new AppError("Id inválido!", 400)
    }
 
    const buscarUsuario = await alimentosModel.buscarUsuarioPorId(idUsuario);

    if (buscarUsuario === null) {
        throw new AppError("Usuário não existe!", 404);
    }

    const resultado = await alimentosModel.listarAlimentos(idUsuario);

    return resultado;
};

async function atualizarAlimentoService(id_alimento, nome, categoria, quantidade, unidade, validade, origem, observacao, id_usuario) {
    const idAlimento = Number(id_alimento);
    const idUsuario = Number(id_usuario);

    if (!Number.isInteger(idAlimento) || idAlimento <= 0) {
        throw new AppError("Id do alimento inválido!", 400);
    }

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        throw new AppError("Id do usuário inválido!", 400);
    }

    if (typeof nome !== "string" || nome.trim() === "") {
        throw new AppError("Nome inválido!", 400);
    }

    if (typeof categoria !== "string" || categoria.trim() === "") {
        throw new AppError("Categoria inválida!", 400);
    }

    if (typeof quantidade !== "number" || !Number.isFinite(quantidade) || quantidade <= 0) {
        throw new AppError("Quantidade inválida!", 400);
    }

    if (typeof unidade !== "string" || unidade.trim() === "") {
        throw new AppError("Unidade inválida!", 400);
    }

    if (typeof validade !== "string" || validade.trim() === "") {
        throw new AppError("Validade inválida!", 400);
    }

    const formatoData = /^\d{4}-\d{2}-\d{2}$/;

    if (!formatoData.test(validade)) {
        throw new AppError("Formato de data inválido!", 400);
    }

    const [ano, mes, dia] = validade.split("-").map(Number);
    const dataValidade = new Date(ano, mes - 1, dia);

    if (
        dataValidade.getFullYear() !== ano ||
        dataValidade.getMonth() !== mes - 1 ||
        dataValidade.getDate() !== dia
    ) {
        throw new AppError("Data de validade inexistente!", 400);
    }

    const hoje = new Date();
    const hojeFormatado = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;

    if (validade < hojeFormatado) {
        throw new AppError("A validade não pode ser anterior à data atual!", 400);
    }

    if (typeof origem !== "string" || origem.trim() === "") {
        throw new AppError("Origem inválida!", 400);
    }

    const origemTrim = origem.trim();

    if (origemTrim !== "Residência" && origemTrim !== "Comércio") {
        throw new AppError("Origem inválida!", 400);
    }

    const buscarUsuario = await alimentosModel.buscarUsuarioPorId(idUsuario);

    if (buscarUsuario === null) {
        throw new AppError("Usuário não existe!", 404);
    }

    const buscarAlimento = await alimentosModel.buscarAlimento(idAlimento, idUsuario);

    if (buscarAlimento === null) {
        throw new AppError("Alimento não encontrado!", 404);
    }

    await alimentosModel.atualizarAlimento(idAlimento, nome.trim(), categoria.trim(), quantidade, unidade.trim(), validade, origemTrim, observacao, idUsuario);

    return {
        id: idAlimento,
        nome: nome.trim(),
        categoria: categoria.trim(),
        quantidade: quantidade,
        unidade: unidade.trim(),
        validade: validade,
        origem: origemTrim,
        observacao: observacao
    };
};

async function deletarAlimentoService(id_alimento, id_usuario) {
    const idAlimento = Number(id_alimento);
    const idUsuario = Number(id_usuario);

    if (!Number.isInteger(idAlimento) || idAlimento <= 0) {
        throw new AppError("ID do alimento inválido!", 400);
    }

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        throw new AppError("ID do usuário inválido!", 400);
    }

    const buscarAlimento = await alimentosModel.buscarAlimento(idAlimento, idUsuario);
    const buscarUsuario = await alimentosModel.buscarUsuarioPorId(idUsuario);

    if (buscarAlimento === null) {
        throw new AppError("Alimento não encontrado!", 404);
    }

    if (buscarUsuario === null) {
        throw new AppError("Usuário não existe!", 404);
    }
    
    const resultado = await alimentosModel.deletarAlimento(idAlimento, idUsuario);

    if (resultado.affectedRows === 0) {
        throw new AppError("Não foi possivel excluir alimento!", 404)
    }

    return {
        message: "Alimento excluido!"
    }
};

module.exports = {
    criarAlimentoService,
    listarAlimentosService,
    atualizarAlimentoService,
    deletarAlimentoService
};