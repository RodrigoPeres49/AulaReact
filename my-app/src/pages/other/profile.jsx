import '../../App.css';
import '../../App.js';
import React from 'react';

function Profile() {

  let profile = {
    nome: "Rodrigo",
    sobrenome: "Peres"
  }

  const {nome, sobrenome} = profile


  return (
    <div>
        <h1>{nome} {sobrenome} </h1>
    </div>
  );
}

export default Profile;