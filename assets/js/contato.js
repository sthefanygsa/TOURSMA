window.tailwind.config = {
  darkMode: "class", 
  theme: {
    extend: {
      colors: {
        "primary": "#29753b",
        "background-light": "#f6f8f6",
        "background-dark": "#f6f8f6", 
        "accent-blue": "#194C9B",
        "text-dark": "#333333",
        "border-light": "#CCCCCC",
        "border-dark": "#CCCCCC"      
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"]
      },
      borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
    },
  },
};

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    
    const current = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav .nav-link').forEach(a => {
      const href = a.getAttribute('href');
      if (href === current || (current === '' && href === 'index.html')) {
        a.classList.add('active');
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

    const contactForm = document.querySelector('form[method="POST"]');
    if (contactForm) {
      contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        window.location.href = 'contato.html';
      });
    }
  });
})();