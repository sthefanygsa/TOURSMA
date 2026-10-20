document.addEventListener('DOMContentLoaded', () => {
  const API_URL = 'http://localhost:3001/api/eventos';

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

  function atualizarIcones() {
    if (window.feather) {
      window.feather.replace();
    }
  }

  async function carregarEventos() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao buscar dados do servidor');

      const eventos = await response.json();

      if (!Array.isArray(eventos) || eventos.length === 0) {
        listaEventos.innerHTML = '<p style="color: #64748b; padding: 12px 0;">Nenhum evento cadastrado até o momento.</p>';
        return;
      }

      listaEventos.innerHTML = eventos.map(e => `
        <div class="evento-card">
          <div class="evento-info">
            <div class="evento-titulo">${e.titulo}</div>
            <div class="evento-meta">
              <span class="evento-meta-item">📅 ${e.data}</span>
              <span class="evento-meta-item">📍 ${e.local}</span>
            </div>
            <div class="evento-descricao">${e.descricao}</div>
          </div>
          <div class="evento-acoes">
            <button class="btn-secondary btn-editar" data-id="${e.id}">
              <i data-feather="edit"></i> Editar
            </button>
            <button class="btn-danger btn-excluir" data-id="${e.id}">
              <i data-feather="trash-2"></i> Excluir
            </button>
          </div>
        </div>
      `).join('');

      atualizarIcones();

      document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const evento = eventos.find(item => item.id == id);
          if (evento) prepararEdicao(evento);
        });
      });

      document.querySelectorAll('.btn-excluir').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          excluirEvento(id);
        });
      });

    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      listaEventos.innerHTML = '<p style="color: #ef4444; padding: 12px 0;">Erro ao conectar com o servidor Node.</p>';
    }
  }

  if (formEvento) {
    formEvento.addEventListener('submit', async (e) => {
      e.preventDefault();

      const id = eventoIdInput.value;
      const dados = {
        titulo: tituloInput.value,
        data: dataInput.value,
        local: localInput.value,
        descricao: descricaoInput.value,
        imagemUrl: imagemUrlInput.value
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
    tituloInput.value = evento.titulo;
    dataInput.value = evento.data;
    localInput.value = evento.local;
    descricaoInput.value = evento.descricao;
    imagemUrlInput.value = evento.imagemUrl || '';

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
      setTimeout(() => { alertSuccess.style.display = 'none'; }, 4000);
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