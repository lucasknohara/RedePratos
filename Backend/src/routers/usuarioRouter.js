const express = require("express");
const router = express.Router();
const { criarUsuarioController, loginUsuarioController, buscarPerfilPorIdController, atualizarPerfilController } = require("../controllers/usuarioController.js");

router.post("/cadastro", criarUsuarioController);
router.post("/login", loginUsuarioController);
router.get("/:id/perfil", buscarPerfilPorIdController);
router.put("/:id/perfil", atualizarPerfilController);

module.exports = router;