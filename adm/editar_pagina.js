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

  const CARDS_PADRAO_RELIGIOSO = [
    {
      imagem: 'assets/img/basilica.png',
      tipo: 'Gratuito',
      titulo: 'Basílica de São Miguel Arcanjo',
      descricaoCurta: 'Uma das mais importantes basílicas da região. Dedicada ao Arcanjo Miguel.',
      descricaoLonga: 'Uma descrição mais longa sobre a basílica, seus artefatos e a história religiosa. Perfeito para uma visita cultural e espiritual.',
      endereco: 'Rua Principal, 123',
      horario: 'Ter - Dom: 11h às 22h',
      telefone: '(15) 99999-1111'
    },
    {
      imagem: 'assets/img/aparicao.png',
      tipo: 'Pago',
      titulo: 'Aparição de São Miguel Arcanjo',
      descricaoCurta: 'Uma das mais importantes aparições religiosas da região.',
      descricaoLonga: 'Uma descrição mais longa sobre a aparição, seus significados e a história religiosa. Perfeito para uma visita cultural e espiritual.',
      endereco: 'Av. Central, 456',
      horario: 'Seg - Sáb: 08h às 20h',
      telefone: '(15) 99999-2222'
    },
    {
      imagem: 'assets/img/gruta.png',
      tipo: 'Gratuito',
      titulo: 'Construção da Gruta do Arcanjo',
      descricaoCurta: 'Uma das mais importantes construções religiosas da região.',
      descricaoLonga: 'Uma descrição mais longa sobre a gruta, seus artefatos e a história religiosa. Perfeito para uma visita cultural e espiritual.',
      endereco: 'Praça da Matriz, 78',
      horario: 'Seg - Dom: 06h às 19h',
      telefone: '(15) 99999-3333'
    },
    {
      imagem: 'assets/img/capela.png',
      tipo: 'Gratuito',
      titulo: 'Capela do Arcanjo',
      descricaoCurta: 'Uma das mais importantes capelas da região.',
      descricaoLonga: 'Uma descrição mais longa sobre a capela, seus artefatos e a história religiosa. Perfeito para uma visita cultural e espiritual.',
      endereco: 'Rua do Comércio, 90',
      horario: 'Seg - Sex: 07h às 18h',
      telefone: '(15) 99999-4444'
    },
    {
      imagem: 'assets/img/velario.png',
      tipo: 'Pago',
      titulo: 'Velário',
      descricaoCurta: 'Um local de culto com significado religioso e histórico.',
      descricaoLonga: 'Uma descrição mais longa sobre o velário, seus artefatos e a história religiosa. Perfeito para uma visita cultural e espiritual.',
      endereco: 'Rua das Flores, 321',
      horario: 'Qua - Dom: 18h às 23h',
      telefone: '(15) 99999-5555'
    }
  ];

  const CARDS_PADRAO_RURAL = [
    {
      imagem: 'assets/img/vinicola.png',
      tipo: 'Gratuito',
      titulo: 'Vinícola Arcanjo Miguel',
      descricaoCurta: 'Uma vinícola tradicional.',
      descricaoLonga: 'Uma descrição mais longa sobre a vinícola, seus artefatos e a história da produção de vinhos. Perfeito para uma visita cultural e espiritual.',
      endereco: 'Rua Principal, 123',
      horario: 'Ter - Dom: 11h às 22h',
      telefone: '(15) 99999-1111'
    },
    {
      imagem: 'assets/img/fazenda.png',
      tipo: 'Pago',
      titulo: 'Fazenda Olíva',
      descricaoCurta: 'Uma das mais importantes fazendas da região.',
      descricaoLonga: 'Uma descrição mais longa sobre a fazenda, seus artefatos e a história rural. Perfeito para uma visita cultural e espiritual.',
      endereco: 'Av. Central, 456',
      horario: 'Seg - Sáb: 08h às 20h',
      telefone: '(15) 99999-2222'
    },
    {
      imagem: 'assets/img/plantacao.png',
      tipo: 'Gratuito',
      titulo: 'Plantação de Morangos',
      descricaoCurta: 'Uma das mais importantes plantações da região.',
      descricaoLonga: 'Uma descrição mais longa sobre a plantação, seus artefatos e a história rural. Perfeito para uma visita cultural e espiritual.',
      endereco: 'Praça da Matriz, 78',
      horario: 'Seg - Dom: 06h às 19h',
      telefone: '(15) 99999-3333'
    },
    {
      imagem: 'assets/img/cafetal.png',
      tipo: 'Gratuito',
      titulo: 'Cafetal da Serra',
      descricaoCurta: 'Uma das mais importantes fazendas de café da região.',
      descricaoLonga: 'Uma descrição mais longa sobre o cafetal, seus artefatos e a história rural. Perfeito para uma visita cultural e espiritual.',
      endereco: 'Rua do Comércio, 90',
      horario: 'Seg - Sex: 07h às 18h',
      telefone: '(15) 99999-4444'
    },
    {
      imagem: 'assets/img/queijaria.png',
      tipo: 'Pago',
      titulo: 'Queijaria Sabor do Campo',
      descricaoCurta: 'Uma das mais importantes queijarias da região.',
      descricaoLonga: 'Uma descrição mais longa sobre a queijaria, seus artefatos e a história rural. Perfeito para uma visita cultural e espiritual.',
      endereco: 'Rua das Flores, 321',
      horario: 'Qua - Dom: 18h às 23h',
      telefone: '(15) 99999-5555'
    }
  ];

  const CARDS_PADRAO_HOTELARIA = [
    {
      imagem: 'assets/img/pousada_serra_azul.png',
      tipo: 'Zona Rural',
      titulo: 'Pousada Serra Azul',
      descricaoCurta: 'Aconchego e tranquilidade com vista panorâmica das montanhas.',
      descricaoLonga: 'Uma descrição mais longa sobre a pousada, seus comodidades e o ambiente. Perfeito para um almoço em família.',
      endereco: 'Rua Principal, 123',
      horario: 'Ter - Dom: 11h às 22h',
      telefone: '(15) 99999-1111'
    },
    {
      imagem: 'assets/img/hotel_central_garden.png',
      tipo: 'Zona Urbana',
      titulo: 'Hotel Central Garden',
      descricaoCurta: 'No coração da cidade, ideal para quem busca conforto e praticidade.',
      descricaoLonga: 'Uma descrição mais longa sobre a pousada, seus comodidades e o ambiente. Perfeito para um almoço em família.',
      endereco: 'Av. Central, 456',
      horario: 'Seg - Sáb: 08h às 20h',
      telefone: '(15) 99999-2222'
    },
    {
      imagem: 'assets/img/chacara_recanto_do_vinho.png',
      tipo: 'Zona Rural',
      titulo: 'Chácara Recanto do Vinho',
      descricaoCurta: 'Aconchego e tranquilidade com vista panorâmica das montanhas.',
      descricaoLonga: 'Uma descrição mais longa sobre a pousada, seus comodidades e o ambiente. Perfeito para um almoço em família.',
      endereco: 'Praça da Matriz, 78',
      horario: 'Seg - Dom: 06h às 19h',
      telefone: '(15) 99999-3333'
    },
    {
      imagem: 'assets/img/casa_de_hospedes.png',
      tipo: 'Zona Urbana',
      titulo: 'Casa de Hóspedes',
      descricaoCurta: 'Aconchego e tranquilidade com vista panorâmica da cidade.',
      descricaoLonga: 'Uma descrição mais longa sobre a pousada, seus comodidades e o ambiente. Perfeito para um almoço em família.',
      endereco: 'Rua do Comércio, 90',
      horario: 'Seg - Sex: 07h às 18h',
      telefone: '(15) 99999-4444'
    },
    {
      imagem: 'assets/img/hotel_arcanjo.png',
      tipo: 'Zona Urbana',
      titulo: 'Hotel Arcanjo',
      descricaoCurta: 'Aconchego e tranquilidade com vista panorâmica da Gruta do Arcanjo',
      descricaoLonga: 'Uma descrição mais longa sobre a pousada, seus comodidades e o ambiente. Perfeito para um almoço em família.',
      endereco: 'Rua das Flores, 321',
      horario: 'Qua - Dom: 18h às 23h',
      telefone: '(15) 99999-5555'
    }
  ];

  const CARDS_PADRAO_GASTRONOMIA = [
    {
      imagem: 'assets/img/restaurante.jpg',
      tipo: 'Restaurante',
      titulo: 'Restaurante Sabor da Terra',
      descricaoCurta: 'Culinária típica regional',
      descricaoLonga: 'Uma descrição mais longa sobre o restaurante, seus pratos principais e o ambiente. Perfeito para um almoço em família.',
      endereco: 'Rua Principal, 123',
      horario: 'Ter - Dom: 11h às 22h',
      telefone: '(15) 99999-1111'
    },
    {
      imagem: 'assets/img/lanchonete.jpg',
      tipo: 'Lanchonete',
      titulo: 'Lanchonete do Zé',
      descricaoCurta: 'Lanches rápidos e saborosos',
      descricaoLonga: 'Famosa pelos seus hambúrgueres artesanais e porções generosas. Ambiente descontraído.',
      endereco: 'Av. Central, 456',
      horario: 'Seg - Sáb: 08h às 20h',
      telefone: '(15) 99999-2222'
    },
    {
      imagem: 'assets/img/padaria.jpg',
      tipo: 'Padaria',
      titulo: 'Padaria Pão Quente',
      descricaoCurta: 'Pães frescos e café da manhã',
      descricaoLonga: 'Além do pão francês sempre quentinho, serve um buffet de café da manhã completo nos finais de semana.',
      endereco: 'Praça da Matriz, 78',
      horario: 'Seg - Dom: 06h às 19h',
      telefone: '(15) 99999-3333'
    },
    {
      imagem: 'assets/img/mercado.jpg',
      tipo: 'Mercado',
      titulo: 'Mercado Central',
      descricaoCurta: 'Produtos frescos e locais',
      descricaoLonga: 'Aqui você encontra frutas, verduras e legumes direto do produtor, além de queijos e embutidos artesanais da região.',
      endereco: 'Rua do Comércio, 90',
      horario: 'Seg - Sex: 07h às 18h',
      telefone: '(15) 99999-4444'
    },
    {
      imagem: 'assets/img/pizzaria.jpg',
      tipo: 'Restaurante',
      titulo: 'Pizzaria Forno a Lenha',
      descricaoCurta: 'As melhores pizzas da cidade',
      descricaoLonga: 'Pizzas com massa de fermentação natural e ingredientes selecionados. Opções veganas disponíveis.',
      endereco: 'Rua das Flores, 321',
      horario: 'Qua - Dom: 18h às 23h',
      telefone: '(15) 99999-5555'
    }
  ];

  const CARDS_PADRAO_AGENDA = [
    {
      imagem: 'assets/img/festadauva.png',
      tipo: 'Gratuito',
      titulo: 'Festa da Uva',
      descricaoCurta: 'Uma festa em comemoração à colheita da uva, com música, comida e bebida.',
      descricaoLonga: 'Uma descrição mais longa sobre a festa, seus eventos e atrações. Perfeito para uma saída em família.',
      endereco: 'Rua Principal, 123',
      horario: 'Ter - Dom: 11h às 22h',
      telefone: '(15) 99999-1111'
    },
    {
      imagem: 'assets/img/festivaldeinverno.png',
      tipo: 'Pago',
      titulo: 'Festival de Inverno',
      descricaoCurta: 'Uma festa em comemoração à colheita da uva, com música, comida e bebida.',
      descricaoLonga: 'Uma descrição mais longa sobre o festival, seus eventos e atrações. Perfeito para uma saída em família.',
      endereco: 'Av. Central, 456',
      horario: 'Seg - Sáb: 08h às 20h',
      telefone: '(15) 99999-2222'
    },
    {
      imagem: 'assets/img/cultural.png',
      tipo: 'Gratuito',
      titulo: 'Semana Cultural',
      descricaoCurta: 'Uma semana de eventos culturais, com apresentações de teatro, música e artes plásticas.',
      descricaoLonga: 'Uma descrição mais longa sobre a semana cultural, seus eventos e atrações. Perfeito para uma saída em família.',
      endereco: 'Praça da Matriz, 78',
      horario: 'Seg - Dom: 06h às 19h',
      telefone: '(15) 99999-3333'
    }
  ];

  const EVENTOS_PADRAO_CALENDARIO = {
    '2026-07-04': [
      {
        title: 'Exposição de Fotografia',
        location: 'Museu Histórico',
        time: '10:00 - 18:00',
        description: 'Mostra "Olhares de São Miguel", com fotos da natureza local.'
      }
    ],
    '2026-07-05': [
      {
        title: 'Concerto na Praça Matriz',
        location: 'Praça Matriz, Centro',
        time: '19:00 - 21:00',
        description: 'Aproveite uma noite agradável com música ao vivo da orquestra local, apresentando clássicos da música brasileira.'
      },
      {
        title: 'Feira de Artesanato Local',
        location: 'Ginásio Municipal de Esportes',
        time: '09:00 - 17:00',
        description: 'Descubra o talento dos artesãos da nossa cidade e encontre peças únicas para decorar sua casa ou presentear.'
      }
    ],
    '2026-07-11': [
      {
        title: 'Festival Gastronômico',
        location: 'Parque de Exposições',
        time: '18:00 - 23:00',
        description: 'Sabores da terra: experimente pratos típicos da culinária tropeira.'
      }
    ],
    '2026-07-25': [
      {
        title: 'Caminhada Ecológica',
        location: 'Trilha do Mirante',
        time: '08:00 - 12:00',
        description: 'Passeio guiado pela mata atlântica, com vista panorâmica da cidade.'
      }
    ]
  };

  const nomesPaginas = {
    home: 'Início (Home)',
    ecologico: 'Turismo Ecológico',
    religioso: 'Turismo Religioso',
    rural: 'Turismo Rural',
    gastronomia: 'Gastronomia',
    hotelaria: 'Hotelaria',
    agenda: 'Agenda',
    telefones: 'Telefones Úteis',
    contato: 'Contato'
  };

  const paginasComCards = ['ecologico', 'religioso', 'rural', 'hotelaria', 'gastronomia', 'agenda'];

  const params = new URLSearchParams(window.location.search);
  const paginaAtual = params.get('pagina') || 'home';
  const ehPaginaComCards = paginasComCards.includes(paginaAtual);
  const ehAgenda = paginaAtual === 'agenda';
  const nomeAmigavel = nomesPaginas[paginaAtual] || paginaAtual.toUpperCase();

  function obterOpcoesTipoPagina() {
    if (paginaAtual === 'hotelaria') return ['Zona Urbana', 'Zona Rural'];
    if (paginaAtual === 'gastronomia') return ['Restaurante', 'Lanchonete', 'Padaria', 'Mercado'];
    return ['Gratuito', 'Pago'];
  }

  document.getElementById('tituloPagina').textContent = `Editando: ${nomeAmigavel}`;
  document.getElementById('badgePaginaTexto').textContent = paginaAtual.toUpperCase();

  const tituloBlocoImagens = document.getElementById('tituloBlocoImagens');
  const btnAddImagem = document.getElementById('btnAddImagem');
  const formImagens = document.getElementById('formImagens');
  const btnSalvarImagens = formImagens.querySelector('button[type="submit"]');

  const formTextos = document.getElementById('formTextos');
  const blocoCardTextos = formTextos.closest('.card');
  const tituloTexto = document.getElementById('tituloTexto');
  const conteudoTexto = document.getElementById('conteudoTexto');
  const listaCamposImagens = document.getElementById('listaCamposImagens');

  const blocoAgendaCalendario = document.getElementById('blocoAgendaCalendario');
  const dataEventoAgenda = document.getElementById('dataEventoAgenda');
  const btnAddEventoAgenda = document.getElementById('btnAddEventoAgenda');
  const listaEventosAgenda = document.getElementById('listaEventosAgenda');
  const btnSalvarEventosAgenda = document.getElementById('btnSalvarEventosAgenda');

  if (ehAgenda && blocoCardTextos) {
    blocoCardTextos.style.display = 'none';
  }

  if (paginaAtual === 'home') {
    tituloBlocoImagens.textContent = '2. Fotos do Carrossel (Início)';
  } else if (ehAgenda) {
    tituloBlocoImagens.textContent = '2. Destaques do Mês (Carrossel Lateral)';
    btnAddImagem.innerHTML = '<i data-feather="plus"></i> Adicionar Destaque';
    btnSalvarImagens.innerHTML = '<i data-feather="save"></i> Salvar Destaques';
    listaCamposImagens.style.display = 'grid';
    listaCamposImagens.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    listaCamposImagens.style.gap = '16px';
    listaCamposImagens.style.alignItems = 'start';
    if (blocoAgendaCalendario) blocoAgendaCalendario.style.display = 'block';
  } else if (ehPaginaComCards) {
    tituloBlocoImagens.textContent = '2. Cards da Página';
    btnAddImagem.innerHTML = '<i data-feather="plus"></i> Adicionar Card';
    btnSalvarImagens.innerHTML = '<i data-feather="save"></i> Salvar Cards';
  }

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
    inputImagem.style.cssText = 'flex: 1; min-width: 180px;';

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
    const opcoesTipo = obterOpcoesTipoPagina();
    const valorInicialTipo = card.tipo || opcoesTipo[0];

    opcoesTipo.forEach(opcao => {
      const opt = document.createElement('option');
      opt.value = opcao;
      opt.textContent = opcao;
      if (valorInicialTipo.toLowerCase() === opcao.toLowerCase()) {
        opt.selected = true;
      }
      selectTipo.appendChild(opt);
    });

    const inputTitulo = document.createElement('input');
    inputTitulo.type = 'text';
    inputTitulo.className = 'card-campo-titulo';
    inputTitulo.value = card.titulo || '';
    inputTitulo.placeholder = 'Título do card';
    inputTitulo.style.cssText = 'flex: 1; min-width: 180px;';
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
    linhaDetalhes.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px;';

    const inputEndereco = document.createElement('input');
    inputEndereco.type = 'text';
    inputEndereco.className = 'card-campo-endereco';
    inputEndereco.value = card.endereco || '';
    inputEndereco.placeholder = 'Endereço';

    const inputHorario = document.createElement('input');
    inputHorario.type = 'text';
    inputHorario.className = 'card-campo-horario';
    inputHorario.value = card.horario || '';
    inputHorario.placeholder = 'Horário';

    const inputTelefone = document.createElement('input');
    inputTelefone.type = 'text';
    inputTelefone.className = 'card-campo-telefone';
    inputTelefone.value = card.telefone || '';
    inputTelefone.placeholder = 'Telefone';

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
      criarBlocoCard({ tipo: obterOpcoesTipoPagina()[0] });
    } else {
      criarLinhaImagem('');
    }
  });

  // Gerenciamento de Eventos do Calendário (modo agenda)
  let eventosCalendarioMapa = { ...EVENTOS_PADRAO_CALENDARIO };

  function criarBlocoEventoCalendario(evento = {}) {
    const box = document.createElement('div');
    box.className = 'evento-calendario-item';
    box.style.cssText = 'border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; display: flex; flex-direction: column; gap: 10px; background: #fafafa;';

    const topo = document.createElement('div');
    topo.style.cssText = 'display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;';

    const tituloEvento = document.createElement('strong');
    tituloEvento.textContent = evento.title || 'Novo Evento';
    tituloEvento.style.fontSize = '15px';

    const btnExcluirEvento = document.createElement('button');
    btnExcluirEvento.type = 'button';
    btnExcluirEvento.className = 'btn-danger';
    btnExcluirEvento.innerHTML = '<i data-feather="trash-2"></i> Excluir Evento';
    btnExcluirEvento.addEventListener('click', () => box.remove());

    topo.appendChild(tituloEvento);
    topo.appendChild(btnExcluirEvento);

    const inputTitulo = document.createElement('input');
    inputTitulo.type = 'text';
    inputTitulo.className = 'evento-campo-titulo';
    inputTitulo.value = evento.title || '';
    inputTitulo.placeholder = 'Título do evento';
    inputTitulo.addEventListener('input', () => {
      tituloEvento.textContent = inputTitulo.value.trim() || 'Novo Evento';
    });

    const linhaLocalHora = document.createElement('div');
    linhaLocalHora.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px;';

    const inputLocal = document.createElement('input');
    inputLocal.type = 'text';
    inputLocal.className = 'evento-campo-local';
    inputLocal.value = evento.location || '';
    inputLocal.placeholder = 'Local do evento';

    const inputHorario = document.createElement('input');
    inputHorario.type = 'text';
    inputHorario.className = 'evento-campo-horario';
    inputHorario.value = evento.time || '';
    inputHorario.placeholder = 'Horário (ex: 19:00 - 21:00)';

    linhaLocalHora.appendChild(inputLocal);
    linhaLocalHora.appendChild(inputHorario);

    const textareaDescricao = document.createElement('textarea');
    textareaDescricao.className = 'evento-campo-descricao';
    textareaDescricao.rows = 3;
    textareaDescricao.value = evento.description || '';
    textareaDescricao.placeholder = 'Descrição do evento';

    box.appendChild(topo);
    box.appendChild(inputTitulo);
    box.appendChild(linhaLocalHora);
    box.appendChild(textareaDescricao);

    if (listaEventosAgenda) {
      listaEventosAgenda.appendChild(box);
    }
    if (window.feather) window.feather.replace();
  }

  function renderizarEventosDaDataSelecionada() {
    if (!listaEventosAgenda || !dataEventoAgenda) return;
    const dataChave = dataEventoAgenda.value || '2026-07-05';
    const eventosDoDia = Array.isArray(eventosCalendarioMapa[dataChave]) ? eventosCalendarioMapa[dataChave] : [];
    listaEventosAgenda.innerHTML = '';

    if (eventosDoDia.length > 0) {
      eventosDoDia.forEach(ev => criarBlocoEventoCalendario(ev));
    } else {
      const aviso = document.createElement('p');
      aviso.textContent = 'Nenhum evento cadastrado para este dia. Clique em "Adicionar Evento" para criar um.';
      aviso.style.cssText = 'color: #6b7280; font-size: 14px; margin: 4px 0;';
      listaEventosAgenda.appendChild(aviso);
    }
  }

