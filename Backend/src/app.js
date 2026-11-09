const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/teste", (req, res) => {
    return res.status(200).json({
        menssage: "API rodando!"
    })
});

module.exports = app