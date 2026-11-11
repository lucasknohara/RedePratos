const express = require("express");
const router = express.Router();
const { criarAlimentoController, listarAlimentosController, atualizarAlimentoController, deletarAlimentoController } = require("../controllers/alimentosController.js");

router.post("/", criarAlimentoController);
router.get("/", listarAlimentosController);
router.put("/:id_alimento", atualizarAlimentoController);
router.delete("/:id_alimento", deletarAlimentoController);

module.exports = router;