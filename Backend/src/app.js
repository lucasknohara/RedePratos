const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler.js");
const usuarioRoutes = require("./routers/usuarioRouter.js");
const alimentosRoutes = require("./routers/alimentosRouter.js");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/alimentos", alimentosRoutes);

app.get("/api/teste", (req, res) => {
    return res.status(200).json({
        message: "API rodando!"
    })
});

app.use(errorHandler);

module.exports = app