const express = require("express");
const router = express.Router();
const { criarSolicitacaoController, listarSolicitacoesDoDoadorController } = require("../controllers/solicitacoesController");

router.post("/", criarSolicitacaoController);
router.get("/doador", listarSolicitacoesDoDoadorController);

module.exports = router;