window.tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#29763B",
                "secondary": "#194C9B",
                "background-light": "#FFFFFF",
                "background-dark": "#101010",
                "text-light": "#121613",
                "text-dark": "#E5E5E5",
                "text-muted-light": "#6c757d",
                "text-muted-dark": "#9ca3af",
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
    const mobileBtn = document.getElementById('menu-mobile-btn');
    const mobileMenu = document.getElementById('menu-mobile');
    
    if (toggle && menu) {
        toggle.addEventListener('click', e => {
            e.stopPropagation();
            const isOpen = !menu.classList.contains('hidden');
            if (isOpen) {
                menu.classList.add('hidden');
                toggle.setAttribute('aria-expanded', 'false');
            } else {
                menu.classList.remove('hidden');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
        menu.addEventListener('click', e => e.stopPropagation());
    }

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', e => {
            e.stopPropagation();
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
                mobileBtn.innerHTML = '<span class="material-symbols-outlined text-2xl block">close</span>';
            } else {
                mobileMenu.classList.remove('flex');
                mobileMenu.classList.add('hidden');
                mobileBtn.innerHTML = '<span class="material-symbols-outlined text-2xl block">menu</span>';
            }
        });
        mobileMenu.addEventListener('click', e => e.stopPropagation());
    }

    document.addEventListener('click', () => {
        if (menu) menu.classList.add('hidden');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('flex');
            mobileMenu.classList.add('hidden');
            if (mobileBtn) mobileBtn.innerHTML = '<span class="material-symbols-outlined text-2xl block">menu</span>';
        }
    });

    window.addEventListener('resize', () => {
        if (menu) menu.classList.add('hidden');
        if (mobileMenu) {
            mobileMenu.classList.remove('flex');
            mobileMenu.classList.add('hidden');
            if (mobileBtn) mobileBtn.innerHTML = '<span class="material-symbols-outlined text-2xl block">menu</span>';
        }
    });

    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(a => {
        if (a.getAttribute('href') === current) a.classList.add('active');
    });
});

const carousel = document.getElementById("carousel");
if (carousel) {
    const imagens = [
        "assets/img/img_carrossel_2_cidade.jpg",
        "assets/img/img_carrossel_1_basílica.jpg",
        "assets/img/img_carrossel_3_gruta.jpg",
        "assets/img/img_carrossel_4_cachoeira.jpg"
    ];
    let index = 0;
    const dots = document.querySelectorAll(".dot");

    function mudarImagem() {
        index = (index + 1) % imagens.length;
        carousel.style.backgroundImage = `linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 35%), url('${imagens[index]}')`;
        dots.forEach((dot, i) => {
            dot.classList.toggle("bg-white", i === index);
            dot.classList.toggle("bg-white/50", i !== index);
        });
    }
    setInterval(mudarImagem, 4000);
}

const tempElement = document.getElementById("temperatura");
const condElement = document.getElementById("condicao");
if (tempElement && condElement) {
    const lat = -23.8793;
    const lon = -47.9935;

    async function carregarClima() {
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
            const res = await fetch(url);
            const data = await res.json();
            const temp = data.current_weather.temperature;
            const codigo = data.current_weather.weathercode;
            const condicoes = {
                0: "Céu limpo", 1: "Principalmente limpo", 2: "Parcialmente nublado",
                3: "Nublado", 45: "Névoa", 48: "Névoa congelante",
                51: "Garoa leve", 61: "Chuva leve", 71: "Neve leve", 95: "Tempestade"
            };
            tempElement.textContent = `${temp.toFixed(1)}°C`;
            condElement.textContent = condicoes[codigo] || "Condição desconhecida";
        } catch (e) {
            condElement.textContent = "Erro ao carregar clima!";
        }
    }
    carregarClima();
    setInterval(carregarClima, 1800000);
}

const btnCalc = document.getElementById("calcularBtn");
const inputCidade = document.getElementById("cidadeInput");
if (btnCalc && inputCidade) {
    const resetarBtn = document.getElementById("resetarBtn");
    const resultadoDist = document.getElementById("resultado");
    const mapaLink = document.getElementById("mapaLink");
    const saoMiguel = { lat: -23.8793, lng: -47.9935 };

    async function pegarCoordenadas(cidade) {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cidade)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.length > 0) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        throw new Error("Cidade não encontrada");
    }

    function calcularDistancia(coord1, coord2) {
        const R = 6371;
        const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
        const dLon = ((coord2.lng - coord1.lng) * Math.PI) / 180;
        const a = Math.sin(dLat / 2) ** 2 + Math.cos((coord1.lat * Math.PI) / 180) * Math.cos((coord2.lat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    btnCalc.addEventListener("click", async () => {
        const cidade = inputCidade.value.trim();
        if (!cidade) return alert("Digite o nome da sua cidade!");
        try {
            const origem = await pegarCoordenadas(cidade);
            const distancia = calcularDistancia(origem, saoMiguel);
            if (resultadoDist) resultadoDist.textContent = `${distancia.toFixed(1)} km`;
            if (mapaLink) mapaLink.href = `https://www.google.com/maps/dir/?api=1&origin=${origem.lat},${origem.lng}&destination=${saoMiguel.lat},${saoMiguel.lng}`;
        } catch (e) {
            alert("Não consegui encontrar essa cidade! Tente novamente.");
        }
    });

    if (resetarBtn) {
        resetarBtn.addEventListener("click", () => {
            inputCidade.value = "";
            if (resultadoDist) resultadoDist.textContent = "0 km";
            if (mapaLink) mapaLink.href = "#";
        });
    }
}