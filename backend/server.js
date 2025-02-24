const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require("dotenv").config();

// Importando as rotas
const atualizarCliente = require("./routes/atualizarCliente");
const buscarCliente = require("./routes/buscaCliente");
const cadastrarCliente = require("./routes/cadastrarCliente");
const listarCliente = require("./routes/listarCliente");

const app = express();

// Middleware para processar JSON
app.use(express.json());

// Habilitar CORS para permitir requisições de outros domínios
app.use(cors());

// Importar rotas
app.use("/api/alterar", atualizarCliente); //PUT /api/alterar/{cpf}
app.use("/api/buscar", buscarCliente); //GET /api/buscar/{cpf}
app.use("/api/novo", cadastrarCliente); //POST /api/novo
app.use("/api/listar", listarCliente); //GET /api/listar

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