async function carregarEventosCalendarioAdmin() {
    if (!ehAgenda) return;
    try {
      const response = await fetch(`${API_BASE}/textos/agenda`);
      if (response.ok) {
        const dados = await response.json();
        if (dados && typeof dados === 'object' && !Array.isArray(dados)) {
          const datasComEventos = Object.keys(dados)
            .filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k) && Array.isArray(dados[k]) && dados[k].length > 0)
            .sort();

          if (datasComEventos.length > 0) {
            eventosCalendarioMapa = dados;
            if (dataEventoAgenda && (!dataEventoAgenda.value || !eventosCalendarioMapa[dataEventoAgenda.value])) {
              dataEventoAgenda.value = datasComEventos[datasComEventos.length - 1];
            }
          }
        }
      }
    } catch (error) {
      console.error('Erro ao carregar eventos do calendário:', error);
    }

    if (dataEventoAgenda && !dataEventoAgenda.value) {
      const hoje = new Date();
      dataEventoAgenda.value = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
    }

    renderizarEventosDaDataSelecionada();
  }

  if (dataEventoAgenda) {
    dataEventoAgenda.addEventListener('change', renderizarEventosDaDataSelecionada);
  }

  if (btnAddEventoAgenda) {
    btnAddEventoAgenda.addEventListener('click', () => {
      if (!listaEventosAgenda) return;
      const avisoVazio = listaEventosAgenda.querySelector('p');
      if (avisoVazio && !avisoVazio.className) avisoVazio.remove();
      criarBlocoEventoCalendario({});
    });
  }

  if (btnSalvarEventosAgenda) {
    btnSalvarEventosAgenda.addEventListener('click', async () => {
      if (!dataEventoAgenda || !listaEventosAgenda) return;
      const dataChave = dataEventoAgenda.value || '2026-07-05';

      const blocosEventos = [...listaEventosAgenda.querySelectorAll('.evento-calendario-item')];
      const eventosAtualizados = blocosEventos
        .map(box => ({
          title: box.querySelector('.evento-campo-titulo').value.trim(),
          location: box.querySelector('.evento-campo-local').value.trim(),
          time: box.querySelector('.evento-campo-horario').value.trim(),
          description: box.querySelector('.evento-campo-descricao').value.trim()
        }))
        .filter(ev => ev.title !== '' || ev.location !== '' || ev.time !== '' || ev.description !== '');

      if (eventosAtualizados.length > 0) {
        eventosCalendarioMapa[dataChave] = eventosAtualizados;
      } else {
        delete eventosCalendarioMapa[dataChave];
      }

      try {
        const response = await fetch(`${API_BASE}/textos/agenda`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventosCalendarioMapa)
        });

        if (response.ok) {
          mostrarAlerta(`Eventos do dia ${dataChave} salvos com sucesso!`);
          renderizarEventosDaDataSelecionada();
        } else {
          alert('Erro ao salvar os eventos do calendário.');
        }
      } catch (error) {
        console.error(error);
        alert('Erro de conexão com o servidor Node.');
      }
    });
  }

  async function carregarTextos() {
    if (ehAgenda) return;
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
    } else if (paginaAtual === 'religioso') {
      CARDS_PADRAO_RELIGIOSO.forEach(card => criarBlocoCard(card));
    } else if (paginaAtual === 'rural') {
      CARDS_PADRAO_RURAL.forEach(card => criarBlocoCard(card));
    } else if (paginaAtual === 'hotelaria') {
      CARDS_PADRAO_HOTELARIA.forEach(card => criarBlocoCard(card));
    } else if (paginaAtual === 'gastronomia') {
      CARDS_PADRAO_GASTRONOMIA.forEach(card => criarBlocoCard(card));
    } else if (paginaAtual === 'agenda') {
      CARDS_PADRAO_AGENDA.forEach(card => criarBlocoCard(card));
    } else if (ehPaginaComCards) {
      criarBlocoCard({ tipo: obterOpcoesTipoPagina()[0] });
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
  carregarEventosCalendarioAdmin();
});