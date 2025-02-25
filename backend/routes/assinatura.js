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
 *     summary: Adiciona uma nova assinatura para uma pessoa
 *     tags: [Assinaturas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pessoaCpf
 *               - dataAssinatura
 *               - quantidade
 *             properties:
 *               pessoaCpf:
 *                 type: string
 *                 description: CPF da pessoa vinculada à assinatura
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
 *       400:
 *         description: CPF não cadastrado ou dados inválidos
 *       500:
 *         description: Erro interno ao adicionar assinatura
 */

router.post("/", async (req, res) => {
  try {
    const { pessoaCpf, dataAssinatura, quantidade } = req.body;

    // Verifica se a pessoa existe no banco de dados
    const pessoaExiste = await prisma.pessoa.findUnique({
      where: { cpf: pessoaCpf },
    });

    if (!pessoaExiste) {
      return res.status(400).json({ erro: "Pessoa não cadastrada" });
    }

    // Criando assinatura associada à pessoa
    const novaAssinatura = await prisma.assinatura.create({
      data: {
        pessoaCpf,
        dataAssinatura: new Date(dataAssinatura),
        quantidade,
      },
    });

    res.status(201).json(novaAssinatura);
  } catch (error) {
    console.error("Erro ao adicionar assinatura:", error);
    res.status(500).json({ erro: "Erro ao adicionar assinatura" });
  }
});

/**
 * @swagger
 * /api/assinatura/{cpf}:
 *   get:
 *     summary: Lista todas as assinaturas de uma pessoa pelo CPF
 *     tags: [Assinaturas]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *         description: CPF da pessoa para buscar as assinaturas
 *     responses:
 *       200:
 *         description: Lista de assinaturas da pessoa
 *       404:
 *         description: Nenhuma assinatura encontrada
 *       500:
 *         description: Erro ao buscar assinaturas
 */

// GET - Lista todas as assinaturas de um CPF
// GET - Lista todas as assinaturas de um CPF
router.get("/:cpf", async (req, res) => {
  try {
    console.log("Dados recebidos:", req.params); // Debug

    const { cpf } = req.params;

    if (!cpf) {
      return res.status(400).json({ erro: "CPF é obrigatório" });
    }

    // Busca todas as assinaturas do CPF fornecido
    const assinaturas = await prisma.assinatura.findMany({
      where: { pessoaCpf: cpf },
      orderBy: { dataAssinatura: "desc" }, // Ordena pela data (mais recente primeiro)
    });

    res.status(200).json(assinaturas);
  } catch (error) {
    console.error("Erro ao buscar assinaturas:", error);
    res.status(500).json({ erro: "Erro ao buscar assinaturas." });
  }
});

module.exports = router;
