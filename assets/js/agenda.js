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

const API_BASE = 'https://toursma.onrender.com/api';
const DESTAQUES_PADRAO_AGENDA = [
  {
    imagem: 'assets/img/festadauva.png',
    tipo: 'Gratuito',
    titulo: 'Festa da Uva',
    descricaoCurta: 'Uma festa em comemoração à colheita da uva, com música, comida e bebida.',
    descricaoLonga: 'Uma descrição mais longa sobre a festa, seus eventos e atrações. Perfeito para uma saída em família.',
    endereco: 'Rua Principal, 123',
    horario: 'Ter - Dom: 11h às 22h',
    telefone: '(15) 99999-1111'
  },
  {
    imagem: 'assets/img/festivaldeinverno.png',
    tipo: 'Pago',
    titulo: 'Festival de Inverno',
    descricaoCurta: 'Uma festa em comemoração à colheita da uva, com música, comida e bebida.',
    descricaoLonga: 'Uma descrição mais longa sobre o festival, seus eventos e atrações. Perfeito para uma saída em família.',
    endereco: 'Av. Central, 456',
    horario: 'Seg - Sáb: 08h às 20h',
    telefone: '(15) 99999-2222'
  },
  {
    imagem: 'assets/img/cultural.png',
    tipo: 'Gratuito',
    titulo: 'Semana Cultural',
    descricaoCurta: 'Uma semana de eventos culturais, com apresentações de teatro, música e artes plásticas.',
    descricaoLonga: 'Uma descrição mais longa sobre a semana cultural, seus eventos e atrações. Perfeito para uma saída em família.',
    endereco: 'Praça da Matriz, 78',
    horario: 'Seg - Dom: 06h às 19h',
    telefone: '(15) 99999-3333'
  }
];

