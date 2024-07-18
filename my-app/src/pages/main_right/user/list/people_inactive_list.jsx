
// IMPORTAÇÃO DOS REQUISITOS NECESSÁRIOS PARA A PÁGINA

import React, { useEffect, useContext } from 'react'
import '../../../../css/App.css';
import '../../../../App.js';
import Home from '../../home.jsx';
import axios from 'axios';
import People from './people.jsx';
import { Link } from 'react-router-dom';

// IMPORTAÇÃO DO " UserContext "

import { UserContext } from '../../../../context/usercontext.jsx';


// DEFINIÇÃO DO COMPONENTE " List "

function InactiveList() {

  // UTILIZANDO O " useContext " PARA ACESSAR OS VALORES DO " UserContext "

  const {people, setPeople} = useContext(UserContext);

  // UTILIZANDO O " useEffect " PARA EXECUTAR UMA FUNÇÃO

  useEffect(() => {
    axios.get('/pessoas')
        .then(response => {
            setPeople(response.data.filter(people => people.ativo === 0));
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });
}, []);


  
  
  return (
    <div className="body">
      <Home/>

          <div className='people-links'>
                  <Link to={'/lista'}><a>Pessoas ativas</a></Link>
                  <Link to={'/lista/inativos'}><a>Pessoas Inativas</a></Link>
          </div>

      <div className='people'>

        {/* CRIAÇÃO DA TABELA DA LISTA DE PESSOAS INATIVAS */}

        <table>
                  <thead>
                      <tr><td className='people-list-title' colspan="5">Lista de Pessoas Inativas</td></tr>
                      <tr><td>Nome</td><td>Sobrenome</td><td>Idade</td><td>Profissão</td><td>Matrícula</td></tr>
                  </thead>
        
        {/* PEGAR PESSOAS DO ARQUIVO JSON */}

        <People people={people}/>
        </table>
      </div>
    </div>
  );
}

export default InactiveList;