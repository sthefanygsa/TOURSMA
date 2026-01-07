// ------------------------------------------------------------------
// 1. Configuração do Tailwind CSS
// ------------------------------------------------------------------
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#29753b",
        "background-light": "#FFFFFF",
        "background-dark": "#141e16",
        "accent-blue": "#194C9B",
        "text-primary-light": "#121613",
        "text-secondary-light": "#6a816f",
        "text-primary-dark": "#f6f8f6",
        "text-secondary-dark": "#a0b3a3",
        "border-light": "#f1f4f2",
        "border-dark": "#2a3c2e"
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"]
      },
      borderRadius: { "DEFAULT": "0.5rem", "lg": "0.75rem", "xl": "1rem", "full": "9999px" },
    },
  },
};

// ------------------------------------------------------------------
// 2. Lógica da Página (Menus, Filtros, Interações)
// ------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

  // === Lógica do Menu Dropdown e Links Ativos ===
  const toggle = document.getElementById('turismo-toggle');
  const menu = document.getElementById('turismo-menu');
  const menuWrapper = document.getElementById('menu-turismo-wrapper');

  // Funções de controle do menu
  function openMenu() {
    menu.classList.remove('hidden');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menu.classList.add('hidden');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    if (menu.classList.contains('hidden')) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  // Event Listeners do Menu
  if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    menu.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Fechar ao clicar fora
    document.addEventListener('click', () => closeMenu());

    // Fechar ao apertar ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // Fechar ao redimensionar a tela
    window.addEventListener('resize', closeMenu);
  }

  // === Lógica de Link Ativo (Highlight da página atual) ===
  const currentPath = window.location.pathname.split('/').pop();
  
  // Marca o link da navbar principal
  document.querySelectorAll('nav .nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Previne recarregamento desnecessário se clicar na página atual
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', e => {
      const target = link.getAttribute('href');
      // Recalcula o path caso mude dinamicamente
      const current = window.location.pathname.split('/').pop(); 
      if (target === current) {
        e.preventDefault();
        window.location.reload();
      }
    });
  });

  // === Lógica de Filtros (Zona Urbana / Rural) ===
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.establishment-card');

  const activeClasses = ['bg-primary', 'text-white'];
  const inactiveClasses = [
    'bg-gray-100', 'dark:bg-gray-800',
    'dark:text-gray-300', 'dark:hover:bg-primary/20',
    'dark:hover:text-white', 'text-secondary',
    'hover:bg-primary/10', 'hover:text-primary'
  ];

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      // Atualiza estilo dos botões
      filterButtons.forEach(btn => {
        btn.classList.remove(...activeClasses);
        btn.classList.add(...inactiveClasses.filter(c => !btn.classList.contains(c)));
      });
      button.classList.add(...activeClasses);
      button.classList.remove(...inactiveClasses);

      // Filtra os cards
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

  // === Lógica do Botão "Saiba Mais" (Expandir info) ===
  const toggleInfoButtons = document.querySelectorAll('.toggle-info-btn');

  toggleInfoButtons.forEach(button => {
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
});