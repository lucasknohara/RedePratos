const express = require("express");
const router = express.Router();
const { criarUsuarioController, loginUsuarioController } = require("../controllers/usuarioController.js");

router.post("/cadastro", criarUsuarioController);
router.post("/login", loginUsuarioController);

module.exports = router;