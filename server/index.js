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

app.get('/api/estabelecimentos', async (req, res) => {
  try {
    const estabelecimentos = await prisma.estabelecimento.findMany();
    res.json(estabelecimentos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar estabelecimentos' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});