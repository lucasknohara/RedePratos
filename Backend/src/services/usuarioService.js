const AppError = require("../errors/AppError.js");
const usuarioModel = require("../models/usuarioModel.js");
const bcrypt = require("bcrypt");

async function criarUsuarioService(nome, email, tipo_usuario, senha) {    
    if (typeof nome !== "string" || nome.trim() === "") {
        throw new AppError("Nome inválido!", 400);
    }

    if (typeof senha !== "string" || senha.trim() === "" || senha.length < 8) {
        throw new AppError("Senha inválida!", 400);
    }

    if (typeof email !== "string" || email.trim() === "") {
        throw new AppError("Email inválido!", 400);
    }

    if (typeof tipo_usuario !== "string" || tipo_usuario.trim() === "" || (tipo_usuario !== "doador" && tipo_usuario !== "instituicao")) {
        throw new AppError("Tipo inválido!", 400);
    }

    const emailNormalizado = email.trim().toLowerCase();

    const usuarioExistente = await usuarioModel.buscarUsuarioPorEmail(emailNormalizado);

    if (usuarioExistente !== null) {
        throw new AppError("Email já cadastrado!", 409);
    }

    const senha_hash = await bcrypt.hash(senha, 10);
    const resultado = await usuarioModel.criarUsuario(nome.trim(), emailNormalizado, tipo_usuario, senha_hash);

    return {
        id: resultado.insertId,
        nome: nome.trim(),
        email: emailNormalizado,
        tipo_usuario: tipo_usuario
    }
};

async function loginUsuarioService(email, senha) {
    const buscarUsuarioPorEmail = await usuarioModel.buscarUsuarioPorEmail(email);

    if (buscarUsuarioPorEmail === null) {
        throw new AppError("Email ou senha inválidos!", 401);
    }

    const senhaCorreta = await bcrypt.compare(senha, buscarUsuarioPorEmail.senha);

    if (!senhaCorreta) {
        throw new AppError("Email ou senha inválidos!", 401);
    }

    return {
        id: buscarUsuarioPorEmail.id,
        nome: buscarUsuarioPorEmail.nome,
        email: buscarUsuarioPorEmail.email,
        tipo_usuario: buscarUsuarioPorEmail.tipo_usuario
    }
};

async function buscarPerfilPorIdService(id_usuario) {
    const idUsuario = Number(id_usuario);

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        throw new AppError("Id do usuário inválido!", 400);
    }

    const buscarUsuario = await usuarioModel.buscarPerfilPorId(idUsuario);

    if (buscarUsuario === null) {
        throw new AppError("Usuário não encontrado!", 404);
    }

    return buscarUsuario;
};



async function atualizarPerfilService(id_usuario, nome, email, telefone, origem, tipo_instituicao, regiao, descricao) {
    const idUsuario = Number(id_usuario);

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        throw new AppError("Id do usuário inválido!", 400);
    }

    const usuario = await usuarioModel.buscarPerfilPorId(idUsuario);

    if (usuario === null) {
        throw new AppError("Usuário não encontrado!", 404);
    }

    if (typeof nome !== "string" || nome.trim().length < 2 || nome.trim().length > 150) {
        throw new AppError("Nome inválido!", 400);
    }

    const emailNormalizado = typeof email === "string"
        ? email.trim().toLowerCase()
        : "";

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalizado);

    if (!emailValido || emailNormalizado.length > 255) {
        throw new AppError("E-mail inválido!", 400);
    }

    const usuarioEmail = await usuarioModel.buscarUsuarioPorEmail(emailNormalizado);

    if (usuarioEmail !== null && Number(usuarioEmail.id) !== idUsuario) {
        throw new AppError("E-mail já está sendo utilizado!", 409);
    }

    const telefoneNumeros = typeof telefone === "string"
        ? telefone.replace(/\D/g, "")
        : "";

    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 13) {
        throw new AppError("Telefone inválido!", 400);
    }

    let origemPerfil = null;
    let tipoInstituicao = null;
    let regiaoPerfil = null;
    let descricaoPerfil = null;

    if (usuario.tipo_usuario === "doador") {
        if (!["residencia", "comercio"].includes(origem)) {
            throw new AppError("Origem inválida!", 400);
        }

        origemPerfil = origem;

    } else if (usuario.tipo_usuario === "instituicao") {
        if (!["ong", "associacao", "beneficente", "outro"].includes(tipo_instituicao)) {
            throw new AppError("Tipo de instituição inválido!", 400);
        }

        if (typeof regiao !== "string" || !regiao.trim() || regiao.trim().length > 120) {
            throw new AppError("Região inválida!", 400);
        }

        if (typeof descricao !== "string" || descricao.trim().length > 400) {
            throw new AppError("Descrição inválida!", 400);
        }

        tipoInstituicao = tipo_instituicao;
        regiaoPerfil = regiao.trim();
        descricaoPerfil = descricao.trim();

    } else {
        throw new AppError("Tipo de usuário inválido!", 403);
    }

    await usuarioModel.atualizarPerfil(
        idUsuario,
        nome.trim(),
        emailNormalizado,
        telefone.trim(),
        origemPerfil,
        tipoInstituicao,
        regiaoPerfil,
        descricaoPerfil
    );

    return await usuarioModel.buscarPerfilPorId(idUsuario);
};

module.exports = {
    criarUsuarioService,
    loginUsuarioService,
    buscarPerfilPorIdService,
    atualizarPerfilService,
};