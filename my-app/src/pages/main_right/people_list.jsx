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
      <Pessoas pessoas={pessoas}/>
    </div>
  );
}

export default List;