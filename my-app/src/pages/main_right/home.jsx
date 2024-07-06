import '../../App.css';
import '../../App.js';
import React, { useContext } from 'react';
import { UserContext } from '../../context/usercontext.jsx';

function Home() {

  const{username, setUsername} = useContext(UserContext);
  return (
    <div>
      <h1>Seja Bem vindo, {username}!</h1>
    </div>
  );
}

export default Home;