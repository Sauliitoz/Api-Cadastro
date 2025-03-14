const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { pessoaCpf, dataAssinatura, quantidade } = req.body;


    const pessoaExiste = await prisma.pessoa.findUnique({
      where: { cpf: pessoaCpf },
    });

    if (!pessoaExiste) {
      return res.status(400).json({ erro: "Pessoa não cadastrada" });
    }


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



router.get("/:cpf", async (req, res) => {
  try {
  

    const { cpf } = req.params;

    if (!cpf) {
      return res.status(400).json({ erro: "CPF é obrigatório" });
    }

    const assinaturas = await prisma.assinatura.findMany({
      where: { pessoaCpf: cpf },
      orderBy: { dataAssinatura: "desc" }, 
    });

    res.status(200).json(assinaturas);
  } catch (error) {
    console.error("Erro ao buscar assinaturas:", error);
    res.status(500).json({ erro: "Erro ao buscar assinaturas." });
  }
});

module.exports = router;
