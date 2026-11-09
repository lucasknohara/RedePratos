const express = require("express");
const router = express.Router();
const { criarUsuarioController } = require("../controllers/usuarioController.js");

router.post("/cadastro", criarUsuarioController);

module.exports = router;