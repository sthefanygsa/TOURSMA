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

const API_BASE_CARDS = 'http://localhost:3001/api';

const CARDS_PADRAO_ECOLOGICO = [
  {
    imagem: 'assets/img/parque1.png',
    tipo: 'Gratuito',
    titulo: 'Parque Estadual Carlos Botelho',
    descricaoCurta: 'Uma das maiores reservas da Mata Atlântica, com lindas trilhas e cachoeiras naturais.',
    descricaoLonga: 'Uma descrição mais longa sobre o parque, seus recursos naturais e o ambiente. Perfeito para uma saída em família.',
    endereco: 'Rua Principal, 123',
    horario: 'Ter - Dom: 11h às 22h',
    telefone: '(15) 99999-1111'
  },
  {
    imagem: 'assets/img/cachoeira1.png',
    tipo: 'Pago',
    titulo: 'Cachoeira do Arcanjo',
    descricaoCurta: 'Uma das cachoeiras mais belas da região, ideal para um dia de descanso na natureza.',
    descricaoLonga: 'Uma descrição mais longa sobre a cachoeira, seus recursos naturais e o ambiente. Perfeito para uma saída em família.',
    endereco: 'Av. Central, 456',
    horario: 'Seg - Sáb: 08h às 20h',
    telefone: '(15) 99999-2222'
  },
  {
    imagem: 'assets/img/trilha1.png',
    tipo: 'Gratuito',
    titulo: 'Trilha do Mirante da Serra',
    descricaoCurta: 'Uma trilha desafiadora com vistas panorâmicas sobre a serra.',
    descricaoLonga: 'Uma descrição mais longa sobre a trilha, seus pontos de interesse e o ambiente. Perfeito para uma saída em família.',
    endereco: 'Praça da Matriz, 78',
    horario: 'Seg - Dom: 06h às 19h',
    telefone: '(15) 99999-3333'
  },
  {
    imagem: 'assets/img/cachoeira2.png',
    tipo: 'Gratuito',
    titulo: 'Cachoeira Cristalina',
    descricaoCurta: 'Uma cachoeira paradisíaca.',
    descricaoLonga: 'Uma descrição mais longa sobre a cachoeira, seus pontos de interesse e o ambiente. Perfeito para uma saída em família.',
    endereco: 'Rua do Comércio, 90',
    horario: 'Seg - Sex: 07h às 18h',
    telefone: '(15) 99999-4444'
  },
  {
    imagem: 'assets/img/parque2.png',
    tipo: 'Pago',
    titulo: 'Parque da Onça',
    descricaoCurta: 'Um parque natural com trilhas e pontos de vista.',
    descricaoLonga: 'Uma descrição mais longa sobre o parque, seus pontos de interesse e o ambiente. Perfeito para uma saída em família.',
    endereco: 'Rua das Flores, 321',
    horario: 'Qua - Dom: 18h às 23h',
    telefone: '(15) 99999-5555'
  }
];

function normalizarCategoria(tipo) {
  const valor = String(tipo || '').toLowerCase();
  return valor.startsWith('pag') ? 'Pagos' : 'Gratuitos';
}

function normalizarLabelTag(tipo) {
  const valor = String(tipo || '').toLowerCase();
  return valor.startsWith('pag') ? 'Pago' : 'Gratuito';
}

