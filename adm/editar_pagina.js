document.addEventListener('DOMContentLoaded', () => {
  if (window.feather) window.feather.replace();

  const API_BASE = 'http://localhost:3001/api';

  const IMAGENS_PADRAO_HOME = [
  'assets/img/img5.png',
  'assets/img/img2.png',
  'assets/img/img3.png',
  'assets/img/img4.png',
  'assets/img/img1.png',
  'assets/img/img6.jpg'
];

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
    linha.style.flexWrap = 'wrap';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'input-url-imagem';
    input.value = valor;
    input.placeholder = 'Escolha uma foto do dispositivo ou informe o caminho';
    input.style.flex = '1';
    input.style.minWidth = '220px';

    const inputArquivo = document.createElement('input');
    inputArquivo.type = 'file';
    inputArquivo.accept = 'image/*';
    inputArquivo.style.display = 'none';

    const btnUpload = document.createElement('button');
    btnUpload.type = 'button';
    btnUpload.className = 'btn-secondary';
    btnUpload.innerHTML = '<i data-feather="upload"></i> Escolher Foto';

    btnUpload.addEventListener('click', () => {
      inputArquivo.click();
    });

    inputArquivo.addEventListener('change', async () => {
      const arquivo = inputArquivo.files[0];
      if (!arquivo) return;

      const formData = new FormData();
      formData.append('imagem', arquivo);

      btnUpload.disabled = true;
      btnUpload.textContent = 'Enviando...';

      try {
        const resposta = await fetch(`${API_BASE}/upload`, {
          method: 'POST',
          body: formData
        });

        const dados = await resposta.json();
        if (resposta.ok && dados.url) {
          input.value = dados.url;
          mostrarAlerta('Foto enviada com sucesso! Clique em "Salvar Imagens" para confirmar.');
        } else {
          alert(dados.erro || 'Erro ao enviar a foto.');
        }
      } catch (erro) {
        console.error('Erro no upload:', erro);
        alert('Erro ao conectar com o servidor para enviar a foto.');
      } finally {
        btnUpload.disabled = false;
        btnUpload.innerHTML = '<i data-feather="upload"></i> Escolher Foto';
        if (window.feather) window.feather.replace();
      }
    });

    const btnExcluir = document.createElement('button');
    btnExcluir.type = 'button';
    btnExcluir.className = 'btn-danger';
    btnExcluir.innerHTML = '<i data-feather="trash-2"></i> Excluir';
    btnExcluir.addEventListener('click', () => {
      linha.remove();
    });

    linha.appendChild(input);
    linha.appendChild(inputArquivo);
    linha.appendChild(btnUpload);
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

  function carregarFallbackImagens() {
    if (paginaAtual === 'home') {
      IMAGENS_PADRAO_HOME.forEach(url => criarLinhaImagem(url));
    } else {
      criarLinhaImagem('');
    }
  }

  async function carregarImagens() {
    listaCamposImagens.innerHTML = '';
    try {
      const response = await fetch(`${API_BASE}/imagens/${paginaAtual}`);
      if (!response.ok) {
        carregarFallbackImagens();
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
        carregarFallbackImagens();
      }
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
      carregarFallbackImagens();
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