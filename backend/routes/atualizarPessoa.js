const express = require("express");
const { PrismaClient } = require("@prisma/client");
const validarCpf = require("../utils/validarCpf"); 

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/alterar/{cpf}:
 *   put:
 *     summary: Atualiza os dados de uma pessoa pelo CPF
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         schema:
 *           type: string
 *         required: true
 *         description: CPF da pessoa
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
 *                 type: int
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
 *         description: Pessoa não encontrada
 */

// Atualizar uma pessoa pelo CPF
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
    const pessoaExistente = await prisma.pessoa.findUnique({ where: { cpf } });

    if (!pessoaExistente) {
      return res.status(404).json({ erro: "Pessoa não encontrada" });
    }

    const pessoaAtualizado = await prisma.pessoa.update({
      where: { cpf },
      data: { nome, rua, numero, bairro },
    });

    res.json({ mensagem: "Dados atualizados com sucesso", pessoa: pessoaAtualizado });
  } catch (error) {
    res.status(400).json({ erro: "Erro ao atualizar os dados", detalhes: error.message });
  }
});

module.exports = router;
