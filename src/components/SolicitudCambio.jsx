import React from 'react';

export default function SolicitudCambio({ origen, destino, monto, resultado, fecha }) {
  return (
    <div className="bg-gray-50 rounded-md shadow-sm p-4 mb-4">
      <p className="font-medium">{new Date(fecha).toLocaleString()}</p>
      <p>
        {monto} {origen} → <span className="font-bold">{resultado} {destino}</span>
      </p>
    </div>
  );
}
