const express = require("express");
const cors = require("cors");
const setupSwagger = require("./docs/swagger");


require("dotenv").config();
const ROUTES = require("./config/routesConfig");

const atualizarPessoa = require("./routes/atualizarPessoa");
const buscarPessoa = require("./routes/buscaPessoa");
const cadastrarPessoa = require("./routes/cadastrarPessoa");
const listarPessoas = require("./routes/listarPessoas");
const adicionarAssinatura = require("./routes/assinatura");

const app = express();


app.use(express.json());


app.use(cors());

setupSwagger(app);

app.use(ROUTES.ASSINATURA, adicionarAssinatura); 
app.use(ROUTES.BUSCAR_CLIENTE, buscarPessoa); 
app.use(ROUTES.CADASTRAR_CLIENTE, cadastrarPessoa); 
app.use(ROUTES.LISTAR_CLIENTE, listarPessoas); 
app.use(ROUTES.ATUALIZAR_PESSOA, atualizarPessoa); 


app.get("/", (req, res) => {
  res.send("API rodando corretamente!");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
