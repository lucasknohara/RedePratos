const express = require("express");
const cors = require("cors");
const usuarioRoutes = require("../src/routers/usuarioRouter.js");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);

app.get("/api/teste", (req, res) => {
    return res.status(200).json({
        menssage: "API rodando!"
    })
});

module.exports = app