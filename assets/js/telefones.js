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

(function () {
  const current = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav .nav-link').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', e => {
      const target = link.getAttribute('href');
      const current = window.location.pathname.split('/').pop();
      if (target === current) { e.preventDefault(); window.location.reload(); }
    });
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  const API_BASE = 'http://localhost:3001/api';
  const grid = document.getElementById('establishment-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  const activeClasses = ['bg-primary', 'text-white'];
  const inactiveClasses = [
    'bg-gray-100',
    'text-secondary-light',
    'hover:bg-primary/10',
    'hover:text-primary'
  ];

  function iconePorCategoria(categoria) {
    const mapa = {
      emergencia: 'local_police',
      saude: 'local_hospital',
      publicos: 'domain',
      transporte: 'directions_bus',
      farmacias: 'vaccines',
      servicos: 'call',
      mapa: 'map'
    };
    return mapa[(categoria || '').trim().toLowerCase()] || 'call';
  }

  function criarElementoCardTelefone(item) {
    const categoriaLimpa = (item.categoria || 'emergencia').trim().toLowerCase();
    const card = document.createElement('div');
    card.className = 'establishment-card group flex flex-col gap-3 rounded-xl border border-border-light dark:border-border-dark shadow-md p-4 transition-all bg-white dark:bg-background-dark';
    card.dataset.category = categoriaLimpa;

    const topo = document.createElement('div');
    topo.className = 'flex items-center gap-4';

    const iconeBox = document.createElement('div');
    iconeBox.className = 'flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary';
    iconeBox.innerHTML = `<span class="material-symbols-outlined text-3xl">${iconePorCategoria(categoriaLimpa)}</span>`;

    const infoTitulo = document.createElement('div');
    infoTitulo.className = 'flex flex-col';

    const tituloEl = document.createElement('p');
    tituloEl.className = 'text-accent-blue dark:text-white text-xl font-bold leading-normal';
    tituloEl.textContent = item.titulo || 'Contato';

    const tagEl = document.createElement('span');
    tagEl.className = 'text-xs font-semibold uppercase tracking-wider text-primary';
    tagEl.textContent = item.tag || categoriaLimpa;

    infoTitulo.appendChild(tituloEl);
    infoTitulo.appendChild(tagEl);
    topo.appendChild(iconeBox);
    topo.appendChild(infoTitulo);
    card.appendChild(topo);

    if (item.descricao) {
      const descEl = document.createElement('p');
      descEl.className = 'text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal';
      descEl.textContent = item.descricao;
      card.appendChild(descEl);
    }

    const temDetalhes = item.endereco || item.telefone || item.horario;
    if (temDetalhes) {
      const detalhes = document.createElement('div');
      detalhes.className = 'pt-3 mt-3 border-t border-border-light dark:border-border-dark flex flex-col gap-3 text-sm';

      if (item.endereco) {
        detalhes.innerHTML += `
          <div class="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark">
            <span class="material-symbols-outlined text-base text-primary">location_on</span>
            <span>${item.endereco}</span>
          </div>`;
      }
      if (item.telefone) {
        detalhes.innerHTML += `
          <div class="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark">
            <span class="material-symbols-outlined text-base text-primary">call</span>
            <span>${item.telefone}</span>
          </div>`;
      }
      if (item.horario) {
        detalhes.innerHTML += `
          <div class="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark">
            <span class="material-symbols-outlined text-base text-primary">schedule</span>
            <span>${item.horario}</span>
          </div>`;
      }
      card.appendChild(detalhes);
    }

    if (item.telefone) {
      const btnCopy = document.createElement('button');
      btnCopy.className = 'copy-btn mt-2 w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-text-secondary-light px-4 py-2 rounded-lg text-sm font-bold transition-colors';
      btnCopy.dataset.copy = item.telefone;
      btnCopy.innerHTML = '<span class="material-symbols-outlined text-base">content_copy</span> Copiar Telefone';
      card.appendChild(btnCopy);
    }

    return card;
  }

  function ativarEventosFiltrosECopia() {
    const cards = document.querySelectorAll('.establishment-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = (button.dataset.filter || 'all').trim().toLowerCase();

        filterButtons.forEach(btn => {
          btn.classList.remove(...activeClasses);
          btn.classList.add(...inactiveClasses.filter(c => !btn.classList.contains(c)));
        });
        button.classList.add(...activeClasses);
        button.classList.remove(...inactiveClasses.filter(c => button.classList.contains(c)));

        cards.forEach(card => {
          const category = (card.dataset.category || '').trim().toLowerCase();
          card.style.display = (filter === 'all' || filter === category) ? 'flex' : 'none';
        });
      });
    });

    document.querySelectorAll('.copy-btn').forEach(button => {
      button.addEventListener('click', () => {
        const rawText = button.dataset.copy || '';
        const textToCopy = rawText.replace(/\D/g, '');

        if (textToCopy && navigator.clipboard) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            const originalHtml = button.innerHTML;
            button.innerHTML = '<span class="material-symbols-outlined text-base">check</span> Copiado!';
            button.disabled = true;

            setTimeout(() => {
              button.innerHTML = originalHtml;
              button.disabled = false;
            }, 2000);
          }).catch(err => {
            console.error('Falha ao copiar: ', err);
            alert('Falha ao copiar para a área de transferência.');
          });
        } else {
          alert('Não foi possível copiar. O navegador pode não suportar esta ação.');
        }
      });
    });
  }

  async function carregarConteudoTelefones() {
    try {
      const respTextos = await fetch(`${API_BASE}/textos/telefones`);
      if (respTextos.ok) {
        const textos = await respTextos.json();
        const elTitulo = document.getElementById('titulo-telefones');
        const elSubtitulo = document.getElementById('subtitulo-telefones');
        const novoSubtitulo = textos.descricao || textos.conteudo || textos.historia;
        if (elTitulo && textos.titulo) elTitulo.textContent = textos.titulo;
        if (elSubtitulo && novoSubtitulo) elSubtitulo.textContent = novoSubtitulo;
      }
    } catch (e) {
      console.error('Erro ao carregar textos de telefones:', e);
    }

    try {
      const respCards = await fetch(`${API_BASE}/imagens/telefones`);
      if (respCards.ok && grid) {
        const lista = await respCards.json();
        if (Array.isArray(lista) && lista.length > 0) {
          grid.innerHTML = '';
          lista.forEach(item => {
            if (item && typeof item === 'object') {
              grid.appendChild(criarElementoCardTelefone(item));
            }
          });
        }
      }
    } catch (e) {
      console.error('Erro ao carregar cards de telefones:', e);
    }

    ativarEventosFiltrosECopia();
  }

  carregarConteudoTelefones();
});