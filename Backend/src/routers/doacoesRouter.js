const express = require("express");
const router = express.Router();
const { criarDoacaoController } = require("../controllers/doacoesController.js");

router.post("/", criarDoacaoController);

module.exports = router;