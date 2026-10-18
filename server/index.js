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