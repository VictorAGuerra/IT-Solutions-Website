document.addEventListener('DOMContentLoaded', function () {
    const servicoSelect = document.getElementById('servico');
    const precoSpan = document.getElementById('preco');
    const prazoSpan = document.getElementById('prazo');
    const dataPrevistaSpan = document.getElementById('dataPrevista');
    const form = document.getElementById('formSolicitacao');
    const tabela = document.querySelector('#tabelaSolicitacoes tbody');
    const nomeUsuarioSpan = document.getElementById('nomeUsuario');
    const emailUsuarioSpan = document.getElementById('emailUsuario');

    const servicosConfig = {
        "formatação": { preco: 120.00, prazo: 2 },
        "instalacao": { preco: 80.00, prazo: 3 },
        "backup": { preco: 100.00, prazo: 1 },
        "rede": { preco: 150.00, prazo: 4 }
    };

    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuario) {
        nomeUsuarioSpan.textContent = usuario.nome;
        emailUsuarioSpan.textContent = usuario.email;
    }

    const listaAtual = JSON.parse(localStorage.getItem('servicos')) || [];
    listaAtual.forEach(servico => adicionarLinhaTabela(servico));

    servicoSelect.addEventListener('change', function () {
        const servico = servicosConfig[this.value];
        if (servico) {
            precoSpan.textContent = servico.preco.toFixed(2);
            prazoSpan.textContent = servico.prazo;
            const dataAtual = new Date();
            const dataPrevista = new Date(dataAtual.setDate(dataAtual.getDate() + servico.prazo));
            dataPrevistaSpan.textContent = dataPrevista.toISOString().split('T')[0];
        } else {
            precoSpan.textContent = prazoSpan.textContent = dataPrevistaSpan.textContent = '-';
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const valorSelecionado = servicoSelect.value;
        if (!valorSelecionado) return;

        const config = servicosConfig[valorSelecionado];
        const dataPedido = new Date().toISOString().split('T')[0];
        const numero = String(Date.now()); 
        const dataPrevista = dataPrevistaSpan.textContent;

        const novaSolicitacao = {
            id: numero,
            dataPedido,
            numero,
            nomeServico: servicoSelect.options[servicoSelect.selectedIndex].text,
            status: "EM ELABORAÇÃO",
            preco: config.preco.toFixed(2),
            dataPrevista
        };

        listaAtual.push(novaSolicitacao);
        localStorage.setItem('servicos', JSON.stringify(listaAtual));
        adicionarLinhaTabela(novaSolicitacao);

        form.reset();
        precoSpan.textContent = prazoSpan.textContent = dataPrevistaSpan.textContent = '-';
    });

    function adicionarLinhaTabela(servico) {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${servico.dataPedido}</td>
            <td>${servico.numero}</td>
            <td>${servico.nomeServico}</td>
            <td>${servico.status}</td>
            <td>${servico.preco}</td>
            <td>${servico.dataPrevista}</td>
            <td><button class="remover">Remover</button></td>
        `;
        
        const btnRemover = novaLinha.querySelector('.remover');
        btnRemover.addEventListener('click', function () {
            removerLinha(servico.id, novaLinha);
        });

        tabela.appendChild(novaLinha);
    }

    function removerLinha(id, linha) {
        linha.remove();

        let lista = JSON.parse(localStorage.getItem('servicos')) || [];
        lista = lista.filter(item => item.id !== id);
        localStorage.setItem('servicos', JSON.stringify(lista));
    }
});
