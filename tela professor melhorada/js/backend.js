const MonthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Elementos do Modal
const eventModal = document.getElementById('eventModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const eventTitleInput = document.getElementById('eventTitle');
const eventTimeInput = document.getElementById('eventTime');
const eventDescInput = document.getElementById('eventDesc');
const saveEventBtn = document.getElementById('saveEventBtn');
const deleteEventBtn = document.getElementById('deleteEventBtn');
const modalDateDisplay = document.getElementById('modalDateDisplay');

let currentDate = new Date();
let selectedDateKey = null; // Variável para saber qual dia está sendo editado

// Carrega eventos do localStorage
let events = JSON.parse(localStorage.getItem('calendarEvents')) || {};

const saveEventsToStorage = () => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
}

// Lógica de Férias (Julho, 25/Dez a 25/Jan)
const checkFerias = (day, month) => {
    if (month === 6) return true; // Julho
    if (month === 11 && day >= 25) return true; // Fim de Dezembro
    if (month === 0 && day <= 25) return true; // Início de Janeiro
    return false;
};

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDayOfMonth.getDate();
    const firstDayIndex = firstDayOfMonth.getDay();
    const lastDayIndex = lastDayOfMonth.getDay();

    const monthYearString = currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
    MonthYearElement.textContent = monthYearString.charAt(0).toUpperCase() + monthYearString.slice(1);

    let DatesHTML = '';

    // Dias do mês anterior
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = firstDayIndex; i > 0; i--) {
        DatesHTML += `<div class="date inactive">${prevMonthLastDay - i + 1}</div>`;
    }

    // Dias atuais
    for (let i = 1; i <= totalDays; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const isToday = date.toDateString() === new Date().toDateString();
        const isFerias = checkFerias(i, currentMonth);
        const eventKey = `${currentYear}-${currentMonth}-${i}`;
        
        let classes = 'date';
        if (isToday) classes += ' active';
        if (isFerias) classes += ' ferias';

        // Se tiver evento, adiciona a bolinha amarela
        const hasEvent = events[eventKey] ? `<div class="event-marker"></div>` : '';

        DatesHTML += `<div class="${classes}" onclick="openEventModal(${i})">${i}${hasEvent}</div>`;
    }

    // Dias do próximo mês
    for (let i = 1; i <= 6 - lastDayIndex; i++) {
        DatesHTML += `<div class="date inactive">${i}</div>`;
    }

    datesElement.innerHTML = DatesHTML;
}

// --- FUNÇÕES DO MODAL ---

// Abrir o Modal ao clicar no dia
window.openEventModal = (day) => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    selectedDateKey = `${currentYear}-${currentMonth}-${day}`;
    
    // Atualiza o título do modal com a data
    modalDateDisplay.textContent = `Evento: ${day}/${currentMonth + 1}/${currentYear}`;

    // Verifica se já existe dados para esse dia
    const eventData = events[selectedDateKey];

    if (eventData) {
        // Preenche os campos se o evento existir
        eventTitleInput.value = eventData.title || '';
        eventTimeInput.value = eventData.time || '';
        eventDescInput.value = eventData.desc || '';
        deleteEventBtn.style.display = 'block'; // Mostra botão de excluir
    } else {
        // Limpa os campos se for novo
        eventTitleInput.value = '';
        eventTimeInput.value = '';
        eventDescInput.value = '';
        deleteEventBtn.style.display = 'none'; // Esconde botão de excluir
    }

    eventModal.classList.remove('hidden');
}

// Fechar Modal
const closeEventModal = () => {
    eventModal.classList.add('hidden');
    selectedDateKey = null;
}

// Salvar Evento
saveEventBtn.addEventListener('click', () => {
    if (selectedDateKey) {
        const title = eventTitleInput.value;
        const time = eventTimeInput.value;
        const desc = eventDescInput.value;

        if (title.trim() === '') {
            alert("Por favor, dê um nome ao evento.");
            return;
        }

        // Salva o objeto completo
        events[selectedDateKey] = {
            title: title,
            time: time,
            desc: desc
        };

        saveEventsToStorage();
        updateCalendar();
        closeEventModal();
    }
});

// Excluir Evento
deleteEventBtn.addEventListener('click', () => {
    if (selectedDateKey && events[selectedDateKey]) {
        const confirmDelete = confirm("Tem certeza que deseja excluir este evento?");
        if (confirmDelete) {
            delete events[selectedDateKey];
            saveEventsToStorage();
            updateCalendar();
            closeEventModal();
        }
    }
});

// Botão X para fechar
closeModalBtn.addEventListener('click', closeEventModal);

// Fechar se clicar fora do modal
eventModal.addEventListener('click', (e) => {
    if (e.target === eventModal) {
        closeEventModal();
    }
});

// Navegação de meses
prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
})

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
})

// Inicializa
updateCalendar();