function criarElementoCard(card) {
  const categoria = normalizarCategoria(card.tipo);
  const labelTag = normalizarLabelTag(card.tipo);
  const imgUrl = card.imagem || 'assets/img/parque1.png';

  const article = document.createElement('div');
  article.className = 'establishment-card flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden group transition-all duration-300 hover:shadow-lg hover:border-primary/20';
  article.dataset.category = categoria;

  article.innerHTML = `
    <div class="w-full bg-center bg-no-repeat aspect-video bg-cover" style="background-image: url('${imgUrl.replace(/'/g, "%27")}');"></div>
    <div class="p-4 pt-0 flex flex-col gap-3">
      <span class="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-full self-start">${labelTag}</span>
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

  return article;
}

async function carregarConteudoEcologico() {
  const pagina = window.location.pathname.includes('religioso')
    ? 'religioso'
    : window.location.pathname.includes('rural')
      ? 'rural'
      : 'ecologico';

  try {
    const resTexto = await fetch(`${API_BASE_CARDS}/textos/${pagina}`);
    if (resTexto.ok) {
      const dadosTexto = await resTexto.json();
      const elTitulo = document.getElementById('pagina-titulo');
      const elDesc = document.getElementById('pagina-descricao');
      if (elTitulo && dadosTexto.titulo) elTitulo.textContent = dadosTexto.titulo;
      if (elDesc && (dadosTexto.descricao || dadosTexto.historia)) {
        elDesc.textContent = dadosTexto.descricao || dadosTexto.historia;
      }
    }
  } catch (err) {
    console.error('Erro ao carregar textos da página:', err);
  }

  const grid = document.getElementById('establishment-grid');
  if (!grid) return;

let cardsParaRenderizar = pagina === 'ecologico'
    ? CARDS_PADRAO_ECOLOGICO
    : pagina === 'religioso'
      ? CARDS_PADRAO_RELIGIOSO
      : [];
  try {
    const resCards = await fetch(`${API_BASE_CARDS}/imagens/${pagina}`);
    if (resCards.ok) {
      const dadosCards = await resCards.json();
      if (Array.isArray(dadosCards) && dadosCards.length > 0 && typeof dadosCards[0] === 'object') {
        cardsParaRenderizar = dadosCards;
      }
    }
  } catch (err) {
    console.error('Erro ao carregar cards do banco:', err);
  }

  grid.innerHTML = '';
  cardsParaRenderizar.forEach(card => {
    grid.appendChild(criarElementoCard(card));
  });
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

  await carregarConteudoEcologico();

  const filterButtons = document.querySelectorAll('.filter-btn');
  const activeClasses = ['bg-primary', 'text-white'];
  const inactiveClasses = ['bg-gray-100', 'text-secondary', 'hover:bg-primary/10', 'hover:text-primary'];

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      const cards = document.querySelectorAll('.establishment-card');

      filterButtons.forEach(btn => {
        btn.classList.remove(...activeClasses);
        btn.classList.add(...inactiveClasses.filter(c => !btn.classList.contains(c)));
      });
      button.classList.add(...activeClasses);
      button.classList.remove(...inactiveClasses);

      cards.forEach(card => {
        const category = card.dataset.category;
        card.style.display = (filter === 'all' || filter === category) ? 'flex' : 'none';
      });
    });
  });

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
});

const CARDS_PADRAO_RELIGIOSO = [
  {
    imagem: 'assets/img/basilica.png',
    tipo: 'Gratuito',
    titulo: 'Basílica de São Miguel Arcanjo',
    descricaoCurta: 'Uma das mais importantes basílicas da região. Dedicada ao Arcanjo Miguel.',
    descricaoLonga: 'Uma descrição mais longa sobre a basílica, seus artefatos e a história religiosa. Perfeito para uma visita cultural e espiritual.',
    endereco: 'Rua Principal, 123',
    horario: 'Ter - Dom: 11h às 22h',
    telefone: '(15) 99999-1111'
  },
  {
    imagem: 'assets/img/aparicao.png',
    tipo: 'Pago',
    titulo: 'Aparição de São Miguel Arcanjo',
    descricaoCurta: 'Uma das mais importantes aparições religiosas da região.',
    descricaoLonga: 'Uma descrição mais longa sobre a aparição, seus significados e a história religiosa. Perfeito para uma visita cultural e espiritual.',
    endereco: 'Av. Central, 456',
    horario: 'Seg - Sáb: 08h às 20h',
    telefone: '(15) 99999-2222'
  },
  {
    imagem: 'assets/img/gruta.png',
    tipo: 'Gratuito',
    titulo: 'Construção da Gruta do Arcanjo',
    descricaoCurta: 'Uma das mais importantes construções religiosas da região.',
    descricaoLonga: 'Uma descrição mais longa sobre a gruta, seus artefatos e a história religiosa. Perfeito para uma visita cultural e espiritual.',
    endereco: 'Praça da Matriz, 78',
    horario: 'Seg - Dom: 06h às 19h',
    telefone: '(15) 99999-3333'
  },
  {
    imagem: 'assets/img/capela.png',
    tipo: 'Gratuito',
    titulo: 'Capela do Arcanjo',
    descricaoCurta: 'Uma das mais importantes capelas da região.',
    descricaoLonga: 'Uma descrição mais longa sobre a capela, seus artefatos e a história religiosa. Perfeito para uma visita cultural e espiritual.',
    endereco: 'Rua do Comércio, 90',
    horario: 'Seg - Sex: 07h às 18h',
    telefone: '(15) 99999-4444'
  },
  {
    imagem: 'assets/img/velario.png',
    tipo: 'Pago',
    titulo: 'Velário',
    descricaoCurta: 'Um local de culto com significado religioso e histórico.',
    descricaoLonga: 'Uma descrição mais longa sobre o velário, seus artefatos e a história religiosa. Perfeito para uma visita cultural e espiritual.',
    endereco: 'Rua das Flores, 321',
    horario: 'Qua - Dom: 18h às 23h',
    telefone: '(15) 99999-5555'
  }
];