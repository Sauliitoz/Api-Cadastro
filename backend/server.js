const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require("dotenv").config();
const ROUTES = require("./config/routesConfig");

// Importando as rotas
const atualizarPessoa = require("./routes/atualizarPessoa");
const buscarPessoa = require("./routes/buscaPessoa");
const cadastrarPessoa = require("./routes/cadastrarPessoa");
const listarPessoas = require("./routes/listarPessoas");
const adicionarAssinatura = require("./routes/assinatura");

const app = express();

// Middleware para processar JSON
app.use(express.json());

// Habilitar CORS para permitir requisições de outros domínios
app.use(cors());

// Importar rotas
app.use(ROUTES.ASSINATURA, adicionarAssinatura);//POST /api/assinatura
app.use(ROUTES.BUSCAR_CLIENTE, buscarPessoa);//GET /api/buscar/{cpf}
app.use(ROUTES.CADASTRAR_CLIENTE, cadastrarPessoa);//POST /api/novo
app.use(ROUTES.LISTAR_CLIENTE, listarPessoas);//GET /api/listar
app.use(ROUTES.ATUALIZAR_PESSOA, atualizarPessoa);//PUT /api/alterar/{cpf}


//rota raiz
app.get("/", (req, res) => {
  res.send("API rodando corretamente!");
});
// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Pessoas",
      version: "1.0.0",
      description:
        "API para gerenciar pessoas usando CPF como identificador único",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./routes/*.js"], // Agora ele busca as rotas dentro da pasta "routes"
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * components:
 *   schemas:
 *     Pessoa:
 *       type: object
 *       required:
 *         - cpf
 *         - nome
 *         - rua
 *         - numero
 *         - bairro
 *       properties:
 *         cpf:
 *           type: string
 *           description: CPF da Pessoa (único)
 *         nome:
 *           type: string
 *           description: Nome da pessoa
 *         rua:
 *           type: Int
 *           description: Nome da rua
 *         numero:
 *           type: string
 *           description: Número da residência
 *         bairro:
 *           type: string
 *           description: Nome do bairro
 *       example:
 *         cpf: "12345678901"
 *         nome: "João Silva"
 *         rua: "Rua das Flores"
 *         numero: 123
 *         bairro: "Centro"
 */

// Iniciando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
