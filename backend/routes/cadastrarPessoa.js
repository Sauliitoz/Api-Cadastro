const express = require("express");
const { PrismaClient } = require("@prisma/client");
const validarCpf = require("../utils/validarCpf");

const router = express.Router();
const prisma = new PrismaClient();



router.post("/", async (req, res) => {
  try {
    let { cpf, nome, rua, numero, bairro } = req.body;


    const validacao = validarCpf(cpf);
    if (!validacao.valido) {
      return res.status(400).json({ erro: validacao.erro });
    }
    cpf = validacao.cpf; 
   
    const pessoaExistente = await prisma.pessoa.findUnique({
      where: { cpf },
    });

    if (pessoaExistente) {
      return res.status(400).json({ erro: "CPF já cadastrado" });
    }

  
    const novoPessoa = await prisma.pessoa.create({
      data: { cpf, nome, rua, numero, bairro },
    });

    res.status(201).json(novoPessoa);
  } catch (error) {
    res
      .status(400)
      .json({ erro: "Erro ao cadastrar Pessoa", detalhes: error.message });
  }
});

module.exports = router;
