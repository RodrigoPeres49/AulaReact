import '../App.css';
import '../App.js';
import React from 'react';

function Main_Left() {
  return (
    <div class="menu">
    
      {/* MENU PARA SELECIONAR AS OPÇÕES */}
      
      <ul className='selecao'>
        <li>
          <a href='#'>Home</a>
        </li>
      </ul>

      <ul className="selecao">
        <li>
          <input type="checkbox" id="sobre" />
          <label for="sobre">Selecionar Opção</label>
          <ul>
            <li><a href="#">Lista</a></li>
            <li><a href="#">Cadastrar</a></li>
            <li><a href="#">Editar Pessoa</a></li>
          </ul>
        </li>
          
      </ul>
</div>
  );
}

export default Main_Left;
