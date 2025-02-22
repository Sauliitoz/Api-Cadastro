const express = require("express");
const { PrismaClient } = require("@prisma/client");
const validarCpf = require("../utils/validarCpf"); // Ajuste o caminho conforme necessário

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/alterar/{cpf}:
 *   put:
 *     summary: Atualiza os dados de um cliente pelo CPF
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         schema:
 *           type: string
 *         required: true
 *         description: CPF do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               rua:
 *                 type: string
 *               numero:
 *                 type: string
 *               bairro:
 *                 type: string
 *             example:
 *               nome: "Carlos Silva"
 *               rua: "Avenida Brasil"
 *               numero: "456"
 *               bairro: "Jardins"
 *     responses:
 *       200:
 *         description: Dados atualizados com sucesso
 *       404:
 *         description: Cliente não encontrado
 */

// Atualizar um cliente pelo CPF
router.put("/:cpf", async (req, res) => {
  let { cpf } = req.params;
  const { nome, rua, numero, bairro } = req.body;


  // Valida o CPF antes de continuar
  const validacao = validarCpf(cpf);
  if (!validacao.valido) {
    return res.status(400).json({ erro: validacao.erro });
  }
  cpf = validacao.cpf; // Usa o CPF formatado pelo validador


  try {
    const clienteExistente = await prisma.cliente.findUnique({ where: { cpf } });

    if (!clienteExistente) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    const clienteAtualizado = await prisma.cliente.update({
      where: { cpf },
      data: { nome, rua, numero, bairro },
    });

    res.json({ mensagem: "Dados atualizados com sucesso", cliente: clienteAtualizado });
  } catch (error) {
    res.status(400).json({ erro: "Erro ao atualizar os dados", detalhes: error.message });
  }
});

module.exports = router;
