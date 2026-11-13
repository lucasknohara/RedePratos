const express = require("express");
const router = express.Router();
const { criarSolicitacaoController, listarSolicitacoesDoDoadorController, listarSolicitacoesDaInstituicaoController, aceitarSolicitacaoController, recusarSolicitacaoController, confirmarEntregaController } = require("../controllers/solicitacoesController");

router.post("/", criarSolicitacaoController);
router.get("/doador", listarSolicitacoesDoDoadorController);
router.get("/instituicao", listarSolicitacoesDaInstituicaoController);
router.patch("/:id/aceitar", aceitarSolicitacaoController);
router.patch("/:id/recusar", recusarSolicitacaoController);
router.patch("/:id/confirmar-entrega", confirmarEntregaController);

module.exports = router;