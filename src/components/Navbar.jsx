import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md ">
      <div className="flex-none">
      </div>
      <div className="flex-1 mx-4">
        <label for="my-drawer" className="drawer-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
        <a className="btn btn-ghost text-xl">Inicio</a>
        <a className="btn btn-ghost text-xl">Agregar Dispositivo</a>
        <a className="btn btn-ghost text-xl">Panel General</a>
        <a className="btn btn-ghost text-xl">Ayuda</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Navbar;