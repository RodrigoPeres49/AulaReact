import '../css/App.css';
import '../App.js';
import React from 'react';
import { Link } from 'react-router-dom';

function Main_Left() {
  return (
    <div className="menu">

      {/* MENU PARA SELECIONAR AS OPÇÕES */} 
      <div className='selecao'>
        <ul>
          <li><Link to={'/'}>Acessar Dados</Link></li>
          <li><Link to={'/lista'}>Lista de Funcionários</Link></li>
          <li><Link to={'/cadastro'}>Cadastrar</Link></li>
        </ul>
      </div>
</div>
  );
}

export default Main_Left;
