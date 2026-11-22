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
  document.getElementById('badgePaginaImagem').textContent = paginaAtual.toUpperCase();

  const formTextos = document.getElementById('formTextos');
  const tituloTexto = document.getElementById('tituloTexto');
  const conteudoTexto = document.getElementById('conteudoTexto');

  const formImagens = document.getElementById('formImagens');
  const imagem1 = document.getElementById('imagem1');
  const imagem2 = document.getElementById('imagem2');
  const imagem3 = document.getElementById('imagem3');

  function mostrarAlerta(mensagem) {
    const alertSuccess = document.getElementById('alertSuccess');
    document.getElementById('alertMessage').textContent = mensagem;
    alertSuccess.style.display = 'flex';
    setTimeout(() => { alertSuccess.style.display = 'none'; }, 4000);
  }

  async function carregarTextos() {
    try {
      const response = await fetch(`${API_BASE}/textos/${paginaAtual}`);
      if (!response.ok) return;
      const dados = await response.json();

      tituloTexto.value = dados.titulo || '';
      conteudoTexto.value = dados.historia || dados.conteudo || dados.descricao || '';
    } catch (error) {
      console.error('Erro ao carregar textos:', error);
    }
  }

  async function carregarImagens() {
    try {
      const response = await fetch(`${API_BASE}/imagens/${paginaAtual}`);
      if (!response.ok) return;
      const dados = await response.json();

      imagem1.value = dados.imagem1 || '';
      imagem2.value = dados.imagem2 || '';
      imagem3.value = dados.imagem3 || '';
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
    }
  }

  formTextos.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      titulo: tituloTexto.value,
      historia: conteudoTexto.value,
      conteudo: conteudoTexto.value
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
        alert('Erro ao salvar os textos no servidor.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão com o servidor Node.');
    }
  });

  formImagens.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      imagem1: imagem1.value,
      imagem2: imagem2.value,
      imagem3: imagem3.value
    };

    try {
      const response = await fetch(`${API_BASE}/imagens/${paginaAtual}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        mostrarAlerta(`Imagens de "${nomeAmigavel}" salvas com sucesso!`);
      } else {
        alert('Erro ao salvar as imagens no servidor.');
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

  // Inicialização
  carregarTextos();
  carregarImagens();
});