const express = require("express");
const router = express.Router();
const { criarAlimentoController } = require("../controllers/alimentosController.js");

router.post("/", criarAlimentoController);

module.exports = router;