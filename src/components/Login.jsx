import React, { useState } from 'react';

function Login({ onLogin }) {
  const [nombre, setNombre] = useState('');
  const [whatsApp, setWhatsApp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && whatsApp) {
      const usuario = { nombre, whatsApp };
      localStorage.setItem('venloxi_usuario', JSON.stringify(usuario));
      onLogin(usuario);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Bienvenido</h2>

        <label className="block mb-2 text-gray-700 dark:text-gray-300">Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 border rounded mb-4 text-black"
          required
        />

        <label className="block mb-2 text-gray-700 dark:text-gray-300">WhatsApp:</label>
        <input
          type="tel"
          value={whatsApp}
          onChange={(e) => setWhatsApp(e.target.value)}
          className="w-full p-2 border rounded mb-4 text-black"
          required
        />

        <button type="submit" className="w-full bg-[#1A237E] text-white py-2 rounded hover:bg-blue-900">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
