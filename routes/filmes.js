const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/filmes.json");

router.post("/", (req, res) => {
  const novoFilme = req.body;

  if (!novoFilme.id || !novoFilme.titulo || !novoFilme.ano) {
    return res
      .status(400)
      .json({ erro: "Campos obrigatórios: id, titulo, ano" });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }

  const filmes = JSON.parse(fs.readFileSync(filePath));
  filmes.push(novoFilme);
  fs.writeFileSync(filePath, JSON.stringify(filmes, null, 2));

  res.status(201).json(novoFilme);
});

module.exports = router;
