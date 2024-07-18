
// IMPORTAÇÕES NECESSÁRIAS

import React, { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import Home from '../../home.jsx';
import axios from 'axios'; 
import '../../../../css/App.css'; 
import '../../../../App.js'; 

// DEFINE O COMPONENTE " Login "

const Login = () => { 

  const [nome, setNome] = useState(''); 
  const [matricula, setMatricula] = useState(''); 
  const [error, setError] = useState(''); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [user, setUser] = useState(null); 
  const [file, setFile] = useState(null); 

  // DEFINE A FUNÇÃO "handleLogin" ASSÍNCRONA
  const handleLogin = async (e) => { 
    // PREVINE O COMPORTAMENTO PADRÃO DO FORMULÁRIO
    e.preventDefault(); 

    try { 
      // FAZ UMA REQUISIÇÃO GET PARA O ENDPOINT '/pessoas' USANDO "axios"
      const response = await axios.get('/pessoas');
      
      // ARMAZENA OS DADOS DA RESPOSTA NA VARIÁVEL "data"
      const data = response.data; 

      // PROCURA O USUÁRIO NOS DADOS RECEBIDOS
      const foundUser = data.find(li => li.nome === nome && li.matricula == matricula); 

      if (foundUser) { 
        // SE O USUÁRIO FOR ENCONTRADO, ATUALIZA O ESTADO DE " user " E " isLoggedIn "
        setUser(foundUser); 
        setIsLoggedIn(true); 
        setError(''); 
      } else { 

        // SE O USUÁRIO NÃO FOR ENCONTRADO, DEFINE UMA MENSAGEM DE ERRO
        setError('Dados incorretos!'); 

      } 
    } catch (error) { 

      // SE OCORRER UM ERRO NA REQUISIÇÃO, EXIBE UMA MENSAGEM DE ERRO NO CONSOLE E ATUALIZA O ESTADO DE "error"
      console.error('Erro ao buscar os dados:', error); 
      setError('Erro ao buscar os dados.'); 

    } 
  }; 

  // DEFINE A FUNÇÃO "handleFileChange"
  const handleFileChange = (e) => { 

    // ATUALIZA O ESTADO DE "file" COM O PRIMEIRO ARQUIVO SELECIONADO
    setFile(e.target.files[0]); 

  }; 

  // DEFINE A FUNÇÃO "handleFileUpload" ASSÍNCRONA
  const handleFileUpload = async () => { 
    if (!file) { 

      // SE NENHUM ARQUIVO FOR SELECIONADO, DEFINE UMA MENSAGEM DE ERRO
      setError('Por favor, selecione um arquivo.'); 
      return; 

    } 

    // CRIA UM NOVO OBJETO "FormData"
    const formData = new FormData(); 

    // ADICIONA O ARQUIVO AO "formData"
    formData.append('file', file); 

    try { 

      // FAZ UMA REQUISIÇÃO POST PARA ENVIAR O ARQUIVO
      const response = await axios.post(`/pessoas/${user.matricula}/upload`, formData, { 

        // DEFINE O CABEÇALHO 'Content-Type' COMO 'multipart/form-data'
        headers: { 
          'Content-Type': 'multipart/form-data', 
        }, 

      }); 
      setError('');

      // EXIBE UM ALERTA DE SUCESSO
      alert('Atestado enviado com sucesso!'); 

      // LIMPA O ESTADO DO ARQUIVO APÓS O UPLOAD
      setFile(null); 

      // RESETA O INPUT DE ARQUIVO
      document.getElementById('fileInput').value = ''; 

      // ATUALIZA OS ATESTADOS DO USUÁRIO
      setUser((prevUser) => ({ 
        ...prevUser, 
        atestados: [...prevUser.atestados, response.data.filename] 
      })); 

    } catch (error) { 

      // SE OCORRER UM ERRO NO ENVIO, EXIBE UMA MENSAGEM DE ERRO NO CONSOLE E ATUALIZA O ESTADO DE "error"
      console.error('Erro ao enviar o atestado:', error); 
      setError('Erro ao enviar o atestado.'); 

    } 
  }; 

  // DEFINE A FUNÇÃO "handleDownload" ASSÍNCRONA
  const handleDownload = async (filename) => { 

    try { 
      // FAZ UMA REQUISIÇÃO GET PARA BAIXAR O ARQUIVO
      const response = await axios.get(`http://localhost:5000/uploads/${filename}`, { 

        // DEFINE O TIPO DA RESPOSTA COMO 'arraybuffer'
        responseType: 'arraybuffer' 

      }); 
      // CRIA UM "Blob" COM OS DADOS DA RESPOSTA
      const blob = new Blob([response.data], { type: 'application/pdf' }); 

      // CRIA UMA URL PARA O "Blob"
      const url = window.URL.createObjectURL(blob); 

      // CRIA UM ELEMENTO "a" PARA O DOWNLOAD
      const link = document.createElement('a'); 
      link.href = url; 
      link.setAttribute('download', filename); 
      document.body.appendChild(link); 
      link.click(); 
      link.parentNode.removeChild(link); 
    } catch (error) { 

      // SE OCORRER UM ERRO NO DOWNLOAD, EXIBE UMA MENSAGEM DE ERRO NO CONSOLE E ATUALIZA O ESTADO DE "error"
      console.error('Erro ao baixar o arquivo:', error); 
      setError('Erro ao baixar o arquivo.'); 

    } 
  }; 

// RENDERIZA O COMPONENTE "Login"
return ( 

  // DIV PRINCIPAL COM A CLASSE "body"
  <div className='body'> 

    {/* CONDICIONAL PARA VERIFICAR SE O USUÁRIO ESTÁ LOGADO */}
    {isLoggedIn ? ( 

      // DIV PARA DADOS DO USUÁRIO LOGADO COM A CLASSE "user-data"
      <div className='user-data'>

        {/* DIV PARA O CARTÃO DE INFORMAÇÕES DO USUÁRIO COM A CLASSE "card" */}
        <div className='card'>

          {/* MENSAGEM DE BOAS-VINDAS EXIBINDO O NOME E SOBRENOME DO USUÁRIO */}
          <h1>Bem-vindo(a), {user.nome} {user.sobrenome}!</h1>

          {/* LISTA COM INFORMAÇÕES DO USUÁRIO */}
          <ul> 
            <li>Profissão: {user.profissao}</li> 
            <li>Idade: {user.idade}</li> 
            <li>Matrícula: {user.matricula}</li> 
            <li><Link to={`/editar/${user.matricula}`}><button type='button'>Editar Dados</button></Link></li>
            <li><Link to={`/demitir/${user.matricula}`}><button type='button'>Desligar Funcionário</button></Link></li>  
          </ul>   
        </div> 

        {/* DIV PARA ENVIO DE DOCUMENTO COM A CLASSE "send-document" */}
        <div className='send-document'>

          <h2> Enviar um atestado:</h2>

          {/* INPUT PARA SELEÇÃO DE ARQUIVO COM ID "fileInput" */}
          <input type="file" id="fileInput" onChange={handleFileChange} />

          {/* BOTÃO PARA ENVIAR O ARQUIVO SELECIONADO */}
          <button onClick={handleFileUpload}>Enviar Atestado</button>

        </div>

        {/* EXIBE MENSAGEM DE ERRO SE EXISTIR */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <h2>Atestados Enviados:</h2>

        {/* LISTA DE ATESTADOS ENVIADOS PELO USUÁRIO */}
        <ul> 

          {/* MAPEIA E RENDERIZA CADA ATESTADO ENVIADO */}
          {user.atestados.map((atestado, index) => (

            //  ITEM DA LISTA PARA CADA ATESTADO COM CHAVE " index "
            <li key={index}>

              {/* BOTÃO PARA BAIXAR O ATESTADO */}
              <button onClick={() => handleDownload(atestado)}>{atestado}</button>

            </li> 
          ))} 
        </ul> 
      </div>

    ) : (

      // DIV PRINCIPAL COM A CLASSE "body" QUANDO O USUÁRIO NÃO ESTÁ LOGADO
      <div className='body'>

        <Home /> 

        {/* DIV PARA O FORMULÁRIO DE LOGIN COM A CLASSE "login" */}
        <div className='login'> 

          {/* FORMULÁRIO DE LOGIN */}
          <form onSubmit={handleLogin}> 

            <h1>Insira os seus dados</h1> 
             
            {/* NOME DA PESSOA  */}
            <label htmlFor="nome">Insira o seu primeiro nome:</label> 
            <input type='text' name='nome' id='nome' placeholder='Insira o seu Nome' onChange={(e) => setNome(e.target.value)} value={nome} /> 

            {/* MATRÍCULA  */}
            <label htmlFor="matricula">Matrícula:</label> 
            <input type='text' name='matricula' id='matricula' placeholder='Insira a sua matrícula' onChange={(e) => setMatricula(e.target.value)} value={matricula} />
 
            {/* DIV PARA OS BOTÕES DO FORMULÁRIO */}
            <div className='buttons'>

              {/* BOTÃO DE LOGIN */}
              <button type='submit'>Entrar</button> 

              {/* BOTÃO DE CADASTRO */}
              <Link to={'/cadastro'}><button type='button'>Cadastrar</button></Link> 
            </div> 

            {/* EXIBE MENSAGEM DE ERRO SE EXISTIR */}
            {error && <li style={{ color: 'red' }}>{error}</li>}

          </form> 
        </div> 
      </div> 
    )} 
  </div>
); 
};


// EXPORTA O COMPONENTE "Login" COMO PADRÃO
export default Login; 

