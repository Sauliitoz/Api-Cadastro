function validarCpf(cpf) {
    if (!cpf) {
        return { valido: false, erro: "CPF é obrigatório." };
    }

    
    cpf = cpf.replace(/\D/g, "");

 
    if (cpf.length !== 11) {
        return { valido: false, erro: "CPF inválido. Deve conter exatamente 11 números." };
    }

    return { valido: true, cpf }; 
}

module.exports = validarCpf;