const AppError = require("../errors/AppError.js");

function errorHandler(error, req, res, next) {
    if (res.headersSent) {
        return next(error);
    }

    const erroConhecido = error instanceof AppError;

    const status = erroConhecido ? error.status : 500;

    const message = erroConhecido
        ? error.message
        : "Erro interno do servidor!";

    if (!erroConhecido) {
        console.error(error);
    }

    return res.status(status).json({
        message
    });
}

module.exports = errorHandler;
