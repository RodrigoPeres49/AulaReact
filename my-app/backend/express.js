
// IMPORTAÇÕES NECESSÁRIAS

const express = require('express'); // FRAMEWORK EXPRESS PARA CRIAR O SERVIDOR
const multer = require('multer'); // LIDAR COM UPLOAD DE ARQUIVOS
const path = require('path'); // MANIPULAÇÃO DE CAMINHO DE ARQUIVOS

// INICIANDO APLICAÇÃO E DEFININDO PORTA

const app = express(); // INICIANDO APLICAÇÃO
const PORT = 5000; // PORTA

// CONFIGURAR ARMAZENAMENTO COM " multer "

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // PASTA AONDE OS ARQUIVOS SERÃO SALVOS
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}`); // RENOMEAR ARQUIVO PELA DATA ESPECÍFICA
  },
});

// INICIALIZANDO O " multer " COM A CONFIGURAÇÃO DE ARMAZENAMENTO

const upload = multer({ storage });

// ROTA PARA UPLOAD

app.post('/pessoas/:matricula/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    // RETORNANDO ERRO SE NENHUM ARQUIVO FOI ENVIADO
    return res.status(400).send('Nenhum arquivo foi enviado.'); 
  }

  const filePath = `/uploads/${req.file.filename}`; // CRIANDO O CAMINHO ACESSÍVEL PARA O ARQUIVO
  res.json({ filePath }); // RETORNANDO CAMINHO DO ARQUIVO EM FORMATO JSON
});

// SERVIR ARQUIVOS ESTÁTICOS

// DEFININDO A PASTA UPLOADS COMO PASTA DE ARQUIVOS ESTÁTICOS

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// INICIAR O SERVIDOR

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
