document.getElementById("cadastroForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const nascimento = document.getElementById("nascimento").value;
    const telefone = document.getElementById("telefone").value.trim();
    const estadoCivil = document.querySelector('input[name="estadoCivil"]:checked').value;
    const escolaridade = document.getElementById("escolaridade").value;

    const regexSenha = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&*!?\/\\|\-_\+=.]).{6,}$/;
    const caracteresInvalidosSenha = /[¨{}\[\]´`~^:;,“‘<>]/;
    const caracteresInvalidosNome = /[¨{}\[\]´`~^:;,“‘<>@#$%&*!?\/\\|\-_\+=.0-9]/;

    if (!nome || nome.split(" ").length < 2 || nome.split(" ")[0].length < 2 || caracteresInvalidosNome.test(nome)) {
        alert("Nome inválido. Deve ter pelo menos duas palavras, a primeira com pelo menos 2 letras e sem caracteres especiais.");
        return;
    }

    if (!cpf || !validarCPF(cpf)) {
        alert("CPF inválido.");
        return;
    }

    if (!nascimento || !maiorDeIdade(nascimento)) {
        alert("É necessário ser maior de 18 anos.");
        return;
    }

    if (!regexSenha.test(senha) || caracteresInvalidosSenha.test(senha)) {
        alert("Senha inválida. Verifique os critérios descritos.");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const jaExiste = usuarios.some(usuario => usuario.email === email);
    if (jaExiste) {
        alert("Este e-mail já está cadastrado.");
        return;
    }

    const novoUsuario = {
        email,
        senha,
        nome,
        cpf,
        nascimento,
        telefone,
        estadoCivil,
        escolaridade
    };

    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
});

document.getElementById("limparBtn").addEventListener("click", function () {
    document.getElementById("cadastroForm").reset();
    document.getElementById("email").focus();
});

function maiorDeIdade(dataNasc) {
    const hoje = new Date();
    const nascimento = new Date(dataNasc);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    return idade > 18 || (idade === 18 && m >= 0 && hoje.getDate() >= nascimento.getDate());
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0, resto;

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;    
    return resto === parseInt(cpf[10]);
}
