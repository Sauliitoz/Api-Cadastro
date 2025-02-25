const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/listar:
 *   get:
 *     summary: Lista todos as Pessoas cadastradas
 *     tags: [Pessoas]
 *     responses:
 *       200:
 *         description: Lista de Pessoas retornada com sucesso
 *       500:
 *         description: Erro ao buscar pessoas
 */

// Mostrar todos os Pessoas no banco de dados
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
