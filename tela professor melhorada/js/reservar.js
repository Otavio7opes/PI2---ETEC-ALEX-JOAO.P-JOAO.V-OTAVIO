document.addEventListener('DOMContentLoaded', () => {
    carregarKitsNoSelect();
});

// Função para preencher o Dropdown com os Kits criados
function carregarKitsNoSelect() {
    const selectKit = document.getElementById('kitReserva');
    const kitsSalvos = JSON.parse(localStorage.getItem('kitsLaboratorio')) || [];

    if (kitsSalvos.length > 0) {
        kitsSalvos.forEach(kit => {
            const option = document.createElement('option');
            option.value = kit.nome; // Salvamos o nome do kit
            option.textContent = kit.nome; // O que aparece pro usuário
            selectKit.appendChild(option);
        });
    }
}

document.getElementById('formReserva').addEventListener('submit', function(e) {
    e.preventDefault();

    // Coletar dados
    const laboratorio = document.getElementById('laboratorio').value;
    const data = document.getElementById('dataReserva').value;
    const horaInicio = document.getElementById('horaInicio').value;
    const horaFim = document.getElementById('horaFim').value;
    const kitEscolhido = document.getElementById('kitReserva').value;
    const tema = document.getElementById('temaAula').value;

    // Validações
    if (!laboratorio || !data || !horaInicio || !horaFim || !tema) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Validar se hora final é maior que inicial
    if (horaInicio >= horaFim) {
        alert("O horário de término deve ser depois do horário de início.");
        return;
    }

    // Validar data passada
    const dataSelecionada = new Date(data);
    const hoje = new Date();
    hoje.setHours(0,0,0,0);
    // Ajuste de fuso para comparação correta
    const dataAjustada = new Date(dataSelecionada.getUTCFullYear(), dataSelecionada.getUTCMonth(), dataSelecionada.getUTCDate());

    if (dataAjustada < hoje) {
        alert("Não é possível reservar para datas passadas!");
        return;
    }

    // Cria objeto da reserva
    const novaReserva = {
        id: Date.now(),
        laboratorio: laboratorio,
        data: data,
        horario: `${horaInicio} às ${horaFim}`, // Formata o horário para exibição
        kit: kitEscolhido,
        tema: tema,
        status: 'Confirmado'
    };

    // Salvar no LocalStorage
    const reservasSalvas = JSON.parse(localStorage.getItem('reservasLaboratorio')) || [];
    
    // Verificação básica de conflito (opcional, mas recomendada)
    const conflito = reservasSalvas.find(r => 
        r.laboratorio === laboratorio && 
        r.data === data && 
        // Lógica simples: Se começar exatamente no mesmo horário
        r.horario.startsWith(horaInicio)
    );

    if (conflito) {
        alert("Atenção: Já existe uma reserva começando neste horário para este laboratório.");
        // Aqui você decide se bloqueia ou só avisa. Vou deixar passar por enquanto.
    }

    reservasSalvas.push(novaReserva);
    localStorage.setItem('reservasLaboratorio', JSON.stringify(reservasSalvas));

    alert("Reserva realizada com sucesso!");
    // Opcional: Limpar formulário
    e.target.reset();
});