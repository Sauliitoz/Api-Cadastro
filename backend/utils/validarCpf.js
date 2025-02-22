function validarCpf(cpf) {
    if (!cpf) {
        return { valido: false, erro: "CPF é obrigatório." };
    }

    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, "");

    // Verifica se tem exatamente 11 dígitos
    if (cpf.length !== 11) {
        return { valido: false, erro: "CPF inválido. Deve conter exatamente 11 números." };
    }

    return { valido: true, cpf }; // Retorna CPF como string
}

module.exports = validarCpf;
