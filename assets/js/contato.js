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
const API_BASE = 'https://toursma.onrender.com/api';
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

    async function carregarConteudoContato() {
      try {
        const respTextos = await fetch(`${API_BASE}/textos/contato`);
        if (respTextos.ok) {
          const textos = await respTextos.json();
          const elTitulo = document.getElementById('contato-titulo-principal');
          const elSubtitulo = document.getElementById('contato-subtitulo-principal');
          const novoSubtitulo = textos.descricao || textos.historia || textos.conteudo;

          if (elTitulo && textos.titulo) elTitulo.textContent = textos.titulo;
          if (elSubtitulo && novoSubtitulo) elSubtitulo.textContent = novoSubtitulo;
        }
      } catch (e) {
        console.error('Erro ao carregar textos de contato:', e);
      }

      try {
        const respInfo = await fetch(`${API_BASE}/imagens/contato`);
        if (respInfo.ok) {
          const dados = await respInfo.json();
          const info = Array.isArray(dados) ? dados[0] : dados;

          if (info && typeof info === 'object') {
            const elTitulo2 = document.getElementById('contato-titulo-secundario');
            const elSubtitulo2 = document.getElementById('contato-subtitulo-secundario');
            const elTelefone = document.getElementById('contato-telefone');
            const elEmail = document.getElementById('contato-email');
            const elEndereco = document.getElementById('contato-endereco');
            const elFacebook = document.getElementById('contato-link-facebook');
            const elInstagram = document.getElementById('contato-link-instagram');

            if (elTitulo2 && info.titulo2) elTitulo2.textContent = info.titulo2;
            if (elSubtitulo2 && info.subtitulo2) elSubtitulo2.textContent = info.subtitulo2;
            if (elTelefone && info.telefone) elTelefone.textContent = info.telefone;
            if (elEmail && info.email) elEmail.textContent = info.email;
            if (elEndereco && info.endereco) elEndereco.textContent = info.endereco;
            if (elFacebook && info.facebook) elFacebook.href = info.facebook;
            if (elInstagram && info.instagram) elInstagram.href = info.instagram;
          }
        }
      } catch (e) {
        console.error('Erro ao carregar informações de contato:', e);
      }
    }

    carregarConteudoContato();

    const contactForm = document.querySelector('form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); 
        
        const btnEnviar = contactForm.querySelector('button[type="submit"]');
        const textoOriginal = btnEnviar ? btnEnviar.textContent : "Enviar Mensagem";
        
        if (btnEnviar) {
          btnEnviar.textContent = "Enviando...";
          btnEnviar.disabled = true;
        }

        const formData = new FormData(contactForm);

        const emailDestino = "sthefanygsa@gmail.com"; 

        fetch(`https://formsubmit.co/ajax/${emailDestino}`, {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.success === "true" || data.success === true) {
            alert("Mensagem enviada com sucesso!");
            contactForm.reset(); 
          } else {
            alert("Ops! Ocorreu um problema no servidor de envio.");
          }
        })
        .catch(error => {
          console.error("Erro no envio:", error);
          alert("Erro de conexão ao tentar enviar a mensagem.");
        })
        .finally(() => {
          if (btnEnviar) {
            btnEnviar.textContent = textoOriginal;
            btnEnviar.disabled = false;
          }
        });
      });
    }
  });
})();