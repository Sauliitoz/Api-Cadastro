const express = require("express");
const { PrismaClient } = require("@prisma/client");
const validarCpf = require("../utils/validarCpf");

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/novo:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: string
 *               nome:
 *                 type: string
 *               rua:
 *                 type: string
 *               numero:
 *                 type: string
 *               bairro:
 *                 type: string
 *             example:
 *               cpf: "12345678900"
 *               nome: "Carlos Silva"
 *               rua: "Avenida Brasil"
 *               numero: "456"
 *               bairro: "Jardins"
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Erro ao criar cliente (CPF já existe ou dados inválidos)
 */

router.post("/", async (req, res) => {
  try {
    let { cpf, nome, rua, numero, bairro } = req.body;

    // Valida o CPF antes de cadastrar
    const validacao = validarCpf(cpf);
    if (!validacao.valido) {
      return res.status(400).json({ erro: validacao.erro });
    }
    cpf = validacao.cpf; // Usa o CPF formatado pelo validador

    // Verifica se o CPF já está cadastrado
    const clienteExistente = await prisma.cliente.findUnique({
      where: { cpf },
    });

    if (clienteExistente) {
      return res.status(400).json({ erro: "CPF já cadastrado" });
    }

    // Cadastra novo cliente
    const novoCliente = await prisma.cliente.create({
      data: { cpf, nome, rua, numero, bairro },
    });

    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao cadastrar cliente", detalhes: error.message });
  }
});

module.exports = router;
