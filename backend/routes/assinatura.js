const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Assinaturas
 *   description: Endpoints para gerenciar assinaturas
 */

/**
 * @swagger
 * /api/assinatura:
 *   post:
 *     summary: Adiciona uma nova assinatura para um cliente
 *     tags: [Assinaturas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clienteCpf
 *               - dataAssinatura
 *               - quantidade
 *             properties:
 *               clienteCpf:
 *                 type: string
 *                 description: CPF do cliente vinculado à assinatura
 *               dataAssinatura:
 *                 type: string
 *                 format: date
 *                 description: Data da assinatura no formato YYYY-MM-DD
 *               quantidade:
 *                 type: integer
 *                 description: Quantidade de itens na assinatura
 *     responses:
 *       201:
 *         description: Assinatura criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID da assinatura criada
 *                 clienteCpf:
 *                   type: string
 *                   description: CPF do cliente
 *                 dataAssinatura:
 *                   type: string
 *                   format: date
 *                   description: Data da assinatura
 *                 quantidade:
 *                   type: integer
 *                   description: Quantidade de itens
 *       400:
 *         description: Erro de validação dos campos
 *       500:
 *         description: Erro interno ao adicionar assinatura
 */


router.post("/", async (req, res) => {
  const { clienteCpf, dataAssinatura, quantidade } = req.body;

  if (!clienteCpf || !dataAssinatura || !quantidade) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  if (quantidade <= 0) {
    return res
      .status(400)
      .json({ error: "A quantidade deve ser maior que zero." });
  }


  try {
    // Insere a assinatura no banco
    const novaAssinatura = await prisma.assinatura.create({
      data: {
        clienteCpf,
        dataAssinatura: new Date(dataAssinatura), // Converte para Date
        quantidade: parseInt(quantidade),
      },
    });

    res.status(201).json(novaAssinatura);
  } catch (error) {
    console.error("Erro ao adicionar assinatura:", error);
    res.status(500).json({ error: "Erro ao adicionar assinatura." });
  }
});




/**
 * @swagger
 * /api/assinatura/{cpf}:
 *   get:
 *     summary: Lista todas as assinaturas de um cliente pelo CPF
 *     tags: [Assinaturas]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *         description: CPF do cliente para buscar as assinaturas
 *     responses:
 *       200:
 *         description: Lista de assinaturas do cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID da assinatura
 *                   clienteCpf:
 *                     type: string
 *                     description: CPF do cliente
 *                   dataAssinatura:
 *                     type: string
 *                     format: date
 *                     description: Data da assinatura
 *                   quantidade:
 *                     type: integer
 *                     description: Quantidade de itens na assinatura
 *       500:
 *         description: Erro ao buscar assinaturas
 */

// GET - Lista todas as assinaturas de um CPF
router.get("/:cpf", async (req, res) => {
  const { cpf } = req.params;

  try {
    // Busca todas as assinaturas do CPF fornecido
    const assinaturas = await prisma.assinatura.findMany({
      where: { clienteCpf: cpf },
      orderBy: { dataAssinatura: "desc" }, // Ordena pela data (mais recente primeiro)
    });

    res.status(200).json(assinaturas);
  } catch (error) {
    console.error("Erro ao buscar assinaturas:", error);
    res.status(500).json({ error: "Erro ao buscar assinaturas." });
  }
});

module.exports = router;
