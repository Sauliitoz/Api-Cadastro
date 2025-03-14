const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();



router.get("/", async (req, res) => {
  try {
    const pessoa = await prisma.pessoa.findMany();
    res.json(pessoa);
  } catch (error) {
    console.error("Erro ao buscar pessoas:", error);
    res.status(500).json({ error: "Erro ao buscar pessoas" });
  }
});

module.exports = router;
