document.getElementById("trocarSenhaForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const novaSenha = document.getElementById("novaSenha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const mensagem = document.getElementById("mensagem");

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const senhaValida = validarSenha(novaSenha);

    if (!emailValido) {
        mensagem.textContent = "Informe um e-mail válido.";
        mensagem.style.color = "red";
        return;
    }

    if (!senhaValida) {
        mensagem.textContent = "A nova senha deve ter pelo menos 6 caracteres, uma letra maiúscula, um número e um caractere especial.";
        mensagem.style.color = "red";
        return;
    }

    if (novaSenha !== confirmarSenha) {
        mensagem.textContent = "As senhas não coincidem.";
        mensagem.style.color = "red";
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioIndex = usuarios.findIndex(u => u.email === email);

    if (usuarioIndex === -1) {
        mensagem.textContent = "E-mail não encontrado. Verifique e tente novamente.";
        mensagem.style.color = "red";
        return;
    }

    usuarios[usuarioIndex].senha = novaSenha;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensagem.textContent = "Senha alterada com sucesso!";
    mensagem.style.color = "green";
    setTimeout(() => window.location.href = "login.html", 1500);
});

function validarSenha(senha) {
    const temMinimo = senha.length >= 6;
    const temMaiuscula = /[A-Z]/.test(senha);
    const temNumero = /\d/.test(senha);
    const temEspecial = /[@#$%&*!?\/\\|\-_\+=.]/.test(senha);
    const temNaoPermitido = /[¨{}\[\]´`~^:;<>,“‘]/.test(senha);
    return temMinimo && temMaiuscula && temNumero && temEspecial && !temNaoPermitido;
}

document.getElementById("limpar").addEventListener("click", function () {
    document.getElementById("email").value = "";
    document.getElementById("novaSenha").value = "";
    document.getElementById("confirmarSenha").value = "";
    document.getElementById("mensagem").textContent = "";
    document.getElementById("email").focus();
});
