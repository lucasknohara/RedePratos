const express = require("express");
const router = express.Router();
const { criarSolicitacaoController, listarSolicitacoesDoDoadorController, listarSolicitacoesDaInstituicaoController } = require("../controllers/solicitacoesController");

router.post("/", criarSolicitacaoController);
router.get("/doador", listarSolicitacoesDoDoadorController);
router.get("/instituicao", listarSolicitacoesDaInstituicaoController);

module.exports = router;