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

  const current = window.location.pathname.split('/').pop();

  document.querySelectorAll('nav .nav-link').forEach(a => {
    if (a.getAttribute('href') === current) {
      a.classList.add('active');
    }
  });

  const dropdownParentToggle = document.getElementById('turismo-toggle');
  const dropdownItems = document.querySelectorAll('#turismo-menu a');
  dropdownItems.forEach(a => {
    if (a.getAttribute('href') === current) {
      if (dropdownParentToggle) dropdownParentToggle.classList.add('active');
    }
  });

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

});