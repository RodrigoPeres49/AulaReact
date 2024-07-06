import '../../App.css';
import '../../App.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Home from './home.jsx';


function Register() {
  const [username2, setUsername2] = useState('');
  const render_input = (event) => {
    let usuario = event.target.value;
    setUsername2(usuario);
    console.log(username2);
  }
  return (
    <div className='body'>
      <Home/>
      <div className='login'>
        <form>
          <h1>Cadastre-se</h1>
          <label htmlFor="username">Usuario:</label>
          <input type='text' name='username' id='username'   placeholder='Insira o seu Usuario' />
          <label htmlFor="username">E-mail:</label>
          <input type='email' name='email' id='email' placeholder='Insira o   seu E-mail'/>
          <label htmlFor="password">Senha:</label>
          <input type='password' name='password' id='password'   placeholder='Insira a sua Senha'/>
          <label htmlFor="password">Confirmar senha:</label>
          <input type='password' name='confirm-password'   id='confirm-password' placeholder='Insira a sua senha novamente.'/  >
          <div className='buttons'>
            <button>Cadastrar</button>
            <button type='reset'>Limpar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;