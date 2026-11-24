document.addEventListener('DOMContentLoaded', () => {
const API_BASE = 'https://toursma.onrender.com/api';
  const formEvento = document.getElementById('formEvento');
  const eventoIdInput = document.getElementById('eventoId');
  const tituloInput = document.getElementById('titulo');
  const dataInput = document.getElementById('data');
  const localInput = document.getElementById('local');
  const descricaoInput = document.getElementById('descricao');
  const imagemUrlInput = document.getElementById('imagemUrl');

  const formTitle = document.getElementById('formTitle');
  const btnCancelar = document.getElementById('btnCancelar');
  const listaEventos = document.getElementById('listaEventos');
  const alertSuccess = document.getElementById('alertSuccess');
  const alertMessage = document.getElementById('alertMessage');

  let eventosCache = [];

  function escapeHTML(valor) {
    return String(valor ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function atualizarIcones() {
    if (window.feather) {
      window.feather.replace();
    }
  }

  async function carregarEventos() {
    if (!listaEventos) return;

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao buscar dados do servidor');

      const eventos = await response.json();
      eventosCache = Array.isArray(eventos) ? eventos : [];

      if (eventosCache.length === 0) {
        listaEventos.innerHTML = '<p style="color: #64748b; padding: 12px 0;">Nenhum evento cadastrado até o momento.</p>';
        return;
      }

      listaEventos.innerHTML = eventosCache.map(e => `
        <div class="evento-card">
          <div class="evento-info">
            <div class="evento-titulo">${escapeHTML(e.titulo)}</div>
            <div class="evento-meta">
              <span class="evento-meta-item">📅 ${escapeHTML(e.data)}</span>
              <span class="evento-meta-item">📍 ${escapeHTML(e.local)}</span>
            </div>
            <div class="evento-descricao">${escapeHTML(e.descricao)}</div>
          </div>
          <div class="evento-acoes">
            <button type="button" class="btn-secondary btn-editar" data-id="${escapeHTML(e.id)}">
              <i data-feather="edit"></i> Editar
            </button>
            <button type="button" class="btn-danger btn-excluir" data-id="${escapeHTML(e.id)}">
              <i data-feather="trash-2"></i> Excluir
            </button>
          </div>
        </div>
      `).join('');

      atualizarIcones();
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      listaEventos.innerHTML = '<p style="color: #ef4444; padding: 12px 0;">Erro ao conectar com o servidor Node.</p>';
    }
  }

  if (listaEventos) {
    listaEventos.addEventListener('click', (e) => {
      const btnEditar = e.target.closest('.btn-editar');
      if (btnEditar) {
        const id = btnEditar.getAttribute('data-id');
        const evento = eventosCache.find(item => String(item.id) === String(id));
        if (evento) prepararEdicao(evento);
        return;
      }

      const btnExcluir = e.target.closest('.btn-excluir');
      if (btnExcluir) {
        const id = btnExcluir.getAttribute('data-id');
        if (id) excluirEvento(id);
      }
    });
  }

  if (formEvento) {
    formEvento.addEventListener('submit', async (e) => {
      e.preventDefault();

      const id = eventoIdInput ? eventoIdInput.value.trim() : '';
      const dados = {
        titulo: tituloInput ? tituloInput.value.trim() : '',
        data: dataInput ? dataInput.value.trim() : '',
        local: localInput ? localInput.value.trim() : '',
        descricao: descricaoInput ? descricaoInput.value.trim() : '',
        imagemUrl: imagemUrlInput ? imagemUrlInput.value.trim() : ''
      };

      const metodo = id ? 'PUT' : 'POST';
      const url = id ? `${API_URL}/${id}` : API_URL;

      try {
        const response = await fetch(url, {
          method: metodo,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
        });

        if (response.ok) {
          mostrarAlerta(id ? 'Evento atualizado com sucesso!' : 'Evento cadastrado com sucesso!');
          resetarFormulario();
          carregarEventos();
        } else {
          alert('Erro ao salvar no banco de dados.');
        }
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro de conexão com o servidor Node.');
      }
    });
  }

  function prepararEdicao(evento) {
    if (!eventoIdInput) return;

    eventoIdInput.value = evento.id;
    if (tituloInput) tituloInput.value = evento.titulo || '';
    if (dataInput) dataInput.value = evento.data || '';
    if (localInput) localInput.value = evento.local || '';
    if (descricaoInput) descricaoInput.value = evento.descricao || '';
    if (imagemUrlInput) imagemUrlInput.value = evento.imagemUrl || '';

    if (formTitle) formTitle.textContent = 'Editar Evento';
    if (btnCancelar) btnCancelar.style.display = 'inline-flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function excluirEvento(id) {
    if (confirm('Tem certeza de que deseja excluir este evento?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) {
          mostrarAlerta('Evento excluído com sucesso!');
          carregarEventos();
        } else {
          alert('Erro ao excluir no banco de dados.');
        }
      } catch (error) {
        console.error('Erro ao excluir:', error);
        alert('Erro ao conectar com o servidor para excluir.');
      }
    }
  }

  function resetarFormulario() {
    if (eventoIdInput) eventoIdInput.value = '';
    if (formEvento) formEvento.reset();
    if (formTitle) formTitle.textContent = 'Novo Evento';
    if (btnCancelar) btnCancelar.style.display = 'none';
  }

  if (btnCancelar) {
    btnCancelar.addEventListener('click', resetarFormulario);
  }

  function mostrarAlerta(mensagem) {
    if (alertMessage && alertSuccess) {
      alertMessage.textContent = mensagem;
      alertSuccess.style.display = 'flex';
      setTimeout(() => {
        alertSuccess.style.display = 'none';
      }, 4000);
    }
  }

  const nomeUserEl = document.getElementById('nomeUser');
  const avatarInicialEl = document.getElementById('avatarInicial');
  const btnLogoutEl = document.getElementById('btnLogout');

  const usuario = localStorage.getItem('nomeUsuario') || 'Augusto';
  if (nomeUserEl) nomeUserEl.textContent = usuario;
  if (avatarInicialEl) avatarInicialEl.textContent = usuario.charAt(0).toUpperCase();

  if (btnLogoutEl) {
    btnLogoutEl.addEventListener('click', () => {
      localStorage.removeItem('usuarioLogado');
      localStorage.removeItem('nomeUsuario');
      window.location.href = 'login.html';
    });
  }

  atualizarIcones();
  carregarEventos();
});