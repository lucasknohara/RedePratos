const express = require("express");
const router = express.Router();
const { criarSolicitacaoController, listarSolicitacoesDoDoadorController, listarSolicitacoesDaInstituicaoController, aceitarSolicitacaoController, recusarSolicitacaoController } = require("../controllers/solicitacoesController");

router.post("/", criarSolicitacaoController);
router.get("/doador", listarSolicitacoesDoDoadorController);
router.get("/instituicao", listarSolicitacoesDaInstituicaoController);
router.patch("/:id/aceitar", aceitarSolicitacaoController);
router.patch("/:id/recusar", recusarSolicitacaoController);

module.exports = router;