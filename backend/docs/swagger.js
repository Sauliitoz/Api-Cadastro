const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
    tags: [
      { name: "Pessoas", description: "Endpoints para gerenciar Pessoas" },
      {
        name: "Assinaturas",
        description: "Endpoints para gerenciar Assinaturas",
      },
    ],
  },
  apis: ["./docs/*.yaml"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log("Swagger disponível em http://localhost:5000/api-docs");
}

module.exports = setupSwagger;


