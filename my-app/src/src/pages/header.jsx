import '../App.css';
import '../App.js';
import React from 'react';
import logo from '../imgs/logo.png';

function Header() {
  return (
    <div className="header">
      <img className='logo' src={logo} alt="logo" />
      <h1>BEM VINDO A FAN PAGE DE BLEACH</h1>
    </div>
  );
}

export default Header;