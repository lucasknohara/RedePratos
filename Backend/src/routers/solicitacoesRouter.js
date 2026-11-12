const express = require("express");
const router = express.Router();
const { criarSolicitacaoController } = require("../controllers/solicitacoesController");

router.post("/", criarSolicitacaoController);

module.exports = router;