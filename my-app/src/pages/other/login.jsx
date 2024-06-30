import '../../App.css';
import '../../App.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Login() {
  const [username2, setUsername2] = useState('');
  const render_input = (event) => {
    let usuario = event.target.value;
    setUsername2(usuario);
    console.log(username2);
  }
  return (
    <div>
      <form>
        <label htmlFor="username">Usuario:</label>
        <input type='text' name='username' id='username' placeholder='Insira o seu Usuario' onChange={render_input} value={username2} />
        <label htmlFor="password">Senha:</label>
        <input type='password' name='password' id='password' placeholder='Insira a sua Senha'/>
        <Link to={'/lista'}><button type='submit'>Entrar</button></Link>
      </form>
    </div>
  );
}

export default Login;