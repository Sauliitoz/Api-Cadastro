const express = require("express");
const { PrismaClient } = require("@prisma/client");
const validarCpf = require("../utils/validarCpf");

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/buscar/{cpf}:
 *   get:
 *     summary: Obtém uma pessoa pelo CPF
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         schema:
 *           type: string
 *         required: true
 *         description: CPF da Pessoa
 *     responses:
 *       200:
 *         description: Pessoa encontrada
 *       500:
 *         description: Erro ao buscar pessoa
 */

// Buscar uma pessoa pelo CPF
router.get("/:cpf", async (req, res) => {
  let { cpf } = req.params;

  // Valida o CPF
  const validacao = validarCpf(cpf);
  if (!validacao.valido) {
    return res.status(400).json({ erro: validacao.erro });
  }

  try {
    const cliente = await prisma.cliente.findUnique({ where: { cpf } });

    if (!cliente) {
      return res
        .json({
          sucess: false,
          erro: "Pessoa não encontrado, você pode cadastra-lo agora",
        });
    }

    res.status(200).json(cliente);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro na busca da Pessoa ", detalhes: error.message });
  }
});

module.exports = router;
