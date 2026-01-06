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
      borderRadius: {
        "DEFAULT": "0.5rem", 
        "lg": "0.75rem", 
        "xl": "1rem", 
        "full": "9999px"
      },
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
    const isOpen = !menu.classList.contains('hidden');
    if (isOpen) closeMenu();
    else openMenu();
  }

  if (toggle) {
    toggle.addEventListener('click', e => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  if (menu) {
    menu.addEventListener('click', e => e.stopPropagation());
  }

  document.addEventListener('click', () => closeMenu());
  document.addEventListener('keydown', e => e.key === 'Escape' && closeMenu());
  window.addEventListener('resize', closeMenu);

  const currentPath = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav .nav-link').forEach(a => {
    if (a.getAttribute('href') === currentPath) a.classList.add('active');
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