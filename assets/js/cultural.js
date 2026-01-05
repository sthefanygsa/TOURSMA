// --- Configuração do Tailwind CSS ---
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

// --- Lógica da Página ---
document.addEventListener('DOMContentLoaded', () => {

  // 1. Controle do Menu de Navegação (Mobile e Dropdown)
  const toggle = document.getElementById('turismo-toggle');
  const menu = document.getElementById('turismo-menu');
  const wrapper = document.getElementById('menu-turismo-wrapper');

  if (toggle && menu) {
    function openMenu() {
      menu.classList.remove('hidden');
      toggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
      if (!menu.classList.contains('hidden')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    toggle.addEventListener('click', e => {
      e.stopPropagation();
      toggleMenu();
    });

    menu.addEventListener('click', e => e.stopPropagation());
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', () => closeMenu());
    // Fechar menu com tecla ESC
    document.addEventListener('keydown', e => e.key === 'Escape' && closeMenu());
    // Fechar menu ao redimensionar tela
    window.addEventListener('resize', closeMenu);
  }

  // 2. Lógica de Link Ativo (Highlight no Menu)
  const current = window.location.pathname.split('/').pop();

  document.querySelectorAll('nav .nav-link').forEach(a => {
    // Adiciona classe active se o href corresponder à página atual
    if (a.getAttribute('href') === current) {
      a.classList.add('active');
    }
  });

  // Verifica se um item do dropdown está ativo para destacar o pai ("Turismo")
  const dropdownParentToggle = document.getElementById('turismo-toggle');
  const dropdownItems = document.querySelectorAll('#turismo-menu a');
  dropdownItems.forEach(a => {
    if (a.getAttribute('href') === current) {
      if (dropdownParentToggle) dropdownParentToggle.classList.add('active');
    }
  });

  // Prevenir recarregamento desnecessário se clicar no link da página atual
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', e => {
      const target = link.getAttribute('href');
      const currentPage = window.location.pathname.split('/').pop();
      if (target === currentPage) {
        e.preventDefault();
        window.location.reload();
      }
    });
  });

  // 3. Lógica dos Filtros (Todos/Gratuitos/Pagos)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.establishment-card');

  // Classes para estado ativo vs inativo
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

      // Atualiza visual dos botões
      filterButtons.forEach(btn => {
        btn.classList.remove(...activeClasses);
        // Adiciona classes inativas apenas se não estiverem presentes
        btn.classList.add(...inactiveClasses.filter(c => !btn.classList.contains(c)));
      });
      
      // Ativa o botão clicado
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

  // 4. Lógica do botão "Saiba mais" (Expandir info)
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

});