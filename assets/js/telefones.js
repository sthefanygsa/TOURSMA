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

(function () {
  const toggle = document.getElementById('turismo-toggle');
  const menu = document.getElementById('turismo-menu');
  
  if (toggle && menu) {
    function openMenu() { menu.classList.remove('hidden'); toggle.setAttribute('aria-expanded', 'true'); }
    function closeMenu() { menu.classList.add('hidden'); toggle.setAttribute('aria-expanded', 'false'); }
    function toggleMenu() { if (!menu.classList.contains('hidden')) closeMenu(); else openMenu(); }
    
    toggle.addEventListener('click', e => { e.stopPropagation(); toggleMenu(); });
    menu.addEventListener('click', e => e.stopPropagation());
    
    document.addEventListener('click', () => closeMenu());
    document.addEventListener('keydown', e => e.key === 'Escape' && closeMenu());
    window.addEventListener('resize', closeMenu);
  }
  
  const current = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav .nav-link').forEach(a => { if (a.getAttribute('href') === current) a.classList.add('active'); });
  
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', e => {
      const target = link.getAttribute('href');
      const current = window.location.pathname.split('/').pop();
      if (target === current) { e.preventDefault(); window.location.reload(); }
    });
  });
})();

document.addEventListener('DOMContentLoaded', () => {

  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.establishment-card');

  const activeClasses = ['bg-primary', 'text-white'];
  const inactiveClasses = [
    'bg-gray-100', 'dark:bg-gray-800',
    'dark:text-gray-300', 'dark:hover:bg-primary/20',
    'dark:hover:text-white', 'text-secondary-light',
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
      button.classList.remove(...inactiveClasses.filter(c => button.classList.contains(c)));

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

  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const rawText = button.dataset.copy;
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

});