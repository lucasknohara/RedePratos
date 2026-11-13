const express = require("express");
const router = express.Router();
const { criarDoacaoController, listarDoacoesDisponiveisController } = require("../controllers/doacoesController.js");

router.post("/", criarDoacaoController);
router.get("/doador", listarDoacoesDisponiveisController);
router.get("/", listarDoacoesDisponiveisController);

module.exports = router;