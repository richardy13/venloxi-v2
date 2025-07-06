import { useState } from "react";

function Formulario() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (nombre && mensaje) {
      setEnviado(true);
      setNombre("");
      setMensaje("");
      setTimeout(() => setEnviado(false), 3000);
    }
  };

  return (
    <section className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Contacto</h2>
      {enviado && (
        <p className="text-green-600 mb-4">Mensaje enviado con éxito ✅</p>
      )}
      <form onSubmit={manejarEnvio} className="space-y-4">
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
        <textarea
          placeholder="Tu mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>
    </section>
  );
}

export default Formulario;
