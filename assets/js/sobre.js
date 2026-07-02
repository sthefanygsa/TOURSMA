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
    if (a.getAttribute('href') === current) a.classList.add('active');
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