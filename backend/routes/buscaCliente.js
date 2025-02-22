const express = require("express");
const { PrismaClient } = require("@prisma/client");
const validarCpf = require("../utils/validarCpf");

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/buscar/{cpf}:
 *   get:
 *     summary: Obtém um cliente pelo CPF
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         schema:
 *           type: string
 *         required: true
 *         description: CPF do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       500:
 *         description: Erro ao buscar cliente
 */

// Buscar um cliente pelo CPF
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
          erro: "Cliente não encontrado, você pode cadastra-lo agora",
        });
    }

    res.status(200).json(cliente);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro na busca de Cliente ", detalhes: error.message });
  }
});

module.exports = router;
