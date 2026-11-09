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
        throw new AppError("email inválido!", 400);
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

module.exports = {
    criarUsuarioService,
};