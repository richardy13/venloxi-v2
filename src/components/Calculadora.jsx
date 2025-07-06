import { useState } from "react";

function Calculadora() {
  const [cantidad, setCantidad] = useState("");
  const [resultado, setResultado] = useState(null);

  const manejarCambio = () => {
    if (!cantidad || isNaN(cantidad)) return;

    const tasa = 4.2; // Simulación de tasa de cambio
    const convertido = (parseFloat(cantidad) * tasa).toFixed(2);
    setResultado(convertido);

    const nuevoRegistro = `Convertiste ${cantidad} USD → ${convertido} en COP`;

    // Guardar en historial
    const historialPrevio = JSON.parse(localStorage.getItem("historial")) || [];
    const actualizado = [nuevoRegistro, ...historialPrevio].slice(0, 10); // máx 10 entradas
    localStorage.setItem("historial", JSON.stringify(actualizado));
  };

  return (
    <section className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Simular cambio</h2>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Cantidad en USD"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={manejarCambio}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Calcular
      </button>
      {resultado && (
        <p className="mt-4 text-center font-medium text-green-600">
          Resultado: {resultado} COP
        </p>
      )}
    </section>
  );
}

export default Calculadora;
