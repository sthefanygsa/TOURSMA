window.tailwind.config = {
    darkMode: "class", 
    theme: {
        extend: {
            colors: {
                primary: "#29753b",
                accentBlue: "#194C9B",
                "background-light": "#ffffff",
                "background-dark": "#ffffff" 
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
    const current = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav .nav-link').forEach(a => {
        if (a.getAttribute('href') === current) a.classList.add('active');
    });
});