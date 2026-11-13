const express = require("express");
const router = express.Router();
const { criarDoacaoController, listarDoacoesDisponiveisController, listarDoacoesDoDoadorController } = require("../controllers/doacoesController.js");

router.post("/", criarDoacaoController);
router.get("/", listarDoacoesDisponiveisController);
router.get("/doador", listarDoacoesDoDoadorController);

module.exports = router;