import React from "react";
import logo from "/logo.png";

function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="Venloxi Logo" className="h-10 mr-2" />
        <span className="text-xl font-semibold">Venloxi</span>
      </div>
      <nav className="space-x-4">
        <a href="#" className="text-blue-600 hover:underline">Inicio</a>
        <a href="#" className="text-blue-600 hover:underline">Historial</a>
        <a href="#" className="text-blue-600 hover:underline">Contacto</a>
      </nav>
    </header>
  );
}

export default Header;
