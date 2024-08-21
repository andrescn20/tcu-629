import React from "react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();
  const navBarClick = (e) => {
    const target = e.target.value;
    const pages = {
      inicio: '/home',
      dispositivo: '/agregardispositivo',
      general: '/general',
      ayuda: '/ayuda'
    }
    navigate(pages[target]);
  }

  return (
    <div className="flex py-4 shadow-lg px-4 mb-2">
      <div className="flex-grow space-x-8 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current align-middle mb-1">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        <button value="inicio" onClick = { (e) => navBarClick(e)}className="text-xl">Inicio</button>
        <button value="dispositivo" onClick = { (e) => navBarClick(e)}className="text-xl" href="">Agregar Dispositivo</button>
        <button value="general" onClick = { (e) => navBarClick(e)}className="text-xl">Panel General</button>
        <button value="ayuda" onClick = { (e) => navBarClick(e)}className="text-xl">Configuración</button>
      </div>
      <div className="">
        <button className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Navbar;