document.addEventListener('DOMContentLoaded', () => {
  if (window.feather) window.feather.replace();

  const API_BASE = 'http://localhost:3001/api';

  const nomesPaginas = {
    home: 'Início (Home)',
    ecologico: 'Turismo Ecológico',
    religioso: 'Turismo Religioso',
    rural: 'Turismo Rural',
    gastronomia: 'Gastronomia',
    hotelaria: 'Hotelaria',
    telefones: 'Telefones Úteis',
    contato: 'Contato'
  };

  const params = new URLSearchParams(window.location.search);
  const paginaAtual = params.get('pagina') || 'home';
  const nomeAmigavel = nomesPaginas[paginaAtual] || paginaAtual.toUpperCase();

  document.getElementById('tituloPagina').textContent = `Editando: ${nomeAmigavel}`;
  document.getElementById('badgePaginaTexto').textContent = paginaAtual.toUpperCase();

  if (paginaAtual === 'home') {
    document.getElementById('tituloBlocoImagens').textContent = '2. Fotos do Carrossel (Início)';
  }

  const formTextos = document.getElementById('formTextos');
  const tituloTexto = document.getElementById('tituloTexto');
  const conteudoTexto = document.getElementById('conteudoTexto');

  const formImagens = document.getElementById('formImagens');
  const listaCamposImagens = document.getElementById('listaCamposImagens');
  const btnAddImagem = document.getElementById('btnAddImagem');

  function mostrarAlerta(mensagem) {
    const alertSuccess = document.getElementById('alertSuccess');
    document.getElementById('alertMessage').textContent = mensagem;
    alertSuccess.style.display = 'flex';
    setTimeout(() => { alertSuccess.style.display = 'none'; }, 4000);
  }

  function criarLinhaImagem(valor = '') {
    const linha = document.createElement('div');
    linha.style.display = 'flex';
    linha.style.gap = '8px';
    linha.style.alignItems = 'center';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'input-url-imagem';
    input.value = valor;
    input.placeholder = 'Ex: assets/img/carrossel1.jpg ou URL da imagem';
    input.style.flex = '1';

    const btnExcluir = document.createElement('button');
    btnExcluir.type = 'button';
    btnExcluir.className = 'btn-danger';
    btnExcluir.innerHTML = '<i data-feather="trash-2"></i> Excluir';
    btnExcluir.addEventListener('click', () => {
      linha.remove();
    });

    linha.appendChild(input);
    linha.appendChild(btnExcluir);
    listaCamposImagens.appendChild(linha);

    if (window.feather) window.feather.replace();
  }

  btnAddImagem.addEventListener('click', () => {
    criarLinhaImagem('');
  });

  async function carregarTextos() {
    try {
      const response = await fetch(`${API_BASE}/textos/${paginaAtual}`);
      if (!response.ok) return;
      const dados = await response.json();

      tituloTexto.value = dados.titulo || '';
      conteudoTexto.value = dados.historia || dados.conteudo || '';
    } catch (error) {
      console.error('Erro ao carregar textos:', error);
    }
  }

  async function carregarImagens() {
    listaCamposImagens.innerHTML = '';
    try {
      const response = await fetch(`${API_BASE}/imagens/${paginaAtual}`);
      if (!response.ok) {
        criarLinhaImagem('assets/img/img5.png');
        return;
      }

      const dados = await response.json();
      let urls = [];

      if (Array.isArray(dados)) {
        urls = dados;
      } else if (dados && typeof dados === 'object') {
        urls = Object.values(dados);
      }

      urls = urls.filter(u => typeof u === 'string' && u.trim() !== '');

      if (urls.length > 0) {
        urls.forEach(url => criarLinhaImagem(url));
      } else {
        criarLinhaImagem('assets/img/img5.png');
      }
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
      criarLinhaImagem('assets/img/img5.png');
    }
  }

  formTextos.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      titulo: tituloTexto.value.trim(),
      historia: conteudoTexto.value.trim()
    };

    try {
      const response = await fetch(`${API_BASE}/textos/${paginaAtual}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        mostrarAlerta(`Textos de "${nomeAmigavel}" salvos com sucesso!`);
      } else {
        alert('Erro ao salvar os textos.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão com o servidor Node.');
    }
  });

  formImagens.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputs = [...document.querySelectorAll('.input-url-imagem')];
    const urls = inputs
      .map(inp => inp.value.trim())
      .filter(url => url !== '');

    try {
      const response = await fetch(`${API_BASE}/imagens/${paginaAtual}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(urls)
      });

      if (response.ok) {
        mostrarAlerta(`Imagens de "${nomeAmigavel}" salvas com sucesso!`);
        carregarImagens();
      } else {
        alert('Erro ao salvar as imagens.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão com o servidor Node.');
    }
  });

  const usuario = localStorage.getItem('nomeUsuario') || 'Augusto';
  document.getElementById('nomeUser').textContent = usuario;
  document.getElementById('avatarInicial').textContent = usuario.charAt(0).toUpperCase();

  document.getElementById('btnLogout').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('nomeUsuario');
    window.location.href = 'login.html';
  });

  carregarTextos();
  carregarImagens();
});