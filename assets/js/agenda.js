window.tailwind.config = {
  darkMode: "class", 
  theme: {
    extend: {
      colors: {
        "primary": "#29753b",
        "background-light": "#FFFFFF",
        "background-dark": "#FFFFFF", 
        "accent-blue": "#194C9B",
        "text-primary-light": "#121613",
        "text-secondary-light": "#6a816f",
        "text-primary-dark": "#121613",  
        "text-secondary-dark": "#6a816f", 
        "border-light": "#f1f4f2",
        "border-dark": "#f1f4f2"
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"]
      },
      borderRadius: { "DEFAULT": "0.5rem", "lg": "0.75rem", "xl": "1rem", "full": "9999px" },
    },
  },
};

document.addEventListener('DOMContentLoaded', () => {

  const currentPath = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav .nav-link').forEach(a => {
    if (a.getAttribute('href') === currentPath) {
      a.classList.add('active');
    }
  });

  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', e => {
      const target = link.getAttribute('href');
      const current = window.location.pathname.split('/').pop();
      if (target === current) {
        e.preventDefault();
        window.location.reload();
      }
    });
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.establishment-card');

  const activeClasses = ['bg-primary', 'text-white'];
  const inactiveClasses = [
    'bg-gray-100', 
    'text-secondary',
    'hover:bg-primary/10', 
    'hover:text-primary'
  ];

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(btn => {
        btn.classList.remove(...activeClasses);
        btn.classList.add(...inactiveClasses.filter(c => !btn.classList.contains(c)));
      });
      button.classList.add(...activeClasses);
      button.classList.remove(...inactiveClasses);

      cards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || filter === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const toggleButtons = document.querySelectorAll('.toggle-info-btn');
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.establishment-card');
      const hiddenContent = card.querySelector('.hidden-info');

      if (hiddenContent) {
        hiddenContent.classList.toggle('hidden');
        const isHidden = hiddenContent.classList.contains('hidden');
        button.textContent = isHidden ? 'Saiba mais' : 'Ver menos';
      }
    });
  });

  const calendarGrid = document.getElementById('calendar-grid');
  
  if (calendarGrid) {
    const eventListContainer = document.getElementById('event-list-container');
    const eventListTitle = document.getElementById('event-list-title');
    const monthYearTitle = document.getElementById('current-month-year');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    let currentDate = new Date(2026, 6, 5); 
    let selectedDateStr = "2026-07-05"; 

    const mockEvents = {
      '2026-07-04': [
        {
          title: 'Exposição de Fotografia',
          location: 'Museu Histórico',
          time: '10:00 - 18:00',
          description: 'Mostra "Olhares de São Miguel", com fotos da natureza local.'
        }
      ],
      '2026-07-05': [
        {
          title: 'Concerto na Praça Matriz',
          location: 'Praça Matriz, Centro',
          time: '19:00 - 21:00',
          description: 'Aproveite uma noite agradável com música ao vivo da orquestra local, apresentando clássicos da música brasileira.'
        },
        {
          title: 'Feira de Artesanato Local',
          location: 'Ginásio Municipal de Esportes',
          time: '09:00 - 17:00',
          description: 'Descubra o talento dos artesãos da nossa cidade e encontre peças únicas para decorar sua casa ou presentear.'
        }
      ],
      '2026-07-11': [
        {
          title: 'Festival Gastronômico',
          location: 'Parque de Exposições',
          time: '18:00 - 23:00',
          description: 'Sabores da terra: experimente pratos típicos da culinária tropeira.'
        }
      ],
      '2026-07-25': [
        {
          title: 'Caminhada Ecológica',
          location: 'Trilha do Mirante',
          time: '08:00 - 12:00',
          description: 'Passeio guiado pela mata atlântica, com vista panorâmica da cidade.'
        }
      ]
    };

    const nomesMeses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const createEventCardHTML = (event) => `
      <div class="bg-white p-5 rounded-xl shadow-lg border border-gray-100 transition-all duration-300">
        <h4 class="font-bold text-lg text-[#194C9B]">${event.title}</h4>
        <div class="flex items-center text-gray-600 mt-2 text-sm">
          <span class="material-symbols-outlined text-base mr-2 text-[#29753b]">location_on</span>
          <span>${event.location}</span>
        </div>
        <div class="flex items-center text-gray-600 mt-1 text-sm">
          <span class="material-symbols-outlined text-base mr-2 text-[#29753b]">schedule</span>
          <span>${event.time}</span>
        </div>
        <p class="text-gray-700 mt-3 text-sm leading-relaxed">${event.description}</p>
      </div>
    `;

    const emptyStateHTML = `
      <div class="bg-gray-50 p-6 rounded-xl text-center border-2 border-dashed border-gray-200">
        <span class="material-symbols-outlined text-5xl text-gray-400">event_busy</span>
        <p class="text-gray-600 mt-2 font-medium">Nenhum evento programado para este dia.</p>
        <p class="text-gray-400 text-sm">Explore outra data!</p>
      </div>
    `;

    function updateEventsDisplay(dateStr, diaNum, mesNome, anoNum) {
      if (eventListTitle) {
        eventListTitle.textContent = `Eventos para ${diaNum} de ${mesNome} ${anoNum}`;
      }
      
      if (eventListContainer) {
        eventListContainer.innerHTML = '';
        const dayEvents = mockEvents[dateStr] || [];

        if (dayEvents.length > 0) {
          dayEvents.forEach(event => {
            eventListContainer.insertAdjacentHTML('beforeend', createEventCardHTML(event));
          });
        } else {
          eventListContainer.innerHTML = emptyStateHTML;
        }
      }
    }

    function renderCalendar() {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      if (monthYearTitle) {
        monthYearTitle.textContent = `${nomesMeses[month]} ${year}`;
      }

      const oldButtons = calendarGrid.querySelectorAll('button');
      oldButtons.forEach(btn => btn.remove());

      const firstDayIndex = new Date(year, month, 1).getDay();
      const totalDays = new Date(year, month + 1, 0).getDate();

      if (firstDayIndex > 0) {
        const dummyBtn = document.createElement('button');
        dummyBtn.className = `h-10 w-full text-gray-400 text-sm font-medium leading-normal pointer-events-none col-start-1 col-end-${firstDayIndex + 1}`;
        calendarGrid.appendChild(dummyBtn);
      }

      for (let day = 1; day <= totalDays; day++) {
        const dayBtn = document.createElement('button');
        dayBtn.className = "h-10 w-full text-gray-800 text-sm font-medium leading-normal hover:bg-gray-100 rounded-full transition-colors focus:outline-none";
        
        const currentLoopDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        const innerDiv = document.createElement('div');
        innerDiv.className = "flex size-full items-center justify-center rounded-full relative";
        innerDiv.textContent = day;

        if (mockEvents[currentLoopDateStr]) {
          const dot = document.createElement('span');
          dot.className = "absolute bottom-1.5 h-1 w-1 rounded-full bg-[#194C9B]";
          innerDiv.appendChild(dot);
        }

        if (currentLoopDateStr === selectedDateStr) {
          dayBtn.className = "h-10 w-full text-white text-sm font-bold leading-normal rounded-full focus:outline-none day-selected";
          innerDiv.className = "flex size-full items-center justify-center rounded-full bg-[#29763B] shadow-md relative";
          
          const dot = innerDiv.querySelector('span');
          if (dot) dot.className = "absolute bottom-1.5 h-1 w-1 rounded-full bg-white";
        }

        dayBtn.appendChild(innerDiv);

        dayBtn.addEventListener('click', () => {
          selectedDateStr = currentLoopDateStr;
          renderCalendar();
          updateEventsDisplay(selectedDateStr, day, nomesMeses[month], year);
        });

        calendarGrid.appendChild(dayBtn);
      }
    }

    if (btnPrev && btnNext) {
      btnPrev.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
      });

      btnNext.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
      });
    }

    renderCalendar();
    updateEventsDisplay(selectedDateStr, 5, "Julho", 2026);
  }
});