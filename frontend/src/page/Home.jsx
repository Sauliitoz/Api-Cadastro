import { useState } from "react";
import { getPessoa, createPessoa, PostAssinatura } from "../services/Api";
import styled from "styled-components";
import { apenasLetras } from "../utils/formatters";
import {
  PessoaContainer,
  PessoaTitulo,
  PessoaInfo,
  Section1,
  Section2,
  SignatureList1,
  SignatureItem1,
  NoSignatureMessage1,
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
  const [assinaturas, setAssinaturas] = useState([]);
  const [novaAssinatura, setNovaAssinatura] = useState({
    dataAssinatura: "",
    quantidade: "",
  });

  const handleSearch = async () => {
    try {
      const data = await getPessoa(cpf);

      if (data && data.pessoa) {
        console.log("Pessoa encontrada:", data.pessoa);
        setPessoa(data.pessoa);
        setAssinaturas(data.assinaturas || []);
        setMostrarFormulario(false);
      } else {
        console.log(
          "CPF não encontrado no banco de Dados. Cadastre uma nova Pessoa."
        );
        setPessoa(null);
        setAssinaturas([]);
        setMostrarFormulario(true);
        setFormData((prev) => ({ ...prev, cpf }));
      }
    } catch (error) {
      console.error("Erro ao buscar Pessoa:", error);
      alert("Erro ao buscar Pessoa.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const onlyLetters = ["nome", "rua", "bairro"].includes(name)
      ? apenasLetras(value)
      : value;

    setFormData({
      ...formData,
      [name]: name === "numero" ? Number(onlyLetters) : onlyLetters,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando dados:", formData);

    try {
      await createPessoa(formData);
      alert("Pessoa cadastrada com sucesso!");

      setMostrarFormulario(false);
      setFormData({ cpf: "", nome: "", rua: "", numero: "", bairro: "" });
      setCpf("");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar Pessoa.");
    }
  };

  const handleAddAssinatura = async (e) => {
    e.preventDefault();
    if (
      !pessoa ||
      !novaAssinatura.dataAssinatura ||
      !novaAssinatura.quantidade
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    const nova = await PostAssinatura(
      pessoa.cpf,
      novaAssinatura.dataAssinatura,
      Number(novaAssinatura.quantidade)
    );

    if (nova) {
      setAssinaturas((prev) => [...prev, nova]); 
      setNovaAssinatura({ dataAssinatura: "", quantidade: "" }); 
    }
  };

  return (
    <Container>
      <h2>Buscar Pessoa</h2>
      <Input
        type="text"
        placeholder="Digite o CPF"
        maxLength={11}
        value={cpf}
        onChange={(e) => setCpf(e.target.value.replace(/\D/g, ""))}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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

          <Section1>
            <PessoaTitulo>Assinaturas</PessoaTitulo>
            {assinaturas.length > 0 ? (
              <SignatureList1>
                {assinaturas.map((assinatura, index) => (
                  <SignatureItem1 key={index}>
                    <strong>Data:</strong>{" "}
                    {new Date(assinatura.dataAssinatura).toLocaleDateString()} -
                    <strong> Quantidade:</strong> {assinatura.quantidade}
                  </SignatureItem1>
                ))}
              </SignatureList1>
            ) : (
              <NoSignatureMessage1>
                Não há assinaturas registradas.
              </NoSignatureMessage1>
            )}
          </Section1>

          <Section2>
            <Form onSubmit={handleAddAssinatura}>
              <h3>Adicionar Nova Assinatura</h3>
              <Input
                type="date"
                name="dataAssinatura"
                value={novaAssinatura.dataAssinatura}
                onChange={(e) =>
                  setNovaAssinatura({
                    ...novaAssinatura,
                    dataAssinatura: e.target.value,
                  })
                }
              />
              <Input
                type="number"
                name="quantidade"
                placeholder="Quantidade"
                value={novaAssinatura.quantidade}
                onChange={(e) =>
                  setNovaAssinatura({
                    ...novaAssinatura,
                    quantidade: e.target.value,
                  })
                }
              />
              <button type="submit">Adicionar Assinatura</button>
            </Form>
          </Section2>
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
