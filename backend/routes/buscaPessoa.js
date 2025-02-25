const express = require("express");
const { PrismaClient } = require("@prisma/client");
const validarCpf = require("../utils/validarCpf");

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/buscar/{cpf}:
 *   get:
 *     summary: Busca um pessoa pelo CPF e suas assinaturas
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *         description: CPF do pessoa
 *     responses:
 *       200:
 *         description: pessoa encontrado, incluindo suas assinaturas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pessoa:
 *                   $ref: '#/components/schemas/Pessoa'
 *                 assinaturas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       pessoaCpf:
 *                         type: string
 *                       dataAssinatura:
 *                         type: string
 *                         format: date
 *                       quantidade:
 *                         type: integer
 *       404:
 *         description: pessoa não encontrado
 *       500:
 *         description: Erro ao buscar dados
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
    console.log("Buscando pessoa com CPF:", cpf);
    const pessoa = await prisma.pessoa.findUnique({ where: { cpf } });

    if (!pessoa) {
      return res.status(404).json({
        sucess: false,
        erro: "Pessoa não encontrado, você pode cadastra-lo agora",
      });
    }
    const assinaturas = await prisma.assinatura.findMany({
      where: { pessoaCpf: cpf },
      orderBy: { dataAssinatura: "desc" }, // Ordenar por data
    });

    res.status(200).json({ pessoa, assinaturas });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro na busca da Pessoa ", detalhes: error.message });
  }
});

module.exports = router;
