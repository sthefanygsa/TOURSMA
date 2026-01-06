tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#29753b",
                accentBlue: "#194C9B",
                "background-light": "#ffffff",
                "background-dark": "#141e16"
            },
            fontFamily: {
                display: ["Plus Jakarta Sans", "sans-serif"]
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

    if (toggle && menu) {
        toggle.addEventListener('click', e => {
            e.stopPropagation();
            menu.classList.toggle('hidden');
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
        });

        document.addEventListener('click', () => menu.classList.add('hidden'));
        document.addEventListener('keydown', e => e.key === 'Escape' && menu.classList.add('hidden'));
    }

    const current = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav .nav-link').forEach(a => {
        if (a.getAttribute('href') === current) a.classList.add('active');
    });
});