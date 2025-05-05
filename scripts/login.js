document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email');
    const senha = document.getElementById('senha');
    const mensagem = document.getElementById('mensagem');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.value.trim()) {
        mensagem.textContent = 'O campo de e-mail é obrigatório.';
        mensagem.style.color = 'red';
        email.focus();
        return;
    }

    if (!emailRegex.test(email.value)) {
        mensagem.textContent = 'Digite um e-mail válido.';
        mensagem.style.color = 'red';
        email.focus();
        return;
    }

    if (!senha.value.trim()) {
        mensagem.textContent = 'A senha deve ser preenchida.';
        mensagem.style.color = 'red';
        senha.focus();
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find(user => user.email === email.value && user.senha === senha.value);
    console.log(usuarioEncontrado);

    if (!usuarioEncontrado) {
        mensagem.textContent = 'E-mail ou senha incorretos.';
        mensagem.style.color = 'red';
        return;
    }

    mensagem.style.color = 'green';
    mensagem.textContent = 'Login realizado com sucesso!';
    localStorage.setItem("usuarioLogado", JSON.stringify({
        email: usuarioEncontrado.email,
        nome: usuarioEncontrado.nome
    }));
    window.location.href = 'home.html';
});

document.getElementById('limpar').addEventListener('click', function () {
    document.getElementById('email').value = '';
    document.getElementById('senha').value = '';
    document.getElementById('mensagem').textContent = '';
    document.getElementById('email').focus();
});
