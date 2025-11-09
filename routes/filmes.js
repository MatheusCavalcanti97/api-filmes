const express = require("express");
const router = express.Router();
const Filme = require("../models/Filme.js");

router.post("/", async (req, res) => {
  const { titulo, ano } = req.body;

  if (!titulo || !ano) {
    return res
      .status(400)
      .json({ erro: "Campos obrigatórios: titulo, ano" });
  }

  try {
    const novoFilme = await Filme.create({ titulo, ano });
    res.status(201).json(novoFilme);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ erro: "Título já existe" });
    }
    res.status(500).json({ erro: "Erro ao salvar filme" });
  }
});

router.get("/", async (req, res) => {
  try {
    const filmes = await Filme.findAll();
    res.status(200).json(filmes);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar filmes" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const filme = await Filme.findByPk(id);

    if (!filme) {
      return res.status(404).json({ erro: "Filme não encontrado" });
    }

    await filme.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: "Erro ao remover filme" });
  }
});

module.exports = router;