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

  const CARDS_PADRAO_ECOLOGICO = [
    {
      imagem: 'assets/img/parque1.png',
      tipo: 'Gratuito',
      titulo: 'Parque Estadual Carlos Botelho',
      descricaoCurta: 'Uma das maiores reservas da Mata Atlântica, com lindas trilhas e cachoeiras naturais.',
      descricaoLonga: 'Uma descrição mais longa sobre o parque, seus recursos naturais e o ambiente. Perfeito para uma saída em família.',
      endereco: 'Rua Principal, 123',
      horario: 'Ter - Dom: 11h às 22h',
      telefone: '(15) 99999-1111'
    },
    {
      imagem: 'assets/img/cachoeira1.png',
      tipo: 'Pago',
      titulo: 'Cachoeira do Arcanjo',
      descricaoCurta: 'Uma das cachoeiras mais belas da região, ideal para um dia de descanso na natureza.',
      descricaoLonga: 'Uma descrição mais longa sobre a cachoeira, seus recursos naturais e o ambiente. Perfeito para uma saída em família.',
      endereco: 'Av. Central, 456',
      horario: 'Seg - Sáb: 08h às 20h',
      telefone: '(15) 99999-2222'
    },
    {
      imagem: 'assets/img/trilha1.png',
      tipo: 'Gratuito',
      titulo: 'Trilha do Mirante da Serra',
      descricaoCurta: 'Uma trilha desafiadora com vistas panorâmicas sobre a serra.',
      descricaoLonga: 'Uma descrição mais longa sobre a trilha, seus pontos de interesse e o ambiente. Perfeito para uma saída em família.',
      endereco: 'Praça da Matriz, 78',
      horario: 'Seg - Dom: 06h às 19h',
      telefone: '(15) 99999-3333'
    },
    {
      imagem: 'assets/img/cachoeira2.png',
      tipo: 'Gratuito',
      titulo: 'Cachoeira Cristalina',
      descricaoCurta: 'Uma cachoeira paradisíaca.',
      descricaoLonga: 'Uma descrição mais longa sobre a cachoeira, seus pontos de interesse e o ambiente. Perfeito para uma saída em família.',
      endereco: 'Rua do Comércio, 90',
      horario: 'Seg - Sex: 07h às 18h',
      telefone: '(15) 99999-4444'
    },
    {
      imagem: 'assets/img/parque2.png',
      tipo: 'Pago',
      titulo: 'Parque da Onça',
      descricaoCurta: 'Um parque natural com trilhas e pontos de vista.',
      descricaoLonga: 'Uma descrição mais longa sobre o parque, seus pontos de interesse e o ambiente. Perfeito para uma saída em família.',
      endereco: 'Rua das Flores, 321',
      horario: 'Qua - Dom: 18h às 23h',
      telefone: '(15) 99999-5555'
    }
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

  const paginasComCards = ['ecologico', 'religioso', 'rural'];

  const params = new URLSearchParams(window.location.search);
  const paginaAtual = params.get('pagina') || 'home';
  const ehPaginaComCards = paginasComCards.includes(paginaAtual);
  const nomeAmigavel = nomesPaginas[paginaAtual] || paginaAtual.toUpperCase();

  document.getElementById('tituloPagina').textContent = `Editando: ${nomeAmigavel}`;
  document.getElementById('badgePaginaTexto').textContent = paginaAtual.toUpperCase();

  const tituloBlocoImagens = document.getElementById('tituloBlocoImagens');
  const btnAddImagem = document.getElementById('btnAddImagem');
  const formImagens = document.getElementById('formImagens');
  const btnSalvarImagens = formImagens.querySelector('button[type="submit"]');

  if (paginaAtual === 'home') {
    tituloBlocoImagens.textContent = '2. Fotos do Carrossel (Início)';
  } else if (ehPaginaComCards) {
    tituloBlocoImagens.textContent = '2. Cards da Página';
    btnAddImagem.innerHTML = '<i data-feather="plus"></i> Adicionar Card';
    btnSalvarImagens.innerHTML = '<i data-feather="save"></i> Salvar Cards';
  }

  const formTextos = document.getElementById('formTextos');
  const tituloTexto = document.getElementById('tituloTexto');
  const conteudoTexto = document.getElementById('conteudoTexto');
  const listaCamposImagens = document.getElementById('listaCamposImagens');

  function mostrarAlerta(mensagem) {
    const alertSuccess = document.getElementById('alertSuccess');
    document.getElementById('alertMessage').textContent = mensagem;
    alertSuccess.style.display = 'flex';
    setTimeout(() => { alertSuccess.style.display = 'none'; }, 4000);
  }

  async function fazerUploadImagem(arquivo, botao, campoDestino) {
    const formData = new FormData();
    formData.append('imagem', arquivo);

    const textoOriginalBotao = botao.innerHTML;
    botao.disabled = true;
    botao.textContent = 'Enviando...';

    try {
      const resposta = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData
      });

      const dados = await resposta.json();
      if (resposta.ok && dados.url) {
        campoDestino.value = dados.url;
        mostrarAlerta(
          ehPaginaComCards
            ? 'Foto enviada com sucesso! Clique em "Salvar Cards" para confirmar.'
            : 'Foto enviada com sucesso! Clique em "Salvar Imagens" para confirmar.'
        );
      } else {
        alert(dados.erro || 'Erro ao enviar a foto.');
      }
    } catch (erro) {
      console.error('Erro no upload:', erro);
      alert('Erro ao conectar com o servidor para enviar a foto.');
    } finally {
      botao.disabled = false;
      botao.innerHTML = textoOriginalBotao;
      if (window.feather) window.feather.replace();
    }
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

    btnUpload.addEventListener('click', () => inputArquivo.click());
    inputArquivo.addEventListener('change', () => {
      const arquivo = inputArquivo.files[0];
      if (arquivo) fazerUploadImagem(arquivo, btnUpload, input);
    });

    const btnExcluir = document.createElement('button');
    btnExcluir.type = 'button';
    btnExcluir.className = 'btn-danger';
    btnExcluir.innerHTML = '<i data-feather="trash-2"></i> Excluir';
    btnExcluir.addEventListener('click', () => linha.remove());

    linha.appendChild(input);
    linha.appendChild(inputArquivo);
    linha.appendChild(btnUpload);
    linha.appendChild(btnExcluir);
    listaCamposImagens.appendChild(linha);

    if (window.feather) window.feather.replace();
  }

  function criarBlocoCard(card = {}) {
    const box = document.createElement('div');
    box.className = 'card-editor-item';
    box.style.cssText = 'border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; display: flex; flex-direction: column; gap: 12px; background: #fafafa;';

    const topo = document.createElement('div');
    topo.style.cssText = 'display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;';

    const tituloBloco = document.createElement('strong');
    tituloBloco.textContent = card.titulo || 'Novo Card';
    tituloBloco.style.fontSize = '15px';

    const btnExcluir = document.createElement('button');
    btnExcluir.type = 'button';
    btnExcluir.className = 'btn-danger';
    btnExcluir.innerHTML = '<i data-feather="trash-2"></i> Excluir Card';
    btnExcluir.addEventListener('click', () => box.remove());

    topo.appendChild(tituloBloco);
    topo.appendChild(btnExcluir);

    const linhaImagem = document.createElement('div');
    linhaImagem.style.cssText = 'display: flex; gap: 8px; align-items: center; flex-wrap: wrap;';

    const inputImagem = document.createElement('input');
    inputImagem.type = 'text';
    inputImagem.className = 'card-campo-imagem';
    inputImagem.value = card.imagem || '';
    inputImagem.placeholder = 'Caminho ou URL da imagem (ex: assets/img/parque1.png)';
    inputImagem.style.cssText = 'flex: 1; min-width: 220px;';

    const inputArquivo = document.createElement('input');
    inputArquivo.type = 'file';
    inputArquivo.accept = 'image/*';
    inputArquivo.style.display = 'none';

    const btnUpload = document.createElement('button');
    btnUpload.type = 'button';
    btnUpload.className = 'btn-secondary';
    btnUpload.innerHTML = '<i data-feather="upload"></i> Escolher Foto';
    btnUpload.addEventListener('click', () => inputArquivo.click());
    inputArquivo.addEventListener('change', () => {
      const arquivo = inputArquivo.files[0];
      if (arquivo) fazerUploadImagem(arquivo, btnUpload, inputImagem);
    });

    linhaImagem.appendChild(inputImagem);
    linhaImagem.appendChild(inputArquivo);
    linhaImagem.appendChild(btnUpload);

    const linhaTipoTitulo = document.createElement('div');
    linhaTipoTitulo.style.cssText = 'display: flex; gap: 8px; flex-wrap: wrap;';

    const selectTipo = document.createElement('select');
    selectTipo.className = 'card-campo-tipo';
    selectTipo.style.cssText = 'padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px; background: #fff;';
    ['Gratuito', 'Pago'].forEach(opcao => {
      const opt = document.createElement('option');
      opt.value = opcao;
      opt.textContent = opcao;
      if ((card.tipo || 'Gratuito').toLowerCase().startsWith(opcao.toLowerCase().slice(0, 3))) {
        opt.selected = true;
      }
      selectTipo.appendChild(opt);
    });

    const inputTitulo = document.createElement('input');
    inputTitulo.type = 'text';
    inputTitulo.className = 'card-campo-titulo';
    inputTitulo.value = card.titulo || '';
    inputTitulo.placeholder = 'Título do card (ex: Parque Estadual Carlos Botelho)';
    inputTitulo.style.cssText = 'flex: 1; min-width: 220px;';
    inputTitulo.addEventListener('input', () => {
      tituloBloco.textContent = inputTitulo.value.trim() || 'Novo Card';
    });

    linhaTipoTitulo.appendChild(selectTipo);
    linhaTipoTitulo.appendChild(inputTitulo);

    const inputDescCurta = document.createElement('input');
    inputDescCurta.type = 'text';
    inputDescCurta.className = 'card-campo-desc-curta';
    inputDescCurta.value = card.descricaoCurta || '';
    inputDescCurta.placeholder = 'Breve descrição (aparece no card)';

    const textareaDescLonga = document.createElement('textarea');
    textareaDescLonga.className = 'card-campo-desc-longa';
    textareaDescLonga.rows = 3;
    textareaDescLonga.value = card.descricaoLonga || '';
    textareaDescLonga.placeholder = 'Descrição maior (aparece ao clicar em Saiba mais)';

    const linhaDetalhes = document.createElement('div');
    linhaDetalhes.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px;';

    const inputEndereco = document.createElement('input');
    inputEndereco.type = 'text';
    inputEndereco.className = 'card-campo-endereco';
    inputEndereco.value = card.endereco || '';
    inputEndereco.placeholder = 'Endereço (ex: Rua Principal, 123)';

    const inputHorario = document.createElement('input');
    inputHorario.type = 'text';
    inputHorario.className = 'card-campo-horario';
    inputHorario.value = card.horario || '';
    inputHorario.placeholder = 'Horário (ex: Ter - Dom: 11h às 22h)';

    const inputTelefone = document.createElement('input');
    inputTelefone.type = 'text';
    inputTelefone.className = 'card-campo-telefone';
    inputTelefone.value = card.telefone || '';
    inputTelefone.placeholder = 'Telefone (ex: (15) 99999-1111)';

    linhaDetalhes.appendChild(inputEndereco);
    linhaDetalhes.appendChild(inputHorario);
    linhaDetalhes.appendChild(inputTelefone);

    box.appendChild(topo);
    box.appendChild(linhaImagem);
    box.appendChild(linhaTipoTitulo);
    box.appendChild(inputDescCurta);
    box.appendChild(textareaDescLonga);
    box.appendChild(linhaDetalhes);

    listaCamposImagens.appendChild(box);
    if (window.feather) window.feather.replace();
  }

  btnAddImagem.addEventListener('click', () => {
    if (ehPaginaComCards) {
      criarBlocoCard({ tipo: 'Gratuito' });
    } else {
      criarLinhaImagem('');
    }
  });

  async function carregarTextos() {
    try {
      const response = await fetch(`${API_BASE}/textos/${paginaAtual}`);
      if (!response.ok) return;
      const dados = await response.json();

      tituloTexto.value = dados.titulo || '';
      conteudoTexto.value = dados.descricao || dados.historia || dados.conteudo || '';
    } catch (error) {
      console.error('Erro ao carregar textos:', error);
    }
  }

  function carregarFallbackImagens() {
    if (paginaAtual === 'home') {
      IMAGENS_PADRAO_HOME.forEach(url => criarLinhaImagem(url));
    } else if (paginaAtual === 'ecologico') {
      CARDS_PADRAO_ECOLOGICO.forEach(card => criarBlocoCard(card));
    } else if (ehPaginaComCards) {
      criarBlocoCard({ tipo: 'Gratuito' });
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

      if (ehPaginaComCards) {
        const cards = Array.isArray(dados) ? dados.filter(item => item && typeof item === 'object') : [];
        if (cards.length > 0) {
          cards.forEach(card => criarBlocoCard(card));
        } else {
          carregarFallbackImagens();
        }
        return;
      }

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
    const payload = ehPaginaComCards
      ? {
          titulo: tituloTexto.value.trim(),
          descricao: conteudoTexto.value.trim()
        }
      : {
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

    let payload;
    if (ehPaginaComCards) {
      const blocos = [...document.querySelectorAll('.card-editor-item')];
      payload = blocos
        .map(box => ({
          imagem: box.querySelector('.card-campo-imagem').value.trim(),
          tipo: box.querySelector('.card-campo-tipo').value,
          titulo: box.querySelector('.card-campo-titulo').value.trim(),
          descricaoCurta: box.querySelector('.card-campo-desc-curta').value.trim(),
          descricaoLonga: box.querySelector('.card-campo-desc-longa').value.trim(),
          endereco: box.querySelector('.card-campo-endereco').value.trim(),
          horario: box.querySelector('.card-campo-horario').value.trim(),
          telefone: box.querySelector('.card-campo-telefone').value.trim()
        }))
        .filter(c => c.titulo !== '' || c.imagem !== '');
    } else {
      const inputs = [...document.querySelectorAll('.input-url-imagem')];
      payload = inputs
        .map(inp => inp.value.trim())
        .filter(url => url !== '');
    }

    try {
      const response = await fetch(`${API_BASE}/imagens/${paginaAtual}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        mostrarAlerta(
          ehPaginaComCards
            ? `Cards de "${nomeAmigavel}" salvos com sucesso!`
            : `Imagens de "${nomeAmigavel}" salvas com sucesso!`
        );
        carregarImagens();
      } else {
        alert(ehPaginaComCards ? 'Erro ao salvar os cards.' : 'Erro ao salvar as imagens.');
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

function carregarFallbackImagens() {
    if (paginaAtual === 'home') {
      IMAGENS_PADRAO_HOME.forEach(url => criarLinhaImagem(url));
    } else if (paginaAtual === 'ecologico') {
      CARDS_PADRAO_ECOLOGICO.forEach(card => criarBlocoCard(card));
    } else if (paginaAtual === 'religioso') {
      CARDS_PADRAO_RELIGIOSO.forEach(card => criarBlocoCard(card));
    } else if (ehPaginaComCards) {
      criarBlocoCard({ tipo: 'Gratuito' });
    } else {
      criarLinhaImagem('');
    }
  }