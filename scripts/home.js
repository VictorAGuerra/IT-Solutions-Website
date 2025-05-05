const usuarioLogadoRaw = localStorage.getItem("usuarioLogado");

if (!usuarioLogadoRaw) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "login.html";
} else {
    const usuarioLogado = JSON.parse(usuarioLogadoRaw);
    console.log("Usuário logado:", usuarioLogado);

    const boasVindas = document.getElementById("boasVindas");
    if (boasVindas) {
        boasVindas.textContent = `Bem-vindo, ${usuarioLogado.nome}!`;
    }
}

document.getElementById("logout").addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("usuarioLogado"); 
    window.location.href = "login.html";
});

