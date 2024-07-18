// IMPORTAÇÕES

import React, { createContext, useState } from 'react';

// VARIÁVEL " UserContext " COM UM CONTEXTO NULO

const UserContext = createContext(null);

// COMPONENTE " UserProvider " COM A PROPPRIEDADE (prop)  " children "

const UserProvider = ({ children }) => {

  // DECLARAÇÃO DO ESTADO " people " COM A FUNÇÃO " SetPeople " PARA ATUALIZA-LO, INICIANDO COM UM ARRAY VAZÍO

  const [people, setPeople] = useState([]);

  // ESTADO " loading ", FUNÇÃO " setLoading " INICIANDO COMO " true "

  const [loading, setLoading] = useState(true);

  // ESTADO " username ", FUNÇÃO "setUsername" INICIANDO COM A STRING " Visitante "

  const [username, setUsername] = useState('Visitante');

  // RETORNA UM PROVEDOR DE CONTEXTO QUE ENVOLVE OS FILHOS DO COMPONENTE " children "

  return (

    // OS VALORES CONTÉM OS ESTADOS E FUNÇÕES PARA SEREM ATUALIZADOS 

    <UserContext.Provider value={{ people, setPeople, loading, setLoading, username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
