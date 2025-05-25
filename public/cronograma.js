 // Configuração de eventos por mês
 const eventData = [
    {
        month: 2, // Março (0-indexed)
        year: 2025,
        events: {
            14: [{ title: "Jejum 1° dia", type: "jejum" }],
            15: [{ title: "Jejum 2° dia", type: "jejum" }],
            16: [{ title: "Jejum ultimo dia", type: "jejum" }]
        }
    },
    {
        month: 3, // Março (0-indexed)
        year: 2025,
        events: {
            7: [{ title: "Oração Primeiro dia", type: "oracao" }],
            8: [{ title: "Oração 2° dia", type: "oracao" }],
            9: [{ title: "Oração 3° dia", type: "oracao" }],
            10: [{ title: "Oração 4° dia", type: "oracao" }],
            11: [{ title: "Oração 5° dia", type: "oracao" }],
            12: [{ title: "Oração 6° dia", type: "oracao" }],
            13: [{ title: "Oração 7° dia", type: "oracao" }],
            14: [{ title: "Oração 8° dia", type: "oracao" }],
            15: [{ title: "Oração 9° dia", type: "oracao" }],
            16: [{ title: "Oração 10° dia", type: "oracao" }],
            17: [{ title: "Oração 11° dia", type: "oracao" }],
            18: [{ title: "Oração 12° dia", type: "oracao" }],
            19: [{ title: "Oração 13° dia", type: "oracao" }],
            20: [{ title: "Oração 14° dia", type: "oracao" }],
            21: [{ title: "Oração 15° dia", type: "oracao" }],
            22: [{ title: "Oração 16° dia", type: "oracao" }],
            23: [{ title: "Oração 17° dia", type: "oracao" }],
            24: [{ title: "Oração 18° dia", type: "oracao" }],
            25: [{ title: "Oração 19° dia", type: "oracao" }],
            26: [{ title: "Oração 20° dia", type: "oracao" }],
            27: [{ title: "Oração 21° dia", type: "oracao" }],
            28: [{ title: "Oração Último dia", type: "oracao" }]
        }
    },
  {
        month: 5, // Março (0-indexed)
        year: 2025,
        events: {
            10: [{ title: "Jejum 1° dia", type: "jejum" }],
            11: [{ title: "Jejum 2° dia", type: "jejum" }],
            12: [{ title: "Jejum ultimo dia", type: "jejum" }]
        }
    },
  {
        month: 5, // Março (0-indexed)
        year: 2025,
        events: {
            26: [{ title: "Jejum 1° dia", type: "jejum" }],
            27: [{ title: "Jejum 2° dia", type: "jejum" }],
            28: [{ title: "Jejum ultimo dia", type: "jejum" }]
        }
    },
];

// Mês e ano atual para inicialização
let currentMonth = 3; // Março (0-indexed)
let currentYear = 2025;

// Nome dos meses
const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Nome dos dias da semana
const weekDays = [
    "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"
];

// Inicializar o calendário
document.addEventListener('DOMContentLoaded', function () {
    generateGridCalendar(currentMonth, currentYear);
    generateVerticalCalendar(currentMonth, currentYear);
    updateMonthYearDisplay();

    // Event listeners para navegação
    document.getElementById('prev-month').addEventListener('click', function () {
        navigateMonth(-1);
    });

    document.getElementById('next-month').addEventListener('click', function () {
        navigateMonth(1);
    });

    // Verificar o tamanho da tela para mostrar o layout apropriado
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});

function checkScreenSize() {
    const isMobile = window.innerWidth <= 767;
    document.querySelector('.calendar-grid').style.display = isMobile ? 'none' : 'block';
    document.querySelector('.calendar-days').style.display = isMobile ? 'block' : 'none';
}

function navigateMonth(direction) {
    currentMonth += direction;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    generateGridCalendar(currentMonth, currentYear);
    generateVerticalCalendar(currentMonth, currentYear);
    updateMonthYearDisplay();
}

function updateMonthYearDisplay() {
    document.getElementById('month-year-display').textContent =
        `${monthNames[currentMonth]} ${currentYear}`;
}

// Função para gerar o calendário em formato de tabela (desktop)
function generateGridCalendar(month, year) {
    const calendarBody = document.getElementById('calendar-body');
    calendarBody.innerHTML = '';

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    let startingDay = firstDay.getDay(); // 0 = Domingo, 1 = Segunda, ...

    let date = 1;

    // Criar todas as linhas necessárias para este mês
    for (let i = 0; i < 6; i++) {
        // Criar uma nova linha se necessário
        if (date <= daysInMonth) {
            const row = document.createElement('tr');

            // Criar células para cada dia da semana
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');

                if (i === 0 && j < startingDay) {
                    // Dias do mês anterior
                    cell.innerHTML = '';
                } else if (date > daysInMonth) {
                    // Dias do próximo mês
                    cell.innerHTML = '';
                } else {
                    // Dias do mês atual
                    const dateDiv = document.createElement('div');
                    dateDiv.className = 'date-number';
                    dateDiv.textContent = date;
                    cell.appendChild(dateDiv);

                    // Adicionar eventos para este dia, se existirem
                    const events = getEventsForDate(date, month, year);
                    if (events && events.length > 0) {
                        events.forEach(event => {
                            const eventDiv = document.createElement('div');
                            eventDiv.className = 'event';
                            eventDiv.textContent = event.title;
                            cell.appendChild(eventDiv);
                        });
                    }

                    date++;
                }

                row.appendChild(cell);
            }

            calendarBody.appendChild(row);
        }
    }
}

// Função para gerar o calendário em formato vertical (mobile)
function generateVerticalCalendar(month, year) {
    const calendarDays = document.getElementById('calendar-days');
    calendarDays.innerHTML = '';

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Criar linhas para cada dia do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Segunda, ...

        // Criar a linha do dia
        const dayRow = document.createElement('div');
        dayRow.className = 'day-row';

        // Criar o rótulo do dia
        const dayLabel = document.createElement('div');
        dayLabel.className = 'day-label';
        dayLabel.innerHTML = `${weekDays[dayOfWeek]}<span class="day-number">${day}</span>`;
        dayRow.appendChild(dayLabel);

        // Criar o conteúdo do dia
        const dayContent = document.createElement('div');
        dayContent.className = 'day-content';

        // Adicionar eventos para este dia, se existirem
        const events = getEventsForDate(day, month, year);
        if (events && events.length > 0) {
            events.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.className = 'event';
                eventDiv.textContent = event.title;
                dayContent.appendChild(eventDiv);
            });
        }

        dayRow.appendChild(dayContent);
        calendarDays.appendChild(dayRow);
    }
}

function getEventsForDate(day, month, year) {

    // Encontrar eventos para o mês/ano específico
    const monthData = eventData.find(data => data.month === month && data.year === year);

    if (monthData && monthData.events && monthData.events[day]) {
        return monthData.events[day];
    }

    return null;
}
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const overlay = document.getElementById('overlay');

    // Toggle menu when hamburger icon is clicked
    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        overlay.classList.toggle('active');

        // Prevent scrolling when menu is open
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on the overlay
    overlay.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu when clicking on a nav item
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
