export const getPessoa = async (cpf) => {
  try {
    const response = await fetch(`http://localhost:5000/api/buscar/${cpf}`);

    if (response.status === 404) {
      // Retorna um objeto indicando que o pessoa não foi encontrado, sem lançar erro
      return {
        success: false,
        erro: "Pessoa não encontrada. Você pode cadastrá-lo agora.",
      };
    }

    if (!response.ok) {
      throw new Error(`Erro ao buscar pessoa. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    return { success: false, erro: "Erro ao buscar pessoa." };
  }
};

//função para cadastrar um novo pessoa
export async function createPessoa(pessoa) {
  const response = await fetch("http://localhost:5000/api/novo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pessoa),
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar pessoa");
  }

  return response.json();
}

export const newAssinatura = async (cpf, data, quantidade) => {
  try {
    const response = await fetch("http://localhost:5000/api/assinatura", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pessoaCpf: cpf,
        dataAssinatura: data, // Certifique-se de formatar a data corretamente
        quantidade: quantidade,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao adicionar assinatura.");
    }

    const dataResposta = await response.json();
    alert("Assinatura adicionada com sucesso!");

    return dataResposta; // Retorna os dados da nova assinatura
  } catch (error) {
    alert(error.message);
    return null;
  }
};
