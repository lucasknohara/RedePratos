const express = require("express");
const router = express.Router();
const { criarAlimentoController, listarAlimentosController } = require("../controllers/alimentosController.js");

router.post("/", criarAlimentoController);
router.get("/", listarAlimentosController);

module.exports = router;