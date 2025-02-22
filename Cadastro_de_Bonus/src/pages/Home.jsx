import { useState } from "react";
import { getClient, createClient } from "../services/Api";
import styled from "styled-components";
import {
  ClienteContainer,
  ClienteTitulo,
  ClienteInfo,
} from "../styles/ClientStyle";
import { Form, Input } from "../styles/FormStyle";

function Home() {
  const [cpf, setCpf] = useState("");
  const [cliente, setCliente] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formData, setFormData] = useState({
    cpf: "",
    nome: "",
    rua: "",
    numero: "",
    bairro: "",
  });

  // Busca cliente pelo CPF
  const handleSearch = async () => {
    try {
      const data = await getClient(cpf);

      if (data && !data.erro) {
        console.log("Cliente encontrado:", data);
        setCliente(data);
        setMostrarFormulario(false);
      } else {
        console.log(
          "CPF não encontrado no banco de Dados, Cadastre um novo cliente."
        );
        setCliente(null);
        setMostrarFormulario(true);
        setFormData((prev) => ({ ...prev, cpf }));
      }
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      alert("Erro ao buscar cliente.");
    }
  };

  // Captura mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "numero" ? Number(value) : value, // Converte apenas "numero" para número
    });
  };
  // Envia os dados do novo cliente
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando dados:", formData); // Adiciona log para verificar os dados
    try {
      const response = await fetch(createClient);

      if (response.ok) {
        alert("Cliente cadastrado com sucesso!");
        setMostrarFormulario(false);
        setFormData({ cpf: "", nome: "", rua: "", numero: "", bairro: "" }); // Limpa o formulário
        setCpf(""); // Limpa o campo de CPF
      } else {
        alert("Erro ao cadastrar cliente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar cliente.");
    }
  };

  return (
    <Container>
      <h2>Buscar Cliente</h2>
      <Input
        type="text"
        placeholder="Digite o CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {cliente && (
        <ClienteContainer>
          <ClienteTitulo>Dados do Cliente</ClienteTitulo>
          <ClienteInfo>
            <span>Nome:</span> {cliente.nome}
          </ClienteInfo>
          <ClienteInfo>
            <span>Rua:</span> {cliente.rua}
          </ClienteInfo>
          <ClienteInfo>
            <span>Nº:</span>
            {cliente.numero}
          </ClienteInfo>
          <ClienteInfo>
            <span>Bairro:</span> {cliente.bairro}
          </ClienteInfo>
        </ClienteContainer>

        //adicionar assinaturas aqui
      )}

      {mostrarFormulario && (
        <Form onSubmit={handleSubmit}>
          <h3>Cadastrar Novo Cliente</h3>
          <Input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleChange}
            readOnly
          />
          <Input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="rua"
            placeholder="Rua"
            value={formData.rua}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="numero"
            placeholder="Número"
            value={formData.numero}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="bairro"
            placeholder="Bairro"
            value={formData.bairro}
            onChange={handleChange}
          />
          <button type="submit">Enviar</button>
        </Form>
      )}
    </Container>
  );
}

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;
