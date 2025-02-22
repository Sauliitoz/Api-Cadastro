export const getClient = async (cpf) => {
  try {
    const response = await fetch(`http://localhost:5000/api/buscar/${cpf}`);

    if (response.status === 404) {
      // Retorna um objeto indicando que o cliente não foi encontrado, sem lançar erro
      return {
        success: false,
        erro: "Cliente não encontrado. Você pode cadastrá-lo agora.",
      };
    }

    if (!response.ok) {
      throw new Error(`Erro ao buscar cliente. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    return { success: false, erro: "Erro ao buscar cliente." };
  }
};

//função para cadastrar um novo cliente
export async function createClient(novoCliente) {
  const response = await fetch("http://localhost:5000/api/novo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novoCliente),
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar cliente");
  }

  return response.json();
}
