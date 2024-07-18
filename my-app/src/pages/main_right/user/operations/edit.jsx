// IMPORTAÇÕES NECESSÁRIAS

import '../../../../css/App.css';
import '../../../../App.js';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from '../../home.jsx';

// DEFINE O COMPONENTE "Edit"
const Edit = () => {
    // DEFINE OS ESTADOS PARA AS PESSOAS E DADOS DO FORMULÁRIO
    const [pessoas, setPessoas] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [idade, setIdade] = useState('');
    const [profissao, setProfissao] = useState('');


    // OBTÉM O PARÂMETRO DE MATRÍCULA DA URL
    const { matricula } = useParams();
    const navigate = useNavigate();


    // FUNÇÃO QUE EXECUTA QUANDO O COMPONENTE É MONTADO
    useEffect(() => {
        
        axios.get('/pessoas')
            .then(response => {
                setPessoas(response.data);
                
                // ENCONTRA A PESSOA PELO NÚMERO DA MATRÍCULA
                const pessoa = response.data.find(p => p.matricula === parseInt(matricula));
                if (pessoa) {
                    setNome(pessoa.nome);
                    setSobrenome(pessoa.sobrenome);
                    setIdade(pessoa.idade.toString());
                    setProfissao(pessoa.profissao);
                }
            })
            .catch(error => {
                console.error('Erro ao carregar os dados:', error);
            });
    }, [matricula]);

    // FUNÇÃO QUE EXECUTA QUANDO O FORMULÁRIO É SUBMETIDO
    const handleSubmit = (event) => {
        event.preventDefault();

        const pessoaAtualizada = {
            nome,
            sobrenome,
            idade: parseInt(idade),
            profissao
        };

        // FAZ UMA REQUISIÇÃO PUT PARA ATUALIZAR A PESSOA
        axios.put(`/pessoas/${matricula}`, pessoaAtualizada)
            .then(response => {
                console.log(response.data);
                alert('Dados atualizados com sucesso!');
                // REDIRECIONA PARA A PÁGINA PRINCIPAL APÓS A ATUALIZAÇÃO
                navigate('/');
            })
            .catch(error => {
                console.error('Erro ao atualizar pessoa:', error);
            });
    };

    return (
        <div className='body'>
            
            <Home/>
            {/* DIV PARA A LISTA DE PESSOAS COM A CLASSE "login" */}
            <div>
                {/* FORMULÁRIO PARA EDIÇÃO DE FUNCIONÁRIO */}
                    <div className='login'>
                        <form onSubmit={handleSubmit}>
    
                            <h2>Editar funcionário</h2>
    
                                {/* NOME */}
                                <label>Nome:</label>
                                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
    
                                {/* SOBRENOME */}
                                <label>Sobrenome:</label>
                                <input type="text" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required />
                            
                                {/*  IDADE */}
                                <label>Idade:</label>
                                <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} required />
    
                                {/* PROFISSÃO */}
                                <label>Profissão:</label>
                                <input type="text" value={profissao} onChange={(e) => setProfissao(e.target.value)} required />
    
                            {/* DIV PARA OS BOTÕES DO FORMULÁRIO */}
                            <div className='buttons'>
    
                                {/* ATUALIZAR DADOS */}
                                <button type="submit">Atualizar</button>
    
                                {/* VOLTAR A PÁGINA PRINCIPAL */}
                                <button type='button' onClick={() => navigate('/')}>Voltar</button>
                            </div>
                        </form>
                    </div>
            </div>
        </div>
    );
};


// EXPORTA O COMPONENTE "Edit" COMO PADRÃO
export default Edit;
