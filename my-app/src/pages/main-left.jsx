import '../App.css';
import '../App.js';
import React from 'react';
import { Link } from 'react-router-dom';

function Main_Left() {
  return (
    <div class="menu">
    
      {/* MENU PARA SELECIONAR AS OPÇÕES */}
      
      <ul className='selecao'>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
      </ul>

      <ul className="selecao">
        <li>
          <input type="checkbox" id="sobre" />
          <label for="sobre">Selecionar Opção</label>
          <ul>
            <li><Link to={'/lista'}>Lista</Link></li>
            <li><a href="#">Cadastrar</a></li>
            <li><a href="#">Editar Pessoa</a></li>
          </ul>
        </li>
          
      </ul>
</div>
  );
}

export default Main_Left;
