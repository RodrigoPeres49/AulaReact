import React, { useEffect, useContext } from 'react'
import '../../App.css';
import '../../App.js';
import Home from './home.jsx';
import Pessoas from '../other/pessoas.jsx';
import { UserContext } from '../../context/usercontext.jsx';



function List() {
  const {pessoas, setPessoas} = useContext(UserContext)

  useEffect(() => { 
    const fetchUsers = async () => {
      const response = await fetch('/pessoas.json');
        const data = await response.json();
        console.log(data);
          setPessoas(data);
      };
    fetchUsers();
    }, [])

  return (
    <div className="body">
      <Home/>
      <div className='people'>
        <table>
                  <thead>
                      <tr><td className='people-list-title' colspan="4">Lista de Pessoas</td></tr>
                      <tr><td>Nome</td><td>Sobrenome</td><td>Idade</td><td>Profissão</td></tr>
                  </thead>
        <Pessoas pessoas={pessoas}/>
        </table>
      </div>
    </div>
  );
}

export default List;