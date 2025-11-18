// Array temporário para guardar itens ENQUANTO criamos o kit
let itensDoKitAtual = [];

// --- LÓGICA DA PÁGINA DE CRIAR KITS ---
const nomeKitInput = document.getElementById('nomeKit');
const tipoItemInput = document.getElementById('tipoItem');
const nomeItemInput = document.getElementById('nomeItem');
const qtdItemInput = document.getElementById('quantidadeItem');
const listaTempElement = document.getElementById('listaItensTemporarios');
const btnAdicionar = document.getElementById('btnAdicionarItem');
const btnSalvar = document.getElementById('btnSalvarKit');

// Verifica se estamos na página de Criar (se o botão existir)
if (btnAdicionar) {
    
    // Função para adicionar item na lista temporária
    btnAdicionar.addEventListener('click', () => {
        const tipo = tipoItemInput.value;
        const nome = nomeItemInput.value;
        const qtd = qtdItemInput.value;

        if (nome === '' || qtd === '' || tipo === '') {
            alert("Preencha todos os campos do item!");
            return;
        }

        const item = {
            id: Date.now(), // ID único para o item
            tipo: tipo,
            nome: nome,
            qtd: qtd
        };

        itensDoKitAtual.push(item);
        atualizarListaVisual();
        
        // Limpar campos de item
        nomeItemInput.value = '';
        qtdItemInput.value = '';
        nomeItemInput.focus();
    });

    // Atualiza o HTML da lista de itens temporários
    function atualizarListaVisual() {
        listaTempElement.innerHTML = '';
        
        itensDoKitAtual.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'item-lista';
            li.innerHTML = `
                <span><strong>${item.qtd}x</strong> ${item.nome} (${item.tipo})</span>
                <button class="btn-remover-item" onclick="removerItemTemp(${index})">X</button>
            `;
            listaTempElement.appendChild(li);
        });
    }

    // Remove item da lista temporária
    window.removerItemTemp = (index) => {
        itensDoKitAtual.splice(index, 1);
        atualizarListaVisual();
    }

    // Salvar o Kit Completo no LocalStorage
    btnSalvar.addEventListener('click', () => {
        const nomeKit = nomeKitInput.value;

        if (nomeKit.trim() === '') {
            alert("Dê um nome para o Kit!");
            return;
        }

        if (itensDoKitAtual.length === 0) {
            alert("Adicione pelo menos um item ao kit.");
            return;
        }

        // Cria o objeto do Kit
        const novoKit = {
            id: Date.now(),
            nome: nomeKit,
            itens: itensDoKitAtual
        };

        // Pega os kits que já existem ou cria array vazio
        const kitsSalvos = JSON.parse(localStorage.getItem('kitsLaboratorio')) || [];
        kitsSalvos.push(novoKit);

        // Salva
        localStorage.setItem('kitsLaboratorio', JSON.stringify(kitsSalvos));

        alert("Kit salvo com sucesso!");
        window.location.href = 'telaKits.html'; // Redireciona para a lista
    });
}

// --- LÓGICA DA PÁGINA DE LISTAR KITS (telaKits.html) ---
const containerKits = document.getElementById('containerListaKits');

if (containerKits) {
    
    function carregarKits() {
        const kitsSalvos = JSON.parse(localStorage.getItem('kitsLaboratorio')) || [];
        containerKits.innerHTML = '';

        if (kitsSalvos.length === 0) {
            containerKits.innerHTML = '<p style="text-align:center; width:100%">Nenhum kit criado ainda.</p>';
            return;
        }

        kitsSalvos.forEach(kit => {
            // Cria o HTML de cada Card
            const card = document.createElement('div');
            card.className = 'kit-card';

            // Monta a lista de itens dentro do card
            let listaItensHTML = '';
            kit.itens.forEach(item => {
                listaItensHTML += `<li>• ${item.qtd}x ${item.nome}</li>`;
            });

            card.innerHTML = `
                <h3 class="kit-titulo">${kit.nome}</h3>
                <ul class="kit-itens-lista">
                    ${listaItensHTML}
                </ul>
                <button class="btn-excluir-kit" onclick="deletarKit(${kit.id})">Excluir Kit</button>
            `;

            containerKits.appendChild(card);
        });
    }

    window.deletarKit = (id) => {
        if(confirm("Tem certeza que deseja excluir este kit?")) {
            let kitsSalvos = JSON.parse(localStorage.getItem('kitsLaboratorio')) || [];
            // Filtra mantendo apenas os kits que NÃO têm esse ID
            kitsSalvos = kitsSalvos.filter(kit => kit.id !== id);
            localStorage.setItem('kitsLaboratorio', JSON.stringify(kitsSalvos));
            carregarKits(); // Recarrega a tela
        }
    }

    // Inicializa a lista ao abrir a página
    carregarKits();
}