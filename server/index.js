const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ mensagem: 'API do TOUR São Miguel Arcanjo está rodando!' });
});

app.get('/api/textos/:pagina', async (req, res) => {
  const { pagina } = req.params;
  try {
    const registros = await prisma.textoPagina.findMany({
      where: { pagina }
    });

    const resultado = {};
    registros.forEach(item => {
      resultado[item.chave] = item.conteudo;
    });

    res.json(resultado);
  } catch (error) {
    console.error('Erro ao buscar textos:', error);
    res.status(500).json({ erro: 'Erro ao buscar textos da página.' });
  }
});

app.post('/api/textos/:pagina', async (req, res) => {
  const { pagina } = req.params;
  const novosDados = req.body; 

  try {
    for (const [chave, conteudo] of Object.entries(novosDados)) {
      await prisma.textoPagina.upsert({
        where: {
          pagina_chave: { pagina, chave }
        },
        update: { conteudo: String(conteudo) },
        create: {
          pagina,
          chave,
          conteudo: String(conteudo)
        }
      });
    }

    res.json({ mensagem: 'Textos salvos com sucesso no PostgreSQL!' });
  } catch (error) {
    console.error('Erro ao salvar textos:', error);
    res.status(500).json({ erro: 'Erro ao salvar textos no banco de dados.' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// ==========================================
// ROTAS DE GERENCIAMENTO DE IMAGENS
// ==========================================

// GET: Buscar imagens de uma seção específica (ex: /api/imagens/home)
app.get('/api/imagens/:secao', async (req, res) => {
  const { secao } = req.params;
  try {
    const registro = await prisma.imagem.findUnique({
      where: { secao }
    });

    if (!registro) {
      return res.status(404).json({ mensagem: 'Imagens não encontradas para esta seção.' });
    }

    res.json(registro.conteudo);
  } catch (error) {
    console.error('Erro ao buscar imagens:', error);
    res.status(500).json({ erro: 'Erro ao buscar imagens no banco de dados.' });
  }
});

// POST: Salvar ou atualizar imagens de uma seção
app.post('/api/imagens/:secao', async (req, res) => {
  const { secao } = req.params;
  const novosDados = req.body;

  try {
    const registro = await prisma.imagem.upsert({
      where: { secao },
      update: { conteudo: novosDados },
      create: { secao, conteudo: novosDados }
    });

    res.json({ mensagem: 'Imagens salvas com sucesso!', registro });
  } catch (error) {
    console.error('Erro ao salvar imagens:', error);
    res.status(500).json({ erro: 'Erro ao salvar imagens no banco de dados.' });
  }
});

// ==========================================
// ROTAS DA AGENDA DE EVENTOS
// ==========================================

// GET: Listar todos os eventos
app.get('/api/eventos', async (req, res) => {
  try {
    const eventos = await prisma.evento.findMany({
      orderBy: { id: 'desc' }
    });
    res.json(eventos);
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    res.status(500).json({ erro: 'Erro ao buscar eventos do banco.' });
  }
});

// POST: Criar um novo evento
app.post('/api/eventos', async (req, res) => {
  const { titulo, data, local, descricao, imagemUrl } = req.body;
  try {
    const novoEvento = await prisma.evento.create({
      data: { titulo, data, local, descricao, imagemUrl }
    });
    res.status(201).json(novoEvento);
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    res.status(500).json({ erro: 'Erro ao criar evento.' });
  }
});

// PUT: Editar evento
app.put('/api/eventos/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, data, local, descricao, imagemUrl } = req.body;
  try {
    const eventoAtualizado = await prisma.evento.update({
      where: { id: parseInt(id) },
      data: { titulo, data, local, descricao, imagemUrl }
    });
    res.json(eventoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar evento:', error);
    res.status(500).json({ erro: 'Erro ao atualizar evento.' });
  }
});

// DELETE: Apagar evento
app.delete('/api/eventos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.evento.delete({
      where: { id: parseInt(id) }
    });
    res.json({ mensagem: 'Evento eliminado com sucesso!' });
  } catch (error) {
    console.error('Erro ao eliminar evento:', error);
    res.status(500).json({ erro: 'Erro ao eliminar evento.' });
  }
});