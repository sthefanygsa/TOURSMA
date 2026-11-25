const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use('/assets/img', express.static(path.join(__dirname, '..', 'assets', 'img')));

const pastaUploads = path.join(__dirname, '..', 'assets', 'img');
if (!fs.existsSync(pastaUploads)) {
  fs.mkdirSync(pastaUploads, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pastaUploads);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const nomeLimpo = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-');
    cb(null, `${Date.now()}-${nomeLimpo}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // até 5MB
  fileFilter: (req, file, cb) => {
    const permitidos = /jpeg|jpg|png|webp/;
    const extOk = permitidos.test(path.extname(file.originalname).toLowerCase());
    const mimeOk = permitidos.test(file.mimetype);
    if (extOk && mimeOk) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens JPG, PNG ou WEBP são permitidas.'));
    }
  }
});

app.get('/api/status', (req, res) => {
  res.json({ mensagem: 'API do TOUR São Miguel Arcanjo está rodando!' });
});

app.post('/api/upload', (req, res) => {
  upload.single('imagem')(req, res, (err) => {
    if (err) {
      console.error('Erro no multer:', err);
      return res.status(400).json({ erro: err.message || 'Erro ao processar a imagem.' });
    }

    if (!req.file) {
      return res.status(400).json({ erro: 'Nenhuma imagem enviada.' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
const urlCompleta = `${baseUrl}/assets/img/${req.file.filename}`;
res.status(201).json({ url: urlCompleta });
  });
});

app.get('/api/textos/:pagina', async (req, res) => {
  const { pagina } = req.params;
  try {
    const registros = await prisma.textoPagina.findMany({
      where: { pagina }
    });

    const resultado = {};
    registros.forEach(item => {
      try {
        resultado[item.chave] = JSON.parse(item.conteudo);
      } catch {
        resultado[item.chave] = item.conteudo;
      }
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
      const arrayVazio =
        (Array.isArray(conteudo) && conteudo.length === 0) ||
        conteudo === '[]';

      if (arrayVazio) {
        await prisma.textoPagina.deleteMany({
          where: { pagina, chave }
        });
        continue;
      }

      const valorFormatado =
        typeof conteudo === 'object' && conteudo !== null
          ? JSON.stringify(conteudo)
          : String(conteudo ?? '');

      await prisma.textoPagina.upsert({
        where: {
          pagina_chave: { pagina, chave }
        },
        update: { conteudo: valorFormatado },
        create: {
          pagina,
          chave,
          conteudo: valorFormatado
        }
      });
    }

    res.json({ mensagem: 'Textos salvos com sucesso no PostgreSQL!' });
  } catch (error) {
    console.error('Erro ao salvar textos:', error);
    res.status(500).json({ erro: 'Erro ao salvar textos no banco de dados.' });
  }
});

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});