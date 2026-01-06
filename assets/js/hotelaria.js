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

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('turismo-toggle');
  const menu = document.getElementById('turismo-menu');

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

  if (toggle && menu) {
    toggle.addEventListener('click', e => {
      e.stopPropagation();
      toggleMenu();
    });
    menu.addEventListener('click', e => e.stopPropagation());
    
    document.addEventListener('click', () => closeMenu());
    
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
    
    window.addEventListener('resize', closeMenu);
  }

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
});

document.addEventListener('DOMContentLoaded', () => {
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
});