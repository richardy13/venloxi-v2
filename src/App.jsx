import React, { useState, useEffect } from 'react';
import SolicitudCambio from './components/SolicitudCambio.jsx';
import FormularioCompleto from './components/FormularioCompleto.jsx';
import Login from './components/Login.jsx';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [origen, setOrigen] = useState('USD');
  const [destino, setDestino] = useState('COP');
  const [monto, setMonto] = useState('');
  const [resultado, setResultado] = useState('');
  const [historial, setHistorial] = useState([]);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const tasas = {
    USD: { COP: 4000, VES: 36 },
    COP: { USD: 0.00025, VES: 0.009 },
    VES: { USD: 0.027, COP: 111 },
  };

  useEffect(() => {
    const dataGuardada = localStorage.getItem('venloxi_historial');
    const user = localStorage.getItem('venloxi_usuario');
    if (dataGuardada) setHistorial(JSON.parse(dataGuardada));
    try {
      if (user) {
        const parsed = JSON.parse(user);
        if (parsed?.nombre && parsed?.whatsApp) {
          setUsuario(parsed);
        }
      }
    } catch (e) {
      console.error('Error al parsear usuario:', e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('venloxi_historial', JSON.stringify(historial));
  }, [historial]);

  const calcularCambio = (e) => {
    e.preventDefault();
    let res;
    if (origen === destino) {
      res = monto;
    } else {
      const tasa = tasas[origen]?.[destino];
      res = tasa ? (parseFloat(monto) * tasa).toFixed(2) : 'No disponible';
    }
    setResultado(res);
    const nuevaSolicitud = {
      origen,
      destino,
      monto,
      resultado: res,
      fecha: new Date(),
    };
    setHistorial([nuevaSolicitud, ...historial]);
  };

  const borrarHistorial = () => {
    setHistorial([]);
    localStorage.removeItem('venloxi_historial');
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('venloxi_usuario');
  };

  if (!usuario) {
    return (
      <AnimatePresence>
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 relative overflow-hidden"
        >
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            onSubmit={(e) => {
              e.preventDefault();
              const nombre = e.target.nombre.value;
              const whatsApp = e.target.whatsApp.value;
              if (nombre && whatsApp) {
                const userData = { nombre, whatsApp };
                localStorage.setItem('venloxi_usuario', JSON.stringify(userData));
                setUsuario(userData);
              }
            }}
            className="bg-white dark:bg-gray-800 p-8 rounded shadow-lg w-full max-w-sm flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center mb-6"
            >
              <img src="/logo.png" alt="Logo" className="h-36 w-36 mb-2" />
              <h1 className="text-3xl font-bold">Venloxi</h1>
            </motion.div>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
              Identifícate
            </h2>
            <div className="mb-4 w-full">
              <label className="block text-gray-700 dark:text-gray-300">Nombre:</label>
              <input
                name="nombre"
                type="text"
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
            <div className="mb-6 w-full">
              <label className="block text-gray-700 dark:text-gray-300">WhatsApp:</label>
              <input
                name="whatsApp"
                type="tel"
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              type="submit"
              className="w-full bg-[#1A237E] text-white py-2 rounded hover:bg-blue-900"
            >
              Entrar
            </motion.button>
          </motion.form>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className={`min-h-screen ${modoOscuro ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <header className="bg-[#1A237E] py-6 text-white flex justify-between items-center px-6">
  <div className="flex items-center space-x-4">
    <motion.img
      src="/logo.png"
      alt="Logo"
      className="h-12 w-12"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    />
    <motion.h1
      className="text-4xl font-extrabold tracking-wide"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      Venloxi
    </motion.h1>
  </div>

  <div className="flex items-center space-x-2">
    <span className="text-sm md:text-base">👤 {usuario.nombre}</span>
    <button
      onClick={cerrarSesion}
      className="text-xs md:text-sm bg-red-600 px-2 py-1 rounded hover:bg-red-700"
    >
      Cerrar sesión
    </button>
    <button
      onClick={() => setModoOscuro(!modoOscuro)}
      className="ml-4 text-xl"
    >
      {modoOscuro ? '☀️' : '🌙'}
    </button>
  </div>
</header>

      <main className="flex flex-col items-center mt-8 px-4">
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg w-full max-w-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-center mb-4">Calculadora de Cambio</h2>
          <form onSubmit={calcularCambio} className="space-y-4">
            <select value={origen} onChange={(e) => setOrigen(e.target.value)} className="w-full p-2 border rounded">
              <option value="USD">USD</option>
              <option value="COP">COP</option>
              <option value="VES">VES</option>
            </select>
            <input
              type="number"
              placeholder="Monto"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <select value={destino} onChange={(e) => setDestino(e.target.value)} className="w-full p-2 border rounded">
              <option value="USD">USD</option>
              <option value="COP">COP</option>
              <option value="VES">VES</option>
            </select>
            <button type="submit" className="w-full bg-[#1A237E] text-white py-2 rounded hover:bg-blue-900">
              Calcular
            </button>
          </form>
          <p className="mt-4 text-center">Resultado: {resultado ? `${resultado} ${destino}` : destino}</p>
        </div>

        <FormularioCompleto
          onEnviar={(solicitud) => {
            alert("✅ Solicitud enviada:\n\n" + JSON.stringify(solicitud, null, 2));
          }}
        />

        <div className="w-full max-w-md mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Historial de Solicitudes</h2>
            {historial.length > 0 && (
              <button
                onClick={borrarHistorial}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
              >
                Borrar todo
              </button>
            )}
          </div>
          {historial.length > 0 ? (
            historial.map((item, idx) => <SolicitudCambio key={idx} {...item} />)
          ) : (
            <p className="text-gray-500 text-center">Aún no se ha realizado ninguna solicitud.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
