// --- 1. Configuração do Tailwind ---
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

// --- 2. Lógica da Página ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica do Menu de Navegação ---
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

    if (toggle && menu) {
        toggle.addEventListener('click', e => {
            e.stopPropagation();
            toggleMenu();
        });
        menu.addEventListener('click', e => e.stopPropagation());
    }

    document.addEventListener('click', () => {
        if(menu && !menu.classList.contains('hidden')) closeMenu();
    });
    
    document.addEventListener('keydown', e => e.key === 'Escape' && menu && closeMenu());
    window.addEventListener('resize', () => { if(menu) closeMenu(); });

    // Link ativo e prevenir reload
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav .nav-link').forEach(a => {
        if (a.getAttribute('href') === currentPath) a.classList.add('active');
    });

    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', e => {
            const target = link.getAttribute('href');
            if (target === currentPath) {
                e.preventDefault();
                window.location.reload();
            }
        });
    });

    // --- Lógica de Filtragem ---
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

            // Atualiza estilo dos botões
            filterButtons.forEach(btn => {
                btn.classList.remove(...activeClasses);
                btn.classList.add(...inactiveClasses.filter(c => !btn.classList.contains(c)));
            });
            button.classList.add(...activeClasses);
            button.classList.remove(...inactiveClasses.filter(c => button.classList.contains(c)));

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

    // --- Lógica do Botão Copiar ---
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const rawText = button.dataset.copy;
            // Remove tudo que não for dígito para copiar apenas o número
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