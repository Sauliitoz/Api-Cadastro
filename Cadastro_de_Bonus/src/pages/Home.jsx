import { useState } from "react";
import { getPessoa, createPessoa } from "../services/Api";
import styled from "styled-components";
import {
  PessoaContainer,
  PessoaTitulo,
  PessoaInfo,
} from "../styles/PessoaStyle";
import { Form, Input } from "../styles/FormStyle";

function Home() {
  const [cpf, setCpf] = useState("");
  const [pessoa, setPessoa] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formData, setFormData] = useState({
    cpf: "",
    nome: "",
    rua: "",
    numero: "",
    bairro: "",
  });

  // Busca pessoa pelo CPF
  const handleSearch = async () => {
    try {
      const data = await getPessoa(cpf);

      if (data && data.pessoa) {
        console.log("Pessoa encontrada:", data.pessoa);
        setPessoa(data.pessoa);
        setMostrarFormulario(false);
      } else {
        console.log(
          "CPF não encontrado no banco de Dados. Cadastre uma nova Pessoa."
        );
        setPessoa(null);
        setMostrarFormulario(true);
        setFormData((prev) => ({ ...prev, cpf }));
      }
    } catch (error) {
      console.error("Erro ao buscar Pessoa:", error);
      alert("Erro ao buscar Pessoa.");
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

  // Envia os dados do novo pessoa
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando dados:", formData);

    try {
      const response = await fetch(createPessoa, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Pessoa cadastrada com sucesso!");
        setMostrarFormulario(false);
        setFormData({ cpf: "", nome: "", rua: "", numero: "", bairro: "" });
        setCpf(""); // Limpa o campo de CPF
      } else {
        alert("Erro ao cadastrar Pessoa.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar Pessoa.");
    }
  };

  return (
    <Container>
      <h2>Buscar Pessoa</h2>
      <Input
        type="text"
        placeholder="Digite o CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {pessoa && (
        <PessoaContainer>
          <PessoaTitulo>Dados da Pessoa</PessoaTitulo>
          <PessoaInfo>
            <span>Nome:</span> {pessoa.nome}
          </PessoaInfo>
          <PessoaInfo>
            <span>Rua:</span> {pessoa.rua}
          </PessoaInfo>
          <PessoaInfo>
            <span>Nº:</span> {pessoa.numero}
          </PessoaInfo>
          <PessoaInfo>
            <span>Bairro:</span> {pessoa.bairro}
          </PessoaInfo>
        </PessoaContainer>
      )}

      {mostrarFormulario && (
        <Form onSubmit={handleSubmit}>
          <h3>Cadastrar Nova Pessoa</h3>
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
