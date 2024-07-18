
// IMPORTAÇÕES NECESSÁRIAS

import '../../../../css/App.css';
import '../../../../App.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from '../../home.jsx';

// DEFINE O COMPONENTE " Register "

const Register = () => {

    // DEFINE OS ESTADOS PARA AS PESSOAS E DADOS DO FORMULÁRIO
    const [pessoas, setPessoas] = useState([]);
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [idade, setIdade] = useState('');
    const [profissao, setProfissao] = useState('');
    const [atestados, setAtestados] = useState([]);

    // FUNÇÃO QUE EXECUTA QUANDO O COMPONENTE É MONTADO
    useEffect(() => {

        // FAZ UMA REQUISIÇÃO PARA OBTER AS PESSOAS
        axios.get('/pessoas')
            .then(response => {
                setPessoas(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar os dados:', error);
            });
    }, []);

    // FUNÇÃO QUE EXECUTA QUANDO O FORMULÁRIO É SUBMETIDO
    const handleSubmit = (event) => {
        event.preventDefault();

        // DEFINE UMA NOVA MATRÍCULA BASEADA NA ÚLTIMA MATRÍCULA EXISTENTE
        const novaMatricula = pessoas.length > 0 ? Math.max(...pessoas.map(pessoa => pessoa.matricula)) + 1 : 100001;

        // CRIA UM OBJETO PARA A NOVA PESSOA
        const novaPessoa = {
            nome,
            sobrenome,
            idade: parseInt(idade),
            profissao,
            matricula: novaMatricula,
            atestados
        };

        // FAZ UMA REQUISIÇÃO POST PARA ADICIONAR A NOVA PESSOA
        axios.post('/pessoas', novaPessoa)
            .then(response => {

                console.log(response.data);
                setPessoas([...pessoas, novaPessoa]);

                // LIMPA OS CAMPOS DO FORMULÁRIO APÓS O ENVIO
                setNome('');
                setSobrenome('');
                setIdade('');
                setProfissao('');
                setAtestados([]);
            })
            .catch(error => {

                // MENSAGEM DE ERRO CASO OCORRA
                console.error('Erro ao adicionar pessoa:', error);
            });
    };

    // RETORNA O JSX PARA RENDERIZAR O COMPONENTE
    return (
        <div className='body'>

            <Home/>

            {/* DIV PARA O FORMULÁRIO DE REGISTRO COM A CLASSE "login" */}
            <div className="login">

                {/* FORMULÁRIO PARA CADASTRO DE FUNCIONÁRIO */}
                <form onSubmit={handleSubmit}>

                    <h2>Cadastrar funcionário</h2>

                        {/* NOME */}
                        <label>Nome:</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />

                        {/* SOBRENOME */}
                        <label>Sobrenome:</label>
                        <input type="text" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required />
                    
                        {/* IDADE */}
                        <label>Idade:</label>
                        <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} required />

                        {/* PROFISSÃO */}
                        <label>Profissão:</label>
                        <input type="text" value={profissao} onChange={(e) => setProfissao(e.target.value)} required />

                    {/* DIV PARA OS BOTÕES DO FORMULÁRIO */}
                    <div className='buttons'>

                        {/* CADASTRAR */}
                        <button type="submit">Cadastrar</button>

                        {/* LIMPAR CAMPOS */}
                        <button type='reset'>Limpar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// EXPORTA O COMPONENTE " Register " COMO PADRÃO
export default Register;
