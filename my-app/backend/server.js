
// IMPORTAÇÃO DOS REQUISITOS DE NECESSÁRIOS

const express = require('express');  // CRIANDO O SERVIDOR
const multer = require('multer'); //UPLOAD DE ARQUIVOS
const bodyParser = require('body-parser'); // LIDAR COM DADOS JSON 
const fs = require('fs'); // SISTEMA DE ARQUIVOS
const path = require('path'); // MANINULAÇÃO DO CAMINHO DOS ARQUIVOS
const cors = require('cors'); // PERMITIR REQUISIÇÕES DE OUTRAS ORIGENS

const app = express(); // INICIANDO O APLICATIVO " express "
const PORT = 5000; //DEFINIÇÃO DE QUAL PORTA ELE IRÁ RODAR

// UTILIZAÇÕES

app.use(cors()); // USANDO O CORS PARA PERMITIR REQUISIÇÕES DE OUTRAS ORIGENS
app.use(bodyParser.json()); // ANALISAR REQUISIÇÕES COM CORPO EM JSON
app.use(bodyParser.urlencoded({ extended: true })); // ANALISAR REQUISIÇÕES COM CORPO " URL-encoded "

// CONFIGURAÇÃO DO MULTER PARA ARMAZENAR OS ARQUIVOS

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // DEFININDO A PASTA DE DESTINO DOS UPLOADS
  },
  filename: (req, file, cb) => {
    cb(null,`Documento-${Date.now()}`); // AO FAZER O UPLOAD DO ARQUIVO ELE SERÁ NOMEADO PELA DATA E A HORA
  },
});

const upload = multer({ storage: storage }); // INICIALIZANDO O MULTER COM A CONFIGURAÇÃO DE ARMAZENAMENTO

// ENDPOINT PARA PEGAR DADOS DAS PESSOAS

app.get('/pessoas', (req, res) => {
  fs.readFile(path.join(__dirname, 'pessoas.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Erro ao ler o arquivo de pessoas.'); // ENVIANDO MENSAGM DE ERRO SE NÂO FOR POSSÍVEL LER O ARQUIVO
      return;
    }
    res.send(JSON.parse(data)); // ENVIAR DADOS DE RESPOSTA
  });
});

// ENDPOINT PARA UPLOAD DE ARQUIVOS

app.post('/pessoas/:matricula/upload', upload.single('file'), (req, res) => {
  const { matricula } = req.params; // OBTENDO PARÂMETRO DE MATRÍCULA DA URL
  const file = req.file; // OBTENDO ARQUIVO ENVIADO

  // ATUALIZE O JSON DE PESSOAS PARA INCLUIR O ATESTADO NO USUÁRIO CORRESPONDENTE

  fs.readFile(path.join(__dirname, 'pessoas.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Erro ao ler o arquivo de pessoas.');
      return;
    }

    let pessoas = JSON.parse(data); // PARSING O ARQUIVO JSON DE PESSOAS ( CONVERTER EM OBJETO O ARQUIVO JSON )
    const pessoaIndex = pessoas.findIndex(p => p.matricula == matricula); // ECONTRANDO O ÍNDICE DA PESSOA COM A MAdfd

    if (pessoaIndex === -1) {
      res.status(404).send('Usuário não encontrado.'); // MENSAGEM DE ERRO SE A PESSOA NÃO FOR ENCONTRADA
      return;
    }

    const atestadoPath = `http://localhost:${PORT}/uploads/${file.filename}`; // CRIANDO O CAMINHO DO ARQUIVO DE UPLOAD
    pessoas[pessoaIndex].atestados.push(atestadoPath); // ADICIONANDO O CAMINHO DO ARQUIVO Á PESSOA

    fs.writeFile(path.join(__dirname, 'pessoas.json'), JSON.stringify(pessoas, null, 2), (err) => {
      if (err) {
        res.status(500).send('Erro ao atualizar o arquivo de pessoas.'); // ENVIANDO ERRO SE NÃO FOR POSSÍVEL ATUALIZAR O ARQUIVO
        return;
      }
      res.send({data: Date.now(),  filename: file.filename }); // ENVIANDO O NOME DO ARQUIVO COMO RESPOSTA
    });
  });
});


// SERVIR ARQUIVOS ESTÁTICOS DA PASTA " uploads "

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CRIE A PASTA " uploads " SE NÃO EXISTIR

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads'); // CRIANDO A PASTA
}

// INICIANDO SERVIOR NA PORTA DEFINIDA

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// ENDPOINT PARA ATUALIZAR DADOS DE UMA PESSOA
app.put('/pessoas/:matricula', (req, res) => {
  const { matricula } = req.params; // OBTENDO PARÂMETRO DE MATRÍCULA DA URL
  const updatedData = req.body; // OBTENDO OS NOVOS DADOS DO CORPO DA REQUISIÇÃO

  fs.readFile(path.join(__dirname, 'pessoas.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erro ao ler o arquivo de pessoas.');
    }

    let pessoas = JSON.parse(data); // PARSING O ARQUIVO JSON
    const pessoaIndex = pessoas.findIndex(p => p.matricula == matricula); // ENCONTRANDO O ÍNDICE

    if (pessoaIndex === -1) {
      return res.status(404).send('Usuário não encontrado.');
    }

    // ATUALIZANDO OS DADOS DA PESSOA
    pessoas[pessoaIndex] = {
      ...pessoas[pessoaIndex],
      ...updatedData // SUBSTITUI OS DADOS ANTIGOS PELOS NOVOS
    };

    fs.writeFile(path.join(__dirname, 'pessoas.json'), JSON.stringify(pessoas, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Erro ao atualizar o arquivo de pessoas.');
      }
      res.send(pessoas[pessoaIndex]); // ENVIANDO O DADO ATUALIZADO COMO RESPOSTA
    });
  });
});
