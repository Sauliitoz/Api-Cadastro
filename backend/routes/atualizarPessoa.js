const express = require("express");
const { PrismaClient } = require("@prisma/client");
const validarCpf = require("../utils/validarCpf"); 

const router = express.Router();
const prisma = new PrismaClient();



router.put("/:cpf", async (req, res) => {
  let { cpf } = req.params;
  const { nome, rua, numero, bairro } = req.body;



  const validacao = validarCpf(cpf);
  if (!validacao.valido) {
    return res.status(400).json({ erro: validacao.erro });
  }
  cpf = validacao.cpf; 


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
