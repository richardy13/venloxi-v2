import { useState, useEffect } from "react";

function Historial() {
  const [historial, setHistorial] = useState([]);

  // Simulación de carga de datos de historial desde localStorage (puedes adaptarlo luego)
  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("historial")) || [];
    setHistorial(datos);
  }, []);

  return (
    <section className="bg-white p-4 rounded shadow-md mt-8 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Historial de cambios</h2>
      {historial.length === 0 ? (
        <p className="text-gray-500 text-center">No hay cambios registrados aún.</p>
      ) : (
        <ul className="space-y-2">
          {historial.map((item, index) => (
            <li
              key={index}
              className="bg-gray-100 p-2 rounded border border-gray-300 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Historial;
