// IMPORTAÇÕES NECESSÁRIAS
import '../../../../css/App.css';
import '../../../../App.js';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from '../../home.jsx';

// DEFINE O COMPONENTE "Edit"
const Dismiss = () => {
    // DEFINE OS ESTADOS PARA AS PESSOAS E DADOS DO FORMULÁRIO
    const [pessoas, setPessoas] = useState('');
    const [ativo, setAtivo] = useState('');



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
                    setAtivo(pessoa.ativo.toString());
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
            ativo: parseInt(0),
        };

        // FAZ UMA REQUISIÇÃO PUT PARA ATUALIZAR A PESSOA
        axios.put(`/pessoas/${matricula}`, pessoaAtualizada)
            .then(response => {
                console.log(response.data);
                
                // MENSAGEM DE SUCESSO AO DEMITIR FUNCIONÁRIO
                alert('Funcionário demitido com sucesso!')

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
                    <div className='login' >
                        <form onSubmit={handleSubmit}>
    
                            <h2>Tem certeza que deseja desligar o funcionário?</h2>
    
                            
                                {/*  INPUT DE ATIVO ESCONDIDA E DEFINIDA COMO " 0 " */}
                                <input type="number" value={ativo} onChange={(e) => setAtivo(e.target.value)} required style={{display: 'none'}} />
    
                                
                            {/* DIV PARA OS BOTÕES DO FORMULÁRIO */}
                            <div className='buttons' style={{marginLeft:'20%'}}>
    
                                {/* ATUALIZAR DADOS */}
                                <button type="submit">Demitir</button>
    
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

export default Dismiss;