const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// Importando as rotas
const atualizarCliente = require("./routes/atualizarCliente");
const buscarCliente = require("./routes/buscaCliente");
const cadastrarCliente = require("./routes/cadastrarCliente");
const listarCliente = require("./routes/listarCliente");

const app = express();
const PORT = 5000;

// Middleware para processar JSON
app.use(express.json());

// Habilitar CORS para permitir requisições de outros domínios
app.use(cors());

// Importar rotas
app.use("/api/alterar", atualizarCliente); //PUT /api/alterar/{cpf}
app.use("/api/buscar", buscarCliente); //GET /api/buscar/{cpf}
app.use("/api/novo", cadastrarCliente);//POST /api/novo
app.use("/api/listar", listarCliente); //GET /api/listar

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Clientes",
      version: "1.0.0",
      description: "API para gerenciar clientes usando CPF como identificador único",
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
 *     Cliente:
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
 *           description: CPF do cliente (único)
 *         nome:
 *           type: string
 *           description: Nome do cliente
 *         rua:
 *           type: string
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
 *         numero: "123"
 *         bairro: "Centro"
 */

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
