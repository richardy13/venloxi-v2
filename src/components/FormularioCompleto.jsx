import React, { useState } from 'react';

export default function FormularioCompleto({ onEnviar }) {
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [monto, setMonto] = useState('');
  const [origen, setOrigen] = useState('USD');
  const [destino, setDestino] = useState('COP');
  const [nota, setNota] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();

    const solicitud = {
      nombre,
      contacto,
      monto,
      origen,
      destino,
      nota,
      fecha: new Date(),
    };

    onEnviar(solicitud);

    // Limpiar campos
    setNombre('');
    setContacto('');
    setMonto('');
    setNota('');
  };

  return (
    <form onSubmit={manejarEnvio} className="space-y-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-2">Solicitud de Cambio</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Correo o WhatsApp"
        value={contacto}
        onChange={(e) => setContacto(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Monto a cambiar"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <div className="flex space-x-4">
        <select value={origen} onChange={(e) => setOrigen(e.target.value)} className="w-full p-2 border rounded">
          <option value="USD">USD</option>
          <option value="COP">COP</option>
          <option value="VES">VES</option>
        </select>

        <select value={destino} onChange={(e) => setDestino(e.target.value)} className="w-full p-2 border rounded">
          <option value="USD">USD</option>
          <option value="COP">COP</option>
          <option value="VES">VES</option>
        </select>
      </div>

      <textarea
        placeholder="Nota adicional (opcional)"
        value={nota}
        onChange={(e) => setNota(e.target.value)}
        className="w-full p-2 border rounded"
        rows="3"
      ></textarea>

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Solicitar cambio
      </button>
    </form>
  );
}
