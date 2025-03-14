const express = require("express");
const { PrismaClient } = require("@prisma/client");
const validarCpf = require("../utils/validarCpf");

const router = express.Router();
const prisma = new PrismaClient();




router.get("/:cpf", async (req, res) => {
  let { cpf } = req.params;


  const validacao = validarCpf(cpf);
  if (!validacao.valido) {
    return res.status(400).json({ erro: validacao.erro });
  }

  try {
    const pessoa = await prisma.pessoa.findUnique({ where: { cpf } });

    if (!pessoa) {
      return res.status(404).json({
        sucess: false,
        erro: "Pessoa não encontrado, você pode cadastra-lo agora",
      });
    }
    const assinaturas = await prisma.assinatura.findMany({
      where: { pessoaCpf: cpf },
      orderBy: { dataAssinatura: "desc" },
    });

    res.status(200).json({ pessoa, assinaturas });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro na busca da Pessoa ", detalhes: error.message });
  }
});

module.exports = router;
