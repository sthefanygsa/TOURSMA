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
    const dayButtons = calendarGrid.querySelectorAll('button');
    const eventListContainer = document.getElementById('event-list-container');
    const eventListTitle = document.getElementById('event-list-title');

    const mockEvents = {
      '4': [
        {
          title: 'Exposição de Fotografia',
          location: 'Museu Histórico',
          time: '10:00 - 18:00',
          description: 'Mostra "Olhares de São Miguel", com fotos da natureza local.'
        }
      ],
      '5': [
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
      '11': [
        {
          title: 'Festival Gastronômico',
          location: 'Parque de Exposições',
          time: '18:00 - 23:00',
          description: 'Sabores da terra: experimente pratos típicos da culinária tropeira.'
        }
      ],
      '25': [
        {
          title: 'Caminhada Ecológica',
          location: 'Trilha do Mirante',
          time: '08:00 - 12:00',
          description: 'Passeio guiado pela mata atlântica, com vista panorâmica da cidade.'
        }
      ]
    };

    const createEventCardHTML = (event) => `
      <div class="bg-white p-5 rounded-xl shadow-lg border border-gray-100 animate-fade-in">
        <h4 class="font-bold text-lg text-[#194C9B]">${event.title}</h4>
        <div class="flex items-center text-gray-600 mt-2 text-sm">
          <span class="material-symbols-outlined text-base mr-2">location_on</span>
          <span>${event.location}</span>
        </div>
        <div class="flex items-center text-gray-600 mt-1 text-sm">
          <span class="material-symbols-outlined text-base mr-2">schedule</span>
          <span>${event.time}</span>
        </div>
        <p class="text-gray-700 mt-3 text-sm">${event.description}</p>
      </div>
    `;

    const emptyStateHTML = `
      <div class="bg-gray-50 p-6 rounded-xl text-center border-2 border-dashed">
        <span class="material-symbols-outlined text-5xl text-gray-400">event_busy</span>
        <p class="text-gray-600 mt-2 font-medium">Nenhum evento programado para este dia.</p>
        <p class="text-gray-500 text-sm">Explore outra data!</p>
      </div>
    `;

    function showEventsForDay(day) {
      const dayEvents = day ? (mockEvents[day] || []) : [];

      if (eventListTitle) {
        eventListTitle.textContent = day ? `Eventos para ${day} de Julho 2026` : 'Selecione um dia';
      }
      
      if (eventListContainer) {
        eventListContainer.innerHTML = '';

        if (dayEvents.length > 0) {
          dayEvents.forEach(event => {
            eventListContainer.innerHTML += createEventCardHTML(event);
          });
        } else {
          eventListContainer.innerHTML = emptyStateHTML;
        }
      }
    }

    function updateSelectedDay(clickedButton) {
      const currentSelectedBtn = calendarGrid.querySelector('button.day-selected');
      if (currentSelectedBtn) {
        currentSelectedBtn.classList.remove('day-selected', 'text-white', 'font-bold');
        currentSelectedBtn.classList.add('text-gray-800', 'font-medium', 'hover:bg-gray-100');
        const badge = currentSelectedBtn.querySelector('div');
        if (badge) badge.classList.remove('bg-[#29763B]', 'shadow-md');
      }

      clickedButton.classList.add('day-selected', 'text-white', 'font-bold');
      clickedButton.classList.remove('text-gray-800', 'font-medium', 'hover:bg-gray-100');
      const newBadge = clickedButton.querySelector('div');
      if (newBadge) newBadge.classList.add('bg-[#29763B]', 'shadow-md');
    }

    dayButtons.forEach(button => {
      if (button.classList.contains('text-gray-400')) {
        button.disabled = true;
        return;
      }

      button.addEventListener('click', () => {
        const dayMatch = button.textContent.trim().match(/^\d+/);
        const day = dayMatch ? dayMatch[0] : null;
        if (day) {
          updateSelectedDay(button);
          showEventsForDay(day);
        }
      });
    });

    // Inicializa mostrando o dia 5 por padrão
    showEventsForDay('5');
  }
});