const EVENTOS_PADRAO_CALENDARIO = {
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

function criarCardDestaqueElement(card) {
  const imgUrl = card.imagem || 'assets/img/festadauva.png';
  const div = document.createElement('div');
  div.className = 'establishment-card flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden group transition-all duration-300 hover:shadow-lg hover:border-primary/20 bg-white';

  div.innerHTML = `
    <div class="w-full bg-center bg-no-repeat aspect-video bg-cover" style="background-image: url('${imgUrl.replace(/'/g, "%27")}');"></div>
    <div class="p-4 pt-0 flex flex-col gap-3">
      <p class="text-accent-blue dark:text-white text-xl font-bold leading-normal">${card.titulo || ''}</p>
      <p class="text-text-secondary dark:text-gray-400 text-sm font-normal">${card.descricaoCurta || ''}</p>
      <div class="hidden-info hidden pt-3 mt-3 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-3 text-sm">
        <p class="text-text-secondary dark:text-gray-400">${card.descricaoLonga || ''}</p>
        <div class="flex items-center gap-2 text-text-secondary dark:text-gray-400">
          <span class="material-symbols-outlined text-base text-primary">location_on</span>
          <span>${card.endereco || ''}</span>
        </div>
        <div class="flex items-center gap-2 text-text-secondary dark:text-gray-400">
          <span class="material-symbols-outlined text-base text-primary">schedule</span>
          <span>${card.horario || ''}</span>
        </div>
        <div class="flex items-center gap-2 text-text-secondary dark:text-gray-400">
          <span class="material-symbols-outlined text-base text-primary">call</span>
          <span>${card.telefone || ''}</span>
        </div>
      </div>
      <button type="button" class="toggle-info-btn mt-3 w-full bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
        Saiba mais
      </button>
    </div>
  `;

  return div;
}

document.addEventListener('DOMContentLoaded', async () => {
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

  // 1. Carregar Destaques do Mês
  const gridDestaques = document.getElementById('establishment-grid');
  if (gridDestaques) {
    let destaques = DESTAQUES_PADRAO_AGENDA;
    try {
      const res = await fetch(`${API_BASE_AGENDA}/imagens/agenda`);
      if (res.ok) {
        const dados = await res.json();
        if (Array.isArray(dados) && dados.length > 0 && typeof dados[0] === 'object') {
          destaques = dados;
        }
      }
    } catch (err) {
      console.error('Erro ao carregar destaques da agenda:', err);
    }

    gridDestaques.innerHTML = '';
    destaques.forEach(item => gridDestaques.appendChild(criarCardDestaqueElement(item)));
  }

  document.addEventListener('click', (e) => {
    const button = e.target.closest('.toggle-info-btn');
    if (!button) return;

    const card = button.closest('.establishment-card');
    const hiddenContent = card?.querySelector('.hidden-info');
    if (hiddenContent) {
      hiddenContent.classList.toggle('hidden');
      const isHidden = hiddenContent.classList.contains('hidden');
      button.textContent = isHidden ? 'Saiba mais' : 'Ver menos';
    }
  });

  // 2. Carregar Calendário de Eventos
  const calendarGrid = document.getElementById('calendar-grid');
  if (calendarGrid) {
    const eventListContainer = document.getElementById('event-list-container');
    const eventListTitle = document.getElementById('event-list-title');
    const monthYearTitle = document.getElementById('current-month-year');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    let eventosPorDia = { ...EVENTOS_PADRAO_CALENDARIO };
    try {
      const resEventos = await fetch(`${API_BASE_AGENDA}/textos/agenda`);
      if (resEventos.ok) {
        const dadosEventos = await resEventos.json();
        if (dadosEventos && typeof dadosEventos === 'object' && !Array.isArray(dadosEventos)) {
          const temChaveData = Object.keys(dadosEventos).some(k => /^\d{4}-\d{2}-\d{2}$/.test(k));
          if (temChaveData) {
            eventosPorDia = dadosEventos;
          }
        }
      }
    } catch (err) {
      console.error('Erro ao carregar eventos do calendário:', err);
    }

    const hoje = new Date();
let currentDate = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
let selectedDateStr = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;

    const nomesMeses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const createEventCardHTML = (event) => `
      <div class="bg-white p-5 rounded-xl shadow-lg border border-gray-100 transition-all duration-300">
        <h4 class="font-bold text-lg text-[#194C9B]">${event.title || ''}</h4>
        <div class="flex items-center text-gray-600 mt-2 text-sm">
          <span class="material-symbols-outlined text-base mr-2 text-[#29753b]">location_on</span>
          <span>${event.location || ''}</span>
        </div>
        <div class="flex items-center text-gray-600 mt-1 text-sm">
          <span class="material-symbols-outlined text-base mr-2 text-[#29753b]">schedule</span>
          <span>${event.time || ''}</span>
        </div>
        <p class="text-gray-700 mt-3 text-sm leading-relaxed">${event.description || ''}</p>
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
        const dayEvents = Array.isArray(eventosPorDia[dateStr]) ? eventosPorDia[dateStr] : [];

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
        dayBtn.type = 'button';
        dayBtn.className = 'h-10 w-full text-gray-800 text-sm font-medium leading-normal hover:bg-gray-100 rounded-full transition-colors focus:outline-none';

        const currentLoopDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const temEvento = Array.isArray(eventosPorDia[currentLoopDateStr]) && eventosPorDia[currentLoopDateStr].length > 0;

        const innerDiv = document.createElement('div');
        innerDiv.className = 'flex size-full items-center justify-center rounded-full relative';
        innerDiv.textContent = day;

        if (temEvento) {
          const dot = document.createElement('span');
          dot.className = 'absolute bottom-1.5 h-1 w-1 rounded-full bg-[#194C9B]';
          innerDiv.appendChild(dot);
        }

        if (currentLoopDateStr === selectedDateStr) {
          dayBtn.className = 'h-10 w-full text-white text-sm font-bold leading-normal rounded-full focus:outline-none day-selected';
          innerDiv.className = 'flex size-full items-center justify-center rounded-full bg-[#29763B] shadow-md relative';

          const dot = innerDiv.querySelector('span');
          if (dot) dot.className = 'absolute bottom-1.5 h-1 w-1 rounded-full bg-white';
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
updateEventsDisplay(selectedDateStr, hoje.getDate(), nomesMeses[hoje.getMonth()], hoje.getFullYear());  }